import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Dashboard from './views/dashboard/Dashboard';
import ResetPass from './views/resetpass/ResetPass';
import VerifyEmail from './views/verify/VerifyEmail';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/reset-pass" element={<ResetPass />} />
                <Route
                    exact
                    path="/dashboard"
                    element={<Dashboard sharing={false} />}
                />
                <Route
                    exact
                    path="/shared/:sharingUid"
                    element={<Dashboard sharing={true} />}
                />
                <Route
                    exact
                    path="/email-verification"
                    element={<VerifyEmail />}
                />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
            />
        </>
    );
};

export default App;
