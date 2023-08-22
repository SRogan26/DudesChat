import { GraphQLError } from "graphql";
import { User, Thread, Message } from "../models/index.js";
import { signAuthToken } from "../utils/auth.mjs";
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

const unauthenticated = new GraphQLError("User is not authenticated", {
  extensions: {
    code: "UNAUTHENTICATED",
    http: { status: 401 },
  },
});

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    userByUsername: async (_, { username }, context) => {
      // console.log(context.user);
      if (context.user) {
        return await User.findOne({ username });
      }
      throw unauthenticated;
    },
    threadsByUser: async (_, {}, context) => {
      if (!context.user) throw unauthenticated;
      const threadsList = await Thread.find({ memberIds: context.user._id });

      return threadsList;
    },
    messagesByThread: async (_, { threadId }, context) => {
      if (!context.user) throw unauthenticated;
      const messageList = await Message.find({ threadId })
        .populate("authorId")
        .exec();

      return messageList;
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password, firstName, lastName }) => {
      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
      });
      const authToken = signAuthToken(user);

      console.log(user);
      console.log(authToken);

      return { authToken, user };
    },
    userLogIn: async (_, { email, password }, context) => {
      const logInError = new GraphQLError("Incorrect Email/Password Provided", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });

      const user = await User.findOne({ email });
      console.log(user);
      if (!user) throw logInError;
      const isPassMatching = await user.validatePassword(password);
      if (!isPassMatching) throw logInError;

      const authToken = signAuthToken(user);

      return { authToken, user };
    },
    addMessage: async (_, { messageBody, threadId }, context) => {
      if (!context.user) throw unauthenticated;
      const message = await Message.create({
        messageBody,
        authorId: context.user._id,
        threadId,
      });
      const userData = await User.find({_id: context.user._id})
      const parsedMessage = message.toJSON();
      parsedMessage.authorId = userData[0]
      pubsub.publish("MESSAGE_POSTED", { messagePosted: {...parsedMessage} });

      return { ...parsedMessage };
    },
    addThread: async (_, { title, memberIds, isDM }, context) => {
      if (!context.user) throw unauthenticated;
      memberIds.unshift(context.user._id);

      const thread = await Thread.create({
        title,
        creatorId: context.user._id,
        memberIds,
        isDM,
      });
      const parsedThread = thread.toJSON();
      return { ...parsedThread };
    },
  },
  Subscription: {
    messagePosted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["MESSAGE_POSTED"]),
        (payload, variables) => {
          console.log(payload.messagePosted.threadId.toString() === variables.threadId)
          return payload.messagePosted.threadId.toString() === variables.threadId;
        }
      ),
    },
  },
};
