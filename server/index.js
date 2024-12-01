const { ApolloServer} = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
const cors = require("cors");
const express = require("express");

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  app.use(express.json());
  app.use(cors());
  await server.start();
  // is used to connect the Apollo GraphQL server with the Express application. It acts as a bridge between the two, allowing Express to handle the GraphQL requests.
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
}

startServer();
