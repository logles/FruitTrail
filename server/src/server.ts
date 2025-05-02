import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './schemas/typeDefs.js';
import { authMiddleware } from './utils/auth.js';
import { resolvers } from './resolvers/index.js';


// Load environment variables from .env file
dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => authMiddleware({ req }),
  })
);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fruitmap';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('🌱 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
