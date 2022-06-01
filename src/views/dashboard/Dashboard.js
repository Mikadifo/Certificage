import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import CertificasteList from '../../components/certificates/CertificatesList';
import NewCertificate from '../../components/certificates/NewCertificate';
import { auth } from '../../firebase/config';
import { logout } from '../../firebase/loginController';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const [newFile, toggleNew] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) return navigate('/');
            if (!user.emailVerified) return navigate('/email-verification');
        }
    }, [user, loading]);

    return (
        <>
            <button
                className="btn btn-primary"
                disabled={newFile}
                onClick={() => toggleNew(!newFile)}
            >
                New
            </button>
            <button
                className="btn btn-danger"
                onClick={() => {
                    logout();
                    navigate('/');
                }}
            >
                Logout
            </button>
            {newFile ? (
                <NewCertificate showing={newFile} setShowing={toggleNew} />
            ) : (
                <CertificasteList />
            )}
        </>
    );
};

export default Dashboard;
