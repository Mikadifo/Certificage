import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            INFO ... TODO the following link should be in a navbar wrapping all
            the app or only the landing page link like docs help faq etc
            <Link to="/login" className="btn btn-primary">
                login
            </Link>
        </>
    );
};

export default Home;
