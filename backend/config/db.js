import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://teena3028gautam:teenagautam@cluster0.xq72t5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB CONNECTED'))
}



