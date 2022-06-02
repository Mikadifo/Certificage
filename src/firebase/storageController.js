import { ref, uploadBytesResumable } from 'firebase/storage';
import { auth, storage } from './config';

export const uploadCertificate = (file) => {
    try {
        const userFolder = auth.currentUser.uid;
        const storageRef = ref(storage, `${userFolder}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return uploadTask;
    } catch (error) {
        console.log(error);
        alert(error);
    }
};
