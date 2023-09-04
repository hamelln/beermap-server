var cloudinary = require("cloudinary").v2;

class ImageUploader {
  static #CLOUD_NAME = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  static #API_KEY = process.env.PUBLIC_CLOUDINARY_API_KEY;
  static #API_SECRET = process.env.PUBLIC_CLOUDINARY_API_SECRET;

  static {
    cloudinary.config({
      cloud_name: this.#CLOUD_NAME,
      api_key: this.#API_KEY,
      api_secret: this.#API_SECRET,
      secure: true,
    });
  }

  static async delete(publid_id) {
    await cloudinary.uploader.destroy(publid_id).then(console.log);
  }
}

export default ImageUploader;
