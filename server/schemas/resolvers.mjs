import { GraphQLError } from 'graphql';
import { User } from "../models/index.js";
import { signAuthToken } from '../utils/auth.mjs';

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    userByUsername: async (_, { username }, context) => {
      console.log(context)
      if (context.user){
        return await User.findOne({username});
      }
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password, firstName, lastName }) => {
      const newUser = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
      });
      const authToken = signAuthToken(newUser);

      console.log(newUser);
      console.log(authToken);

      return { authToken, newUser };
    },
  },
};
