import { resolvers as userResolvers } from './userResolvers.js';
import { treeResolvers } from './treeResolvers.js';
import { mergeResolvers } from '@graphql-tools/merge';

export const resolvers = mergeResolvers([userResolvers, treeResolvers]);

