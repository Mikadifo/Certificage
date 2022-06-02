import { query } from 'firebase/database';
import {
    collection,
    getDoc,
    getDocs,
    updateDoc,
    where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from './config';

export const updateUser = async (newInfo) => {
    try {
        const uidQuery = query(
            collection(db, 'users'),
            where('uid', '==', auth.currentUser.uid),
        );
        const documents = await getDocs(uidQuery);

        if (documents.docs.length > 0) {
            await updateDoc(documents.docs[0].ref, newInfo);
            toast.success('Your shared your certificates');
            return true;
        }
    } catch (error) {
        toast.error('Error updating user. Try again later');
        return false;
    }
};

export const getUser = async () => {
    try {
        const uidQuery = query(
            collection(db, 'users'),
            where('uid', '==', auth.currentUser.uid),
        );
        const documents = await getDocs(uidQuery);

        if (documents.docs.length > 0) {
            const docSnap = await getDoc(documents.docs[0].ref);
            if (docSnap.exists())
                return docSnap._document.data.value.mapValue.fields;
        }
        toast.error('User not found');
    } catch (error) {
        toast.error('Error fetching user. Try again later');
    }
};
