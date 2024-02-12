import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/StartPage/Login.js';
import BalanceTopUp from './components/Balance/BalanceTopUp.js';
import MainPage from './components/MainPage/MainPage.js';
import CreateFight from './components/CreateFight/CreateFight.js';
import BetPage from './components/BetPage/BetPage.js';
import UserProfile from "./components/UserProfile/UserProfile";
import RegistrationPage from "./components/StartPage/RegistrationPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/top-up" element={<BalanceTopUp />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/create-fight" element={<CreateFight />} />
                <Route path="/bet" element={<BetPage />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;