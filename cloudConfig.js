const cloudinary = require("cloudinary").v2;

let CloudinaryStorage;
try {
  // Try destructuring (should work for v2.2.1)
  CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage;
  if (!CloudinaryStorage) throw new Error();
} catch {
  // Fallback: try direct require
  CloudinaryStorage = require("multer-storage-cloudinary");
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

module.exports = {
    cloudinary,
    storage
};