import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { query } from 'firebase/database';
import { addDoc, collection, getDocs, where } from 'firebase/firestore';
import { auth, db } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const uidQuery = query(
            collection(db, 'users'),
            where('uid', '==', user.uid),
        );
        const documents = await getDocs(uidQuery);
        if (documents.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid < name,
            authProvider: 'local',
            email,
        });
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

export const logout = () => {
    signOut(auth);
};
