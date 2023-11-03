import { v2 as cloudinary } from 'cloudinary';
import { glob } from 'glob';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: 'ssoon',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Return "https" URLs by setting secure: true
});

// Log the configuration
console.log(cloudinary.config());
/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async ({
  imagePath,
  folder,
}: {
  imagePath: string;
  folder: string;
}) => {
  const options = {
    use_filename: true, // Use the uploaded file's name as the asset's public ID and
    unique_filename: false,
    overwrite: true, // allow overwriting the asset with new versions
    folder,
  };

  // Upload the image
  const result = await cloudinary.uploader.upload(imagePath, options);
  return result.public_id;
};

(async () => {
  const blogImgPaths = await glob(['public/**/*.{jpg,jpeg,png,gif,webp,svg}']);

  if (blogImgPaths.length) {
    const uploadPromises = blogImgPaths.map(async (imgPath) => {
      const folder = imgPath
        .replace('public/', '')
        .replace(/\/[^/]+\.(jpg|jpeg|png|gif|webp|svg)$/, '');
      return uploadImage({
        imagePath: imgPath,
        folder,
      });
    });
    try {
      const result = await Promise.all(uploadPromises);
      console.log('result', result);
    } catch (e: any) {
      throw new Error(e.error);
    }
  }
})();
