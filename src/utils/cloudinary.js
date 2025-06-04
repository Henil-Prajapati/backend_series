import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


    const UploadOnCloudinary = async (filePath) => {
        try {
            if(!filePath) return null;
            const response = await cloudinary.uploader.upload(filePath,
                {
                    resource_type: 'auto',
                }
            )
            console.log('File uploaded successfully',response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(filePath); // Delete the file if upload fails
            console.error('Error uploading file to Cloudinary:', error);
        }
    }

  cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dvmq3xj1b', 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    export {
        UploadOnCloudinary
    }