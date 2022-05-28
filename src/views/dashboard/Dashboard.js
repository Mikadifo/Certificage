import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { logout } from '../../firebase/loginController';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const fetchUserName = async () => {
        //TODO: Change this
        try {
            const userQuery = query(
                collection(db, 'users'),
                where('uid', '==', user?.uid),
            );
            const doc = await getDocs(userQuery);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert('An erorr ocurred fetching data'); //TODO: Change
        }
    };

    useEffect(() => {
        if (loading) {
            //TODO: implement loading screen
            return;
        }
        if (!user) return navigate('/');
        fetchUserName();
    }, [user, loading]);

    return (
        <>
            U are logged in as
            <p>{name}</p>
            <p>{user?.email}</p>
            <button
                className="btn btn-danger"
                onClick={() => {
                    logout();
                    navigate('/');
                }}
            >
                Logout
            </button>
        </>
    );
};

export default Dashboard;
