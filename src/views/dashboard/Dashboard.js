import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import CertificateNavbar from '../../components/certificates/CertificateNavbar';
import CertificasteList from '../../components/certificates/CertificatesList';
import NewCertificate from '../../components/certificates/NewCertificate';
import { auth } from '../../firebase/config';

const Dashboard = ({ sharing }) => {
    const [user, loading] = useAuthState(auth);
    const [newFile, toggleNew] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !sharing) {
            if (!user) return navigate('/');
            if (!user.emailVerified) return navigate('/email-verification');
        }
    }, [user, loading]);

    return (
        <>
            <CertificateNavbar
                toggleNew={toggleNew}
                newFile={newFile}
                sharing={sharing}
            />
            {newFile ? (
                <NewCertificate setShowing={toggleNew} />
            ) : (
                <CertificasteList sharing={sharing} />
            )}
        </>
    );
};

export default Dashboard;
