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

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert('Please enter name'); //TODO: Change this
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) {
            //TODO: Implement loading...
            return;
        }
        if (user) navigate('/dashboard', { replace: true });
    }, [user, loading]);

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
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Name"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email-input-login" className="form-label">
                    Email address
                </label>
                <input
                    id="email-input-login"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="pass-input-login" className="form-label">
                    Password
                </label>
                <input
                    id="pass-input-login"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                />
            </div>
            <div className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={register}
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
