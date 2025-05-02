import { resolvers as userResolvers } from './userResolvers.js';
import { treeResolvers } from './treeResolvers.js';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...treeResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...treeResolvers.Mutation,
  },
};