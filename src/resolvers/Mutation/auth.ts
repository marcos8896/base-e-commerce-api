import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../../utils'
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

export const auth = {
  async signup(parent, args, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({ ...args, password })
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: ONE_YEAR,
    });

    return {
      token,
      user,
    }
  },

  async login(parent, { email, password }, ctx: Context) {
    const user = await ctx.prisma.user({ email })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: ONE_YEAR,
    });

    return {
      token,
      user,
    }
  },

  async logout(parent, args, ctx: Context) {
    ctx.response.clearCookie('token')
    return { message: 'logout' }
  }
}
