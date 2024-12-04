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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
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
      console.error('Error al intentar iniciar sesión:', error);
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
          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              id="floatingInputInvalid"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInputInvalid">{t('LkMwPtHwNxLp')}</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="password"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              id="floatingPassword"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder={t('MtQxGyLpNtVw')}
              required
            />
            <label htmlFor="floatingPassword">{t('MtQxGyLpNtVw')}</label>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn btn-primary mt-3">
            {t('QkPsYwVzBfHt')}
          </button>
        </form>
        <div className="login-footer mt-4">
          <button onClick={handleSignUpClick} className="btn btn-link">
            {t('ZrNxYfQwGbLt')}
          </button>
          <a href="#" className="forgot-password">
            {t('KsLqPwGrVxFy')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
