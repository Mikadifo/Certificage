import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from 'firebase/auth';
import { query } from 'firebase/database';
import { addDoc, collection, getDocs, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
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
        toast.error('Google auth failed. Try again');
    }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found':
                toast.error('User not found');
                break;
            case 'auth/wrong-password':
                toast.error('Wrong password');
                break;
            case 'auth/too-many-requests':
                toast.error('Too many requests. Try again later');
                break;
            default:
                toast.error('Server error. Try again later');
        }
    }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await sendEmailVerification(user);
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
        toast.info('Account created. Check your email');
    } catch (error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                toast.error('Email is already in use');
                break;
            default:
                toast.error('Error creating your account. Try again later');
        }
    }
};

export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err) {
        console.log(err);
        alert(err.message); //TODO: toast
    }
};

export const logout = () => {
    signOut(auth);
};
