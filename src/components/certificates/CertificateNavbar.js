import logo from './../../logo.svg';
import { logout } from '../../firebase/loginController';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const CertificateNavbar = ({ toggleNew, newFile, sharing }) => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const shareList = () => {
        const sharingLink = `${window.location.origin}/shared/${user.uid}`;
        navigator.clipboard.writeText(sharingLink);
        toast.success('Link copied in your clipboard. Paste anywhere!');
    };

    useEffect(() => {
        if (!loading && !sharing) {
            if (!user) navigate('/');
        }
    }, [user]);

    return (
        <nav className="navbar bg-light">
            <div className="ms-3">
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="certificage-logo"
                        width="50"
                        height="50"
                    />
                    CERTIFICAGE
                </Link>
            </div>
            {sharing ? (
                <div className="me-3" id="navbarNavAltMarkup">
                    <Link className="btn btn-primary" to="/">
                        Home
                    </Link>
                </div>
            ) : (
                <div className="me-3" id="navbarNavAltMarkup">
                    <button
                        className="btn btn-primary"
                        disabled={newFile}
                        onClick={() => toggleNew(!newFile)}
                    >
                        New Certificate
                    </button>
                    <button
                        className="btn btn-secondary me-3 ms-3"
                        onClick={shareList}
                    >
                        Share
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
                </div>
            )}
        </nav>
    );
};

export default CertificateNavbar;
