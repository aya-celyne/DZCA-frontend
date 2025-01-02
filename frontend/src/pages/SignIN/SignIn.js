
import React, { useState, useEffect, useRef } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom'
import './signIn.css'
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, setUserData } from '../../redux/userSlice';
import DynamicAlert from '../../alert/DynamicAlert'

const SignIn = () => {
  const dispatch = useDispatch(); // Initialiser dispatch
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const alertRef = useRef();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
      if (userData) {
        // Si l'utilisateur est connecté, rediriger vers la page Home
        navigate('/home');
      }
    }, [userData, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/user/login', formData);
            const data = response.data;
            
            if (response.status === 201) { // Vérifie le statut HTTP
              localStorage.setItem('token', response.data.token); // Stocke le token pour les futures requêtes
              dispatch(setUserId(data.user._id)); // Enregistre le userId dans Redux
               dispatch(setUserData(data.user)); 
              navigate('/home'); // Navigue vers la page Profile
            } else {
              alertRef.current.showAlert(data.message || 'Login failed.'); // Affiche un message d'erreur si fourni
            }
                
            

            
        } catch (error) {
          alertRef.current.showAlert('Error logging in:', error.message);
        }
    };

    return (
              <div className="login-page">
            <div className="login-container">
              <h2>Se connecter</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mot de passe:</label>
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                </div>
                <button type="submit">Se connecter</button>
              </form>
              <DynamicAlert ref={alertRef} message="Message par défaut" />
            </div>
        
          </div>
             
              
          );
};

export default SignIn;







