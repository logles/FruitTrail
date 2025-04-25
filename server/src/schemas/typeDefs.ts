import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
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
    ): Tree

    deleteTree(id: ID!): Tree
  }
`;
