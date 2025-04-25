import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './resolvers';
import { authMiddleware } from './utils/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('MongoDB connected');

  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
