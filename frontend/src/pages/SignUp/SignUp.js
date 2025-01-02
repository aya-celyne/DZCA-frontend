import React, { useState, useRef } from 'react';
import './signup.css'; // Make sure this path is correct
import API from '../../api'; // Adjust API path if necessary
import { useNavigate } from 'react-router-dom';
import DynamicAlert from '../../alert/DynamicAlert'

const SignUp = () => {
  const navigate = useNavigate();
  const alertRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false, // Checkbox for terms and conditions
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Handle both inputs and checkbox
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alertRef.current.showAlert('Les mots de passe ne correspondent pas !');
      return;
    }
    if (!formData.termsAccepted) {
      alertRef.current.showAlert('Vous devez accepter les conditions d\'utilisation pour continuer.');
      return;
    }
    try {
      await API.post('/user/register', formData);
      alertRef.current.showAlert('Formulaire soumis avec succès !');
      navigate('/signin');
    } catch (error) {
      alertRef.current.showAlert('Erreur lors de l\'inscription : ' + error.response.data.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirmer mot de passe:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label htmlFor="termsAccepted">
              J'accepte les{' '}
              <a href="./img/terms.pdf" target="_blank" rel="noopener noreferrer">
                conditions d'utilisation
              </a>
            </label>
          </div>

          <button type="submit">S'inscrire</button>
        </form>
        <DynamicAlert ref={alertRef} message="Message par défaut" />
      </div>
    </div>
  );
};

export default SignUp;
