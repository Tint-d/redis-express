import {
  getCloudinaryAPIKey,
  getCloudinaryAPISecret,
  getCloudinaryName,
} from "./appConfig";

const cloudinary = require("cloudinary").v2;
const { unlink } = require("fs").promises;

const cloudinaryName = getCloudinaryName();
const cloudinaryApiKey = getCloudinaryAPIKey();
const cloudinaryApiSecert = getCloudinaryAPISecret();

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecert,
});

export const cloudinaryUploader = async (localPath: any) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(localPath);
  await unlink(localPath);
  return {
    image: secure_url,
    cloudId: public_id,
  };
};
