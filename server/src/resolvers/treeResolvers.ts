import { Tree } from '../models/Tree';
import { AuthenticationError } from 'apollo-server-express';

export const treeResolvers = {
  Query: {
    trees: async () => Tree.find().populate('createdBy'),
    tree: async (_: any, { id }: any) => Tree.findById(id).populate('createdBy'),
  },
  Mutation: {
    addTree: async (_: any, { name, fruit, latitude, longitude }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return Tree.create({
        name,
        fruit,
        location: { latitude, longitude },
        createdBy: context.user._id,
      });
    },
    deleteTree: async (_: any, { id }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      const tree = await Tree.findById(id);
      if (tree?.createdBy.toString() !== context.user._id) {
        throw new AuthenticationError('Unauthorized');
      }
      await tree.deleteOne();
      return tree;
    },
  },
};
