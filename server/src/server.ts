import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import cors from "cors";
import { authMiddleware } from './utils/auth';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/fruittrail", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🌱 Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Set up Apollo Server for GraphQL
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // You can handle authentication here by checking JWTs in headers
    const token = req.headers.authorization || "";
    return { token };
  },
});

// Apply Apollo middleware to the Express server
server.applyMiddleware({ app });

// Start the Express server
app.listen(port, () => {
  console.log(
    `🚀 Server is running at http://localhost:${port}${server.graphqlPath}`
  );
});
