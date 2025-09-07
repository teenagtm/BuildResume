import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title:{
        type: String,
        required: true
    },
    thumbnailLink:{
        type: String
    },
    template:{
        theme: String,
        colorPalette: [String]
    },
    profileInfo:{
        profilePreview: String,
        fullName: String,
        designation: String,
        summary: String,
    },

    contactInfo:{
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String
    },

    //work experience section
    workExperience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
    },
],
education: [{
    institution: String,
    degree: String,
    startDate: Date,
    endDate: Date,
},
],
skills: [{
    name: String,
    progress: Number, 
},
],
projects: [{
    title: String,
    github: String,
    description: String,
    liveDemo: String,
},],
certifications: [{
    title: String,
    issuer: String,
    year: String,
},],
languages: [{
    name: String,
    progress: Number, 
},
],
interests: [String],
},
{ 
    timestamps: {createdAt: "createAt", updatedAt: "updatedAt"} 
}
);

export default mongoose.model('Resume', resumeSchema);
