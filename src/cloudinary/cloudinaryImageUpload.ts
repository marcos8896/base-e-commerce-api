import { setupConfig } from './config';
import { ReadStream } from 'tty';
import CloudinaryResult from './types/CloudinaryResult';

const cloudinaryImageUpload = ({ stream }: { stream: ReadStream }): Promise<CloudinaryResult> => {
    const cloudinary = setupConfig();
    return new Promise(
        (resolve, reject): void => {
            const streamLoad = cloudinary.uploader.upload_stream(
                (error, result): void => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                },
            );

            stream.pipe(streamLoad);
        },
    );
};

export { cloudinaryImageUpload };
