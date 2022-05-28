import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './../../firebase/config';
import { sendPasswordReset } from './../../firebase/loginController';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            //TODO: Loading screen
            return;
        }
        if (user) navigate('/dashboard');
    });

    return (
        <div className="container mt-5 p-5 border">
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
            <div className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => sendPasswordReset(email)}
                >
                    Send password reset email
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

export default ResetPass;
