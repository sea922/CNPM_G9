const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const multer = require("multer");

cloudinary.config({
  cloud_name: "g9cinema",
  api_key: "126522281118483",
  api_secret: "eEchJS7nmCRZIvc0ZjWD6r0XSd0",
});

const storage = (folder) =>
  new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      format: async (req, file) => "png", // supports promises as well
      public_id: (req, file) => {
        const name = file.originalname + new Date();
        return name;
      },
    },
  });
const uploadCloud = (folder) =>
  multer({
    storage: storage(folder),
  });
module.exports = uploadCloud;
