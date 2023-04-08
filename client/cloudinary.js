import cloudinary from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  //eslint-disable-next-line
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //eslint-disable-next-line
  api_key: process.env.CLOUDINARY_API_KEY,
  //eslint-disable-next-line
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinaryConfig;
