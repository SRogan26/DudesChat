import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { resolvers, typeDefs } from "./schemas/index.mjs";
import db from "./config/connection.js";
import { authMiddleware } from "./utils/auth.mjs";

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  cors(),
  express.urlencoded({ extended: false }),
  express.json(),
  expressMiddleware(server, {
    context: authMiddleware,
  }),
);

db.once("open", () => {
  console.log('DB Connected')
});

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);