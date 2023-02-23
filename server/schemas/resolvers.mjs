import { User } from "../models/index.js";

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    userByUsername: async (_, { username }) => {
      return await User.findOne({username});
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
      return newUser;
    },
  },
};
