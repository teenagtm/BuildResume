import fs from 'fs';
import path from 'path';

import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';
import {error} from 'console';

export const uploadResumeImages = (req, res) => {
    try{
//config multer to handle images
upload.fields([{name: "thumbnail"},{name:"profileimage"}])
(req, res, async (err) => {
if(err){
    return res.status(400).json({message: "file upload error", error: err.message})
}
const resumeId = req.params.id;
const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

if(!resume){
    return res.status(404).json({ message: "Resume not found or you are unauthorized" });
}

//use process cxd to locate  uploads folder
const uploadsFolder = path.join(process.cwd(), 'uploads');
const baseUrl = `${req.protocol}://${req.get('host')}`;

const newThumbnail = req.files.thumbnail?.[0];
const newProfileImage = req.files.profileImage?.[0];
if(newThumbnail){
    if(resume.thumbnailLink){
        const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
        if(fs.existsSync(oldThumbnail))
            fs.unlinkSync(oldThumbnail);
    }
    resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
}
    //same for profilepreview image
    if(newProfileImage){
    if(resume.profileInfo?.profilePreviewUrl){
        const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
        if(fs.existsSync(oldProfile))
            fs.unlinkSync(oldProfile);
    }
     resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newThumbnail.filename}`;
}
    await resume.save();
    res.status(200).json({ message: 'Images uploaded successfully', 
    thumbnailLink: resume.thumbnailLink,
    profilePreviewUrl: resume.profileInfo?.profilePreviewUrl
})
    })
}
    catch(err){
        console.error('Error uploading images:', err);
        res.status(500).json({ message: 'fail to upload images', error: err.message });
    }
}