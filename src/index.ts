import { GraphQLServer, Options } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'
import * as cookieParser from 'cookie-parser'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})

server.express.use(cookieParser());

const options: Options = {
  port: process.env.GRAPHQL_SERVER_PORT,
  cors: {
    credentials: true,
    origin: process.env.CLIENT_HOST
  }
}
server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`))
