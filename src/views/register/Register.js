import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import {
    registerWithEmailAndPassword,
    signInWithGoogle,
} from '../../firebase/loginController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
    emailRegex,
    nameRegex,
    passwordRegex,
} from '../../validations/FormValidations';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        registerWithEmailAndPassword(name, email, password);
    };

    const emailChanged = ({ target }) => {
        setEmail(target.value);
        setEmailError(
            !emailRegex.test(target.value)
                ? 'Invalid email (Ex: name@example.com)'
                : '',
        );
    };

    const passwordChanged = ({ target }) => {
        setPassword(target.value);
        setPasswordError(
            !passwordRegex.test(target.value)
                ? 'Password must be 8 characters at least'
                : '',
        );
    };

    const nameChanged = ({ target }) => {
        setName(target.value);
        setNameError(
            !nameRegex.test(target.value)
                ? 'Name can only contain alphanumerics (a-z, 0-9, _) and be 4 characters at least'
                : '',
        );
    };

    useEffect(() => {
        if (!loading) {
            if (user) navigate('/dashboard');
        }
    }, [user]);

    return (
        <div className="container mt-5 p-5 border">
            <div className="mb-3">
                <label htmlFor="name-input-login" className="form-label">
                    Name
                </label>
                <input
                    id="name-input-login"
                    type="text"
                    value={name}
                    onChange={nameChanged}
                    className="form-control"
                    placeholder="Name"
                    required
                />
                {nameError && (
                    <p className="text-start text-danger mt-1">{nameError}</p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="email-input-login" className="form-label">
                    Email address
                </label>
                <input
                    id="email-input-login"
                    type="email"
                    value={email}
                    onChange={emailChanged}
                    className="form-control"
                    placeholder="Email"
                    required
                />
                {emailError && (
                    <p className="text-start text-danger mt-1">{emailError}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="pass-input-login" className="form-label">
                    Password
                </label>
                <input
                    id="pass-input-login"
                    type="password"
                    value={password}
                    onChange={passwordChanged}
                    className="form-control"
                    placeholder="Password"
                    required
                />
                {passwordError && (
                    <p className="text-start text-danger mt-1">
                        {passwordError}
                    </p>
                )}
            </div>
            <div className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={register}
                    disabled={
                        !name ||
                        !email ||
                        !password ||
                        emailError ||
                        passwordError ||
                        nameError
                    }
                >
                    Register
                </button>
                <p className="or-separator text-center">- or -</p>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={signInWithGoogle}
                >
                    <i className="fa-brands fa-google"></i>
                    <FontAwesomeIcon icon={faGoogle} /> Register with Google
                </button>
            </div>
            <hr />
            <p className="text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
