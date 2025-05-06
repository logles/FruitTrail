import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { typeDefs } from "./schemas/typeDefs.js";
import { authMiddleware } from "./utils/auth.js";
import { resolvers } from "./resolvers/index.js";
import path from "node:path";
import type { Request, Response } from "express";
const __dirname = path.resolve();

// Load environment variables from .env file
dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
// add middleware for req.body json
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: authMiddleware
  })
);

//set up static folder and home route
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
// }

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fruitmap";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("🌱 Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
