import { sendEmailVerification } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import './VerifyEmail.css';

const VerifyEmail = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(true);
    const [timer, setTimer] = useState(10);

    const sendVerificationEmailAgain = () => {
        sendEmailVerification(user);
        setEmailSent(true);
        setTimer(10);
    };

    useEffect(() => {
        if (!user) return;
        if (user.emailVerified) return navigate('/dashboard');
    }, [user]);

    useEffect(() => {
        const TimerInt =
            timer > 0
                ? setInterval(() => {
                      setTimer((timer) => timer - 1);
                  }, 1000)
                : setEmailSent(false);
        return () => {
            clearInterval(TimerInt);
        };
    }, [timer]);

    return (
        <div className="container mt-5 p-5 border text-center">
            <h2>Please verify your email</h2>
            <h3 className="text-decoration-underline mb-5">{user?.email}</h3>
            <div className="options-verify">
                <p>
                    <b>Don't have the verification email in your inbox?</b>
                </p>
                <p>Check your spam folder</p>
                <p>Check that the email you wrote is correct</p>
            </div>
            <button
                className="btn btn-primary mt-5"
                onClick={sendVerificationEmailAgain}
                disabled={emailSent}
            >
                Send Verification Email Again
            </button>
            {timer > 0 && (
                <p className="mt-1">You can send another email in: {timer}s</p>
            )}
        </div>
    );
};

export default VerifyEmail;
