import { useEffect, useState } from 'react';
import { auth } from './../../firebase/config';
import {
    signInWithGoogle,
    logInWithEmailAndPassword,
} from './../../firebase/loginController';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            //TODO: Loading screen
            return;
        }
        if (user) navigate('/dashboard');
    }, [user, loading]);

    return (
        <div className="container mt-5 p-5 border">
            <div className="mb-3">
                <label htmlFor="email-input-login" className="form-label">
                    Email address
                </label>
                <input
                    id="email-input-login"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="pass-input-login" className="form-label">
                    Password
                </label>
                <input
                    id="pass-input-login"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                />
            </div>
        </div>
    );
};

export default Login;
