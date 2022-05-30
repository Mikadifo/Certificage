import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="text-center">
            <div className="container pt-4 networks">
                <section>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="https://www.instagram.com/mikadifo/"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="https://github.com/Mikadifo"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="https://www.linkedin.com/in/michael-padilla-aab717237/"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </section>
            </div>
            <div className="text-center p-3 copyright">
                © 2022 Copyright:{' '}
                <a
                    className="author"
                    href="https://mikadifo.com/"
                    target="_blank"
                >
                    mikadifo.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
