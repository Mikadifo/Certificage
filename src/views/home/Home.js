import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { auth } from '../../firebase/config';
import logo from './../../logo.svg';

const Home = () => {
    const [user, loading] = useAuthState(auth);
    const [buttonConfig, setButtonConfig] = useState({
        text: '',
        url: '',
    });

    useEffect(() => {
        if (!loading && user) {
            return setButtonConfig({ text: 'Dashboard', url: '/dashboard' });
        }
        setButtonConfig({ text: 'Get Started', url: '/register' });
    }, [user, loading]);

    return (
        <>
            <Navbar buttonConfig={buttonConfig} />
            <div className="container mt-5 p-3 border rounded">
                <h1 className="text-center">About</h1>
                <p>
                    Certificage is an open source project created to save in a
                    secure way all your certificates you've earned through your
                    academic and professional life.
                </p>
                <div className="text-center">
                    <img src={logo} alt="Certificage-logo" width="300" />
                </div>
            </div>
            <div className="container mt-5 p-3 border rounded">
                <h1 className="text-center">How it works</h1>
                <p>
                    In Certificage your account is stored in firebase both
                    google login or your email and password if you prefer.
                </p>
                <p>
                    Also, your certificates are uploaded to the firebase cloud
                    and you can share them through a link you can paste
                    anywhere.
                </p>
            </div>
            <div className="container mt-5 p-3 border rounded">
                <h1 className="text-center">Contribuing</h1>
                <p>
                    You can contribute to the source code of this project which
                    is in this github repository:
                </p>
                <div className="text-center mb-4">
                    <a
                        href="https://github.com/Mikadifo/Certificage"
                        target="_blank"
                    >
                        Mikadifo/Certificage
                    </a>
                </div>
                <p>
                    I'll really appreciate your interest in this project in any
                    way you collaborate, code, issues, typo, or documentation.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default Home;
