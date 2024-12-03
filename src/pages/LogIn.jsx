// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || t('RfGxBqWsJyKv')); // Error en la autenticación
        return;
      }
  
      const data = await response.json();
  
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.name);
      
      if (data.language) {
        i18n.changeLanguage(data.language);
      }

      navigate('/home');
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setError(t('LtPgNxGrLxVy')); // Hubo un error al intentar iniciar sesión.
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{t('QkPsYwVzBfHt')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('LkMwPtHwNxLp')}</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('MtQxGyLpNtVw')}</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">{t('QkPsYwVzBfHt')}</button>
        </form>
        <div className="login-footer">
          <button onClick={handleSignUpClick} className="signup-link">{t('ZrNxYfQwGbLt')}</button>
          <a href="#" className="forgot-password">{t('KsLqPwGrVxFy')}</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
