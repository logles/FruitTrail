// resolvers/userResolvers.ts

import { User } from '../models/User.js';
import { signToken } from '../utils/auth.js';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new Error('Not logged in');
    },
  },
  Mutation: {
    login: async (_parent: any, { username, password }: any) => {
      const user = await User.findOne({ username });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Incorrect credentials');
      }
      const{_id, username:userUsername} = user
      const userId = _id.toString()
      const token = signToken({_id:userId, username: userUsername});
      return { token, user };
    },
    addUser: async (_: any, args: any) => {
      const user = await User.create(args);
      const{_id, username:userUsername} = user
      const userId = _id.toString()
      const token = signToken({_id:userId, username: userUsername});
      return { token, user };
    },
  },
};
