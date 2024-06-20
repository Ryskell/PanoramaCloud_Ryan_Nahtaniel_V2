import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';
import { context, Context } from './context';

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
