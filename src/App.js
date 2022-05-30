import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Dashboard from './views/dashboard/Dashboard';
import ResetPass from './views/resetpass/ResetPass';
import './App.css';
import VerifyEmail from './views/verify/VerifyEmail';

const App = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/reset-pass" element={<ResetPass />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route
                    exact
                    path="/email-verification"
                    element={<VerifyEmail />}
                />
            </Routes>
        </>
    );
};

export default App;
