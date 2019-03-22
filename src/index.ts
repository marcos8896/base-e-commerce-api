import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})

const options = {
  port: process.env.GRAPHQL_SERVER_PORT,
}
server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`))
