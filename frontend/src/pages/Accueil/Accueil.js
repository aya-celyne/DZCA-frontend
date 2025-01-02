import React, { useState } from 'react';
import './accueil.css'; // External CSS for styling
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="homepage">
      {/* Navigation Header */}
      <header className="homepage-header">
        <div className="header-left">
          <img src="./img/ALG.jpg" alt="Algerian Flag" />
          <img src="./img/Canada.jpg" alt="Canadian Flag" />
        </div>
        <div className="header-right">
          <nav className={menuOpen ? 'open' : ''}>
            <ul>
              <li><a onClick={() => scrollToSection('hero')}>Accueil</a></li>
              <li><a onClick={() => scrollToSection('about')}>Services</a></li>
              <li><a onClick={() => scrollToSection('contact')}>Contactez-nous</a></li>
              <li>
                <button
                  className="login-button"
                  onClick={() => navigate('/signin')}
                >
                  Se connecter
                </button>
              </li>
            </ul>
          </nav>
          <div className="hamburger" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
       {/* Hero Section */}
        <section id="hero" className="hero">
        </section>
        {/* About Section */}
        <section id="about" className="about-section">
          <div className="content-text">
            <h2>Bienvenue</h2>
            <p>
              Bienvenue sur notre application web dédiée à la communauté algérienne au Canada.
              Notre plateforme a pour mission de rapprocher les Algériens vivant au Canada
              en facilitant les échanges et les connexions.
            </p>
            <p>
              Ensemble, nous renforçons notre solidarité et facilitons la communication.
              Rejoignez-nous et contribuez à tisser des liens plus forts entre le Canada et l'Algérie.
            </p>
            <button className="cta-button" onClick={() => navigate('/signup')}>S'inscrire</button>
          </div>
          <div className="content-image">
            <img
              src="./img/Planet.png"
              alt="Illustration"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2>Services</h2>
          <div className="services-grid">
            <div className="service">
              <h3>Transport d'affaires</h3>
              <p>Facilitez le transport d'affaires entre le Canada et l'Algérie.</p>
            </div>
            <div className="service">
              <h3>Réseautage</h3>
              <p>Connectez-vous avec d'autres Algériens vivant au Canada.</p>
            </div>
            <div className="service">
              <h3>Support</h3>
              <p>Bénéficiez d'une assistance en cas de questions ou de problèmes.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <h2>Contactez-nous</h2>
          <p>Pour plus d'informations ou des problèmes, contactez-nous via :</p>
          <ul>
            <li>Courriel : contact@dzcaml.com</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Accueil;