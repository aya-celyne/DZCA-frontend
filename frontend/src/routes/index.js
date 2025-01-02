import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Routing setup
import Accueil from '../pages/Accueil/Accueil';
import Home from '../pages/home/Home';
import SignIn from '../pages/SignIN/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Profile from '../pages/profile/Profile';
import PrivateRouter from './privateRouter';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Accueil />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} /> {/* Public signup route */}
            

           {/* Private Routes */}
            <Route
              path="/home"
              element={
                <PrivateRouter>
                  <Home />
                </PrivateRouter>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRouter>
                  <Profile />
                </PrivateRouter>
              }
            /> 
        </Routes>
    );
};

export default AppRoutes;
