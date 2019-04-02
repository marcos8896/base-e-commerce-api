// This prisma-binding package is only used to be able to use forwardTo feature
import { Prisma } from 'prisma-binding';

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: `${process.env.PRISMA_API_ENDPOINT}:${process.env.PRISMA_PORT}`,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

export default db;