const cloudinary = require('cloudinary').v2;


async function uploadPhoto(filePath) {

    cloudinary.config({
        cloud_name: process.env.Cloud_Name,
        api_key: process.env.Api_Key,
        api_secret: process.env.cloudinaryApiSecretKey,
    });
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'Home/payment-app/'
        });
        console.log('File uploaded successfully:', result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading file:', error);
    }


};
module.exports = {
    uploadPhoto,
}


