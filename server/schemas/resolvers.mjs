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
      const existingEmail = await User.findOne({email})
      if(existingEmail) {
        throw new GraphQLError("That email has already created an account", {
        extensions: {
          code: "DUPLICATE_INPUT",
        },
      });
    }
    const existingUsername = await User.findOne({username})
    if(existingUsername) {
      throw new GraphQLError("That username is already in use", {
      extensions: {
        code: "DUPLICATE_INPUT",
      },
    });
  }
      
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

      const user = await User.findOne({ email }).populate("contactIds").exec();
      if (!user) throw logInError;
      const isPassMatching = await user.validatePassword(password);
      if (!isPassMatching) throw logInError;
      
      console.log(user._id, Date.now());
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
      const userData = await User.find({ _id: context.user._id });
      const parsedMessage = message.toJSON();
      parsedMessage.authorId = userData[0];
      pubsub.publish("MESSAGE_POSTED", { messagePosted: { ...parsedMessage } });

      return { ...parsedMessage };
    },
    addThread: async (_, { title, memberNames, isDM }, context) => {
      if (!context.user) throw unauthenticated;

      const memberIds = [];

      const members = await User.find({ username: { $in: memberNames } });
      //Need error handling if a non existing memberName
      // is in the sent array of members
      if (members.length !== memberNames.length) {
        let invalidUsers;
        const returnedUsers = members.map((member) => member.username);
        invalidUsers = memberNames.filter(
          (name) => !returnedUsers.includes(name)
        );

        const wrongUserErr = new GraphQLError(
          `The following Usernames do not exist:
            ${invalidUsers.toString()}
          `,
          {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          }
        );
        throw wrongUserErr;
      }

      for (let i = 0; i < members.length; i++) {
        memberIds.push(members[i]._id);
      }

      memberIds.unshift(context.user._id);

      const existingThreads = await Thread.find({
        memberIds: {
          $size: memberIds.length,
          $all: memberIds,
        },
      });

      if (existingThreads.length > 0) {
        const threadTitles = [];
        existingThreads.forEach((thread) => {
          threadTitles.push(thread.title);
        });
        const existingThreadErr = new GraphQLError(
          `These members already have the following thread(s):
            ${threadTitles.toString()}
          `,
          {
            extensions: {
              code: "DUPLICATE_INPUT",
            },
          }
        );
        throw existingThreadErr;
      }

      if (isDM) title = context.user.username + " @ " + title;

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
          return (
            payload.messagePosted.threadId.toString() === variables.threadId
          );
        }
      ),
    },
  },
};
