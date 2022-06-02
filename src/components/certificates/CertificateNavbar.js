import logo from './../../logo.svg';
import { logout } from '../../firebase/loginController';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../firebase/userController';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CertificateNavbar = ({ toggleNew, newFile }) => {
    const [user, loading] = useAuthState(auth);
    const [isOwner, setIsOwner] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const shareList = () => {
        let sharingLink = '';
        if (userInfo.sharingLink) {
            sharingLink = userInfo.sharingLink.stringValue;
        } else {
            console.log(window.location.href); //user this to append a react url and disbale delete button
            //generate one and do the same
        }
        navigator.clipboard.writeText(sharingLink);
        toast.success('Link copied in your clipboard. Paste anywhere!');
    };

    const fetchUserInfo = async () => {
        const res = await getUser();
        if (res) setUserInfo(res);
    };

    useEffect(() => {
        if (!loading) {
            if (user) fetchUserInfo();
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
        </nav>
    );
};

export default CertificateNavbar;
