import { useEffect, useState } from 'react';
import { auth } from './../../firebase/config';
import { Link } from 'react-router-dom';
import {
    signInWithGoogle,
    logInWithEmailAndPassword,
} from './../../firebase/loginController';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email) {
            setEmailError('Invalid email');
            return;
        }
        if (!password) {
            setPasswordError('Invalid pass');
            return;
        }
        logInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user]);

    return (
        <div className="container mt-5 p-5 border">
            <div className="mb-4">
                <label htmlFor="email-input-login" className="form-label">
                    Email address*
                </label>
                <input
                    id="email-input-login"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="name@example.com"
                />
                {emailError && (
                    <p className="text-start text-danger mt-1">{emailError}</p>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="pass-input-login" className="form-label">
                    Password*
                </label>
                <input
                    id="pass-input-login"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                />
                {passwordError && (
                    <p className="text-start text-danger mt-1">
                        {passwordError}
                    </p>
                )}
                <p className="text-end mt-1">
                    <Link to="/reset-pass" className="text-decoration-none">
                        Forgot Password
                    </Link>
                </p>
            </div>
            <div className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={validateForm}
                >
                    Login
                </button>
                <p className="or-separator text-center">- or -</p>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={signInWithGoogle}
                >
                    <i className="fa-brands fa-google"></i>
                    <FontAwesomeIcon icon={faGoogle} /> Login with Google
                </button>
            </div>
            <hr />
            <p className="text-center">
                Not registered?{' '}
                <Link to="/register" className="text-decoration-none">
                    Create an account
                </Link>
            </p>
        </div>
    );
};

export default Login;
