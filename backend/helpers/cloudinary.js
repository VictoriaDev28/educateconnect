const cloudinary = require('cloudinary').v2
const path = require('path')

// configuration with .env data
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// fileSize (in bytes) is optional; if provided and large we'll use chunked upload
const uploadMediaToCloudinary = async(filePath, fileSize = 0)=>{
    try {
        const absPath = path.resolve(filePath)

        // Use chunked upload for large files to avoid 413 errors
        const LARGE_FILE_THRESHOLD = 50 * 1024 * 1024 // 50 MB

        let result;
        if (fileSize && fileSize > LARGE_FILE_THRESHOLD && cloudinary.uploader.upload_large) {
            result = await cloudinary.uploader.upload_large(absPath, {
                resource_type: 'auto',
                chunk_size: 6000000 // ~6MB per chunk
            })
        } else {
            result = await cloudinary.uploader.upload(absPath, {
                resource_type: 'auto'
            })
        }

        return result;

    } catch (error) {
        console.log('Cloudinary upload error:', error)
        if (error && error.http_code) console.log('Cloudinary http_code:', error.http_code)
        throw new Error('Error uploading to cloudinary')
    }
};

const  deleteMediaFromCloudinary = async(publicId)=> {
    try {
        await cloudinary.uploader.destroy(publicId)
        
    } catch (error) {
        console.log('Cloudinary delete error:', error);
        throw new Error('Failed to delete from cloudinary')
        
    }
};

module.exports = {uploadMediaToCloudinary, deleteMediaFromCloudinary}