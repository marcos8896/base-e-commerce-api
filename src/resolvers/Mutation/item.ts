import { Context } from '../../utils';
import { Item } from '../../generated/prisma-client/index';
import { cloudinaryImageUpload } from '../../cloudinary/cloudinaryImageUpload';
interface ImageFile {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: any;
}

interface ExtendedItem {
    imageFile: ImageFile;
}

export const item = {
    async createItem(parent, args: ExtendedItem & Item, ctx: Context): Promise<Item> {
        try {
            // TODO: Check if current user is logged in
            const image = await args.imageFile;
            const imageStream = image.createReadStream();
            const cloudinaryResult = await cloudinaryImageUpload({ stream: imageStream });
            const item = await ctx.prisma.createItem({
                description: args.description,
                title: args.title,
                price: args.price,
                image: cloudinaryResult.secure_url,
                largeImage: cloudinaryResult.eager[0].secure_url,
            });
            return item;
        } catch (err) {
            throw new Error(`Failed to register item! - Err: ${err.message}`);
        }
    },
};
