import { resolvers as userResolvers } from './userResolvers';
import { treeResolvers } from './treeResolvers';
import { mergeResolvers } from '@graphql-tools/merge';

export const resolvers = mergeResolvers([userResolvers, treeResolvers]);

