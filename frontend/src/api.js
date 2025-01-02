import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`, // Change cette URL si tu déploies l'API.
});

// Middleware pour ajouter le token aux requêtes
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;