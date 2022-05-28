import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Dashboard from './views/dashboard/Dashboard';
import ResetPass from './views/resetpass/ResetPass';
import './App.css';

const App = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/reset-pass" element={<ResetPass />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
};

export default App;
