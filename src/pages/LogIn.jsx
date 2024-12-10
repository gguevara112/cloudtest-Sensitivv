import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Necesitamos decodificar el token

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Decodificar el JWT del credentialResponse
      const decoded = jwtDecode(credentialResponse.credential);
      const userId = decoded.sub; // El ID único del usuario
      const name = decoded.name; // Nombre del usuario

      console.log('UserId:', userId);
      console.log('Name:', name);

      // Opcional: Guarda estos valores en localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', name);
      navigate('/home');  

      // Aquí puedes enviar el token o los datos al backend si es necesario
    } catch (error) {
      console.error('Error al procesar las credenciales de Google:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Error al iniciar sesión con Google');
  };

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
      <div className="login-box2">
        <div className='ikmnbhgyuiolpoiuygvbenasd'>              
          <div className='svgIconSensitivvds'>
                  <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> {/* Gradientes para los círculos pequeños */} <defs> <linearGradient id="redGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ff4d4d", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ed0000", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="yellowGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ffeb3b", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ffdb22", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="greenGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#a4e643", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#80d425", stopOpacity: 1 }} /> </linearGradient> </defs> {/* Círculo principal en blanco sin sombras */} <circle cx="50" cy="50" r="50" fill="white" stroke="gray" strokeWidth="1" /> {/* Círculos pequeños con gradiente lineal */} <circle cx="40" cy="30" r="10" fill="url(#redGradient)" /> <circle cx="70" cy="30" r="10" fill="url(#yellowGradient)" /> <circle cx="70" cy="60" r="10" fill="url(#greenGradient)" /> </svg>
          </div>
          <div className='brand'>Sensitivv</div> 
        </div>
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
        <div>
      {/* Botón de inicio de sesión con Google */}
      <div className="sdfsdfdsfsdffffff">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
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
    </div>
  );
};

export default Login;
