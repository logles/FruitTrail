import { AuthenticationError } from 'apollo-server-express';
import { Tree } from '../models/Tree.js';

export const treeResolvers = {
  Query: {
    // Return all trees with populated creator
    trees: async () => Tree.find().populate('createdBy'),
    // Return a single tree by ID
    tree: async (_: unknown, { id }: { id: string }) =>
      Tree.findById(id).populate('createdBy'),
  },
  Mutation: {
    /**
     * Create a new tree linked to the authenticated user
     */
    addTree: async (
      _: unknown,
      { name, fruit, latitude, longitude }: { name: string; fruit: string; latitude: number; longitude: number },
      context: any,
    ) => {
      if (!context.user) throw new AuthenticationError('Login required');
      return Tree.create({
        name,
        fruit,
        location: { latitude, longitude },
        createdBy: context.user._id,
      });
    },

    /**
     * Update a tree the user owns (any combination of fields is optional)
     */
    updateTree: async (
      _: unknown,
      { id, ...fields }: { id: string; name?: string; fruit?: string; latitude?: number; longitude?: number },
      context: any,
    ) => {
      if (!context.user) throw new AuthenticationError('Login required');

      const tree = await Tree.findById(id);
      if (!tree) throw new Error('Tree not found');
      if (tree.createdBy.toString() !== context.user._id)
        throw new AuthenticationError('Not your tree');

      Object.assign(tree, fields);
      return tree.save();
    },

    /**
     * Delete a tree the user owns
     */
    deleteTree: async (_: unknown, { id }: { id: string }, context: any) => {
      if (!context.user) throw new AuthenticationError('Login required');

      const tree = await Tree.findById(id);
      if (!tree) throw new Error('Tree not found');
      if (tree.createdBy.toString() !== context.user._id)
        throw new AuthenticationError('Not your tree');

      await tree.deleteOne();
      return true; // GraphQL Boolean
    },
  },
};
