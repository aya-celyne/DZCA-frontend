// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'; // Import des routes

function App() {
    return (
        <Router>
            <AppRoutes /> {/* Utilisation des routes */}
        </Router>
    );
}

export default App;
