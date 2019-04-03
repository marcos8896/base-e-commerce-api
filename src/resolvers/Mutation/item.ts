import { Context } from '../../utils';
import { Item } from '../../generated/prisma-client/index';
export const item = {
    async createItem(parent, args: any, ctx: Context): Promise<Item> {
        // TODO: Check if current user is logged in
        const item = await ctx.prisma.createItem({
            ...args,
        });
        return item;
    },
};
