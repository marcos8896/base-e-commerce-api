import { GraphQLServer, Options } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import db from './db-prisma-binding';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (request): any => ({
        ...request,
        prisma,
        db,
    }),
    resolverValidationOptions: { requireResolversForResolveType: false },
});

const maxMBs = 1;
const options: Options = {
    port: process.env.GRAPHQL_SERVER_PORT,
    cors: { origin: 'http://localhost:3000', credentials: true },
    uploads: {
        maxFileSize: maxMBs * 1024 * 1024,
        maxFiles: 1,
    },
};

server.start(options, ({ port }): void => console.log(`Server is running on http://localhost:${port}`));
