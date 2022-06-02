import {
    deleteObject,
    getDownloadURL,
    listAll,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { toast } from 'react-toastify';
import { auth, storage } from './config';

export const uploadCertificate = (file, fileName) => {
    try {
        const userFolder = auth.currentUser.uid;
        const storageRef = ref(storage, `${userFolder}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return uploadTask;
    } catch (error) {
        toast.error('Error uploading your certificate. Try again later');
    }
};

export const getStorageItmesByUser = async () => {
    try {
        const userFolder = auth.currentUser.uid;
        const storageRef = ref(storage, `${userFolder}`);
        const dir = await listAll(storageRef);
        const urls = dir.items.map(async (item) => {
            return {
                id: item.fullPath,
                name: item.name,
                url: await getDownloadURL(item),
            };
        });

        return urls;
    } catch (error) {
        toast.error('Error loading your certificates. Try again later');
    }
};

export const deleteItemById = (id) => {
    try {
        const storageRef = ref(storage, id);

        return deleteObject(storageRef);
    } catch (error) {
        toast.error('Error deleting your certificate. Try again later');
    }
};
