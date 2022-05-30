import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';

const Home = () => {
    const [user, loading] = useAuthState(auth);
    const [buttonConfig, setButtonConfig] = useState({
        text: 'Login',
        url: '/login',
    });

    useEffect(() => {
        if (!loading && user) {
            console.log(user);
            setButtonConfig({ text: 'Dashboard', url: '/dashboard' });
        }
    }, [user, loading]);

    return (
        <>
            INFO ... TODO the following link should be in a navbar wrapping all
            the app or only the landing page link like docs help faq etc
            <Link to={buttonConfig.url} className="btn btn-primary">
                {buttonConfig.text}
            </Link>
        </>
    );
};

export default Home;
