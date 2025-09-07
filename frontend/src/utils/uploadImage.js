import { API_PATHS } from './apiPaths'
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.image.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading the image', error);
        throw error;
    }
};

export default uploadImage;
//it will help in uploading images as resume. it is a helper functionalso so it will help in downloading the resume