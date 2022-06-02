import { listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, storage } from './config';

export const uploadCertificate = (file, fileName) => {
    try {
        const userFolder = auth.currentUser.uid;
        const storageRef = ref(storage, `${userFolder}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return uploadTask;
    } catch (error) {
        console.log(error);
        alert(error); //TODO: Toastify
    }
};

export const getStorageItmesByUser = async () => {
    try {
        const userFolder = auth.currentUser.uid;
        const storageRef = ref(storage, `${userFolder}/${fileName}`);
        const list = await listAll(storageRef);
        return list;
    } catch (error) {
        console.log(error);
        alert(error); //TODO: Toastify
    }
};
