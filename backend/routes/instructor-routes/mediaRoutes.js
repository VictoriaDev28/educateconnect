const express = require('express');
const multer = require('multer');
const {uploadMediaToCloudinary, deleteMediaFromCloudinary} = require('../../helpers/cloudinary');

const router = express.Router();

const upload = multer({dest : 'uploads/'}) ;

router.post('/upload', upload.single('file'), async(req, res) =>{
    try {
        console.log('Received upload request. req.file:', req.file)

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' })
        }

        const filePath = req.file.path;

        // upload local file to Cloudinary
        const result = await uploadMediaToCloudinary(filePath, req.file.size);

        // try to remove local file after upload (best-effort)
        try {
            const fs = require('fs')
            fs.unlink(filePath, (err) => {
                if (err) console.log('Failed to delete local file:', filePath, err)
            })
        } catch (e) {
            console.log('Error while deleting local file:', e)
        }

        res.status(200).json({
            success: true,
            data: result,
        });
        
    } catch (error) {
        console.log('Upload error:', error)
        res.status(500).json({success : false, message: 'Error uploading file'})
        
    }
});

router.delete('/delete/:id', async(req, res) => {
    try {
        const {id}= req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                message: 'Assest Id is required'
            })
        }

        await deleteMediaFromCloudinary(id)

         res.status(200).json({
            success: true,
            message: 'Assest deleted successfully!',
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success : false, message: 'Error deleting file'})
        
    }

});


router.post('/bulk-upload', upload.array('files', 10), async(req, res)=>{
    try{
        const uploadPromises = req.files.map(fileItem=> uploadingMediaToCloudinary(fileItem.path))

        const results = await Promise.all(uploadPromises);

        res.status(200).json({
            success: true,
            data: results
        })

    }catch (event) {
        console.log(event)
        res.status(500).json({success : false, message: 'Error in bulk uploading file'})
    }

})


module.exports = router;