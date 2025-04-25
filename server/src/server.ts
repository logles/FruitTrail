import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schemas/typeDefs.js";
import { resolvers } from "./resolvers/index.js";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { authMiddleware } from './utils/auth.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/fruittrail"
  )
  .then(() => console.log("🌱 Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Set up Apollo Server for GraphQL
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }:any) => {
  //   // You can handle authentication here by checking JWTs in headers
  //   const token = req.headers.authorization || "";
  //   return { token };
  // },
});

const startApolloServer = async() => {
  await server.start()


  app.use(express.urlencoded({extended: false}))
  app.use(express.json())
  app.use("/graphql", expressMiddleware(server as any,
    {context:authMiddleware as any}
  ))
  app.listen(port, () => {
    console.log(
      `🚀 Server is running at http://localhost:${port}`
    );
  });
}
// Apply Apollo middleware to the Express server
startApolloServer()
