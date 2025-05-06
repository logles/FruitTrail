import { AuthenticationError } from "apollo-server-express"; // or your current error type
import { User } from "../models/Members.js";
import { signToken } from "../utils/auth.js";

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id).populate('favorites');
      }
      throw new Error("Not logged in");
    },
  },
  Mutation: {
    login: async (_: any, { username, password }: any) => {
      const user = await User.findOne({ username });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error("Incorrect credentials");
      }
      const { _id, username: userUsername } = user;
      const userId = _id.toString();
      const token = signToken({ _id: userId, username: userUsername });
      return { token, user };
    },
    addUser: async (_: any, args: any) => {
      const user = await User.create(args);
      const { _id, username: userUsername } = user;
      const userId = _id.toString();
      const token = signToken({ _id: userId, username: userUsername });
      return { token, user };
    },

    // ✅ Add these two for favorites
    addFavorite: async (_: any, { treeId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError("Login required");
      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { favorites: treeId } },
        { new: true }
      ).populate('favorites');
    },

    removeFavorite: async (_: any, { treeId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError("Login required");
      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { favorites: treeId } },
        { new: true }
      ).populate('favorites');
    },
  },
};
