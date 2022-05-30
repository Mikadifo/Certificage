import { Link } from 'react-router-dom';
import logo from './../../logo.svg';

const Navbar = ({ buttonConfig }) => {
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
            <div className="me-5" id="navbarNavAltMarkup">
                <Link to={buttonConfig.url} className="btn btn-primary">
                    {buttonConfig.text}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
