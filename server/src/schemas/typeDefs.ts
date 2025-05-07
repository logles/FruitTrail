import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    favorites: [Tree]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Location {
    latitude: Float!
    longitude: Float!
  }

  type Tree {
    _id: ID!
    name: String!
    fruit: String!
    location: Location!
    createdBy: User!
  }

  type Query {
    me: User
    trees: [Tree]
    tree(id: ID!): Tree
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    addTree(
      name: String!
      fruit: String!
      latitude: Float!
      longitude: Float!
    ): Tree!

    updateTree(
      id: ID!
      name: String
      fruit: String
      latitude: Float
      longitude: Float
    ): Tree!

    deleteTree(id: ID!): Boolean!

    addFavorite(treeId: ID!): User
    removeFavorite(treeId: ID!): User
  }
`;