import { getUserId, Context } from '../../utils'

export const item = {
  async createItem(parent, args, ctx: Context, info) {
    // TODO: Check if current user is logged in
    const item = await ctx.prisma.createItem({
      ...args,
    })

    return item;
  }
};
