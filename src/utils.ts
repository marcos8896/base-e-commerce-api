import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma-client'
import { ContextParameters } from 'graphql-yoga/dist/types'

export interface Context extends ContextParameters {
  prisma: Prisma
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
