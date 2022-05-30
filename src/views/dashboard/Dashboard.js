import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { logout } from '../../firebase/loginController';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) return navigate('/');
            if (!user.emailVerified) return navigate('/email-verification');
        }
    }, [user, loading]);

    return (
        <>
            U are logged in as
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
