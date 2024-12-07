import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordValid(value.length >= 8);
      setPasswordsMatch(value === formData.confirmPassword);
    } else if (name === 'confirmPassword') {
      setPasswordsMatch(value === formData.password);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      alert(t('HsJkTrLvBnLk')); // La contraseña debe tener al menos 8 caracteres.
      return;
    }

    if (!passwordsMatch) {
      alert(t('FkLnRtQwXzTv')); // Las contraseñas no coinciden.
      return;
    }

    const browserLanguage = i18n.language || 'en';
    const userLanguage = ['en', 'es'].includes(browserLanguage) ? browserLanguage : 'en';

    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          language: userLanguage,
          trialPeriodDays: 5,
        }),
      });

      if (response.status === 409) {
        alert(t('JsNxPwRqLmBt')); // El correo ya está registrado. Usa otro correo.
        return;
      }

      if (!response.ok) {
        throw new Error('Error al crear la cuenta');
      }

      const data = await response.json();
      console.log('Cuenta creada:', data);

      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert(t('LjRtKqXsVwMn')); // Hubo un error al registrar el usuario. Inténtalo de nuevo.
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
            <div className="login-box2">
        <div className='ikmnbhgyuiolpoiuygvbenasd'>              
          <div className='svgIconSensitivv'>
                  <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> {/* Gradientes para los círculos pequeños */} <defs> <linearGradient id="redGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ff4d4d", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ed0000", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="yellowGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ffeb3b", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ffdb22", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="greenGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#a4e643", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#80d425", stopOpacity: 1 }} /> </linearGradient> </defs> {/* Círculo principal en blanco sin sombras */} <circle cx="50" cy="50" r="50" fill="white" stroke="gray" strokeWidth="1" /> {/* Círculos pequeños con gradiente lineal */} <circle cx="40" cy="30" r="10" fill="url(#redGradient)" /> <circle cx="70" cy="30" r="10" fill="url(#yellowGradient)" /> <circle cx="70" cy="60" r="10" fill="url(#greenGradient)" /> </svg>
          </div>
          <div className='brand'>Sensitivv</div> 
        </div>


      <div className="signup-box">
        <h2>{t('PgLrTqJsXzVm')}</h2> {/* Crear Cuenta */}
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              name="name"
              maxLength="50"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('JqPwFxTlRvNw')} // Nombre
              required
            />
            <label htmlFor="floatingName">{t('JqPwFxTlRvNw')}</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('FrWpNtQjLzMv')} // Email
              required
            />
            <label htmlFor="floatingEmail">{t('FrWpNtQjLzMv')}</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type={passwordVisible ? 'text' : 'password'}
              className={`form-control ${!passwordValid && formData.password.length > 0 ? 'is-invalid' : ''}`}
              id="floatingPassword"
              name="password"
              maxLength="50"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t('LfNrTjPwXzQk')} // Contraseña
              required
            />
            <label htmlFor="floatingPassword">{t('LfNrTjPwXzQk')}</label>
            {!passwordValid && formData.password.length > 0 && (
              <p className="error-text2">{t('HsJkTrLvBnLk')}</p>
            )}
          </div>
          <div className="form-floating mt-3">
            <input
              type={passwordVisible ? 'text' : 'password'}
              className={`form-control ${!passwordsMatch && formData.confirmPassword.length > 0 ? 'is-invalid' : ''}`}
              id="floatingConfirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder={t('XnLqTvFrRmNs')} // Confirmar Contraseña
              required
            />
            <label htmlFor="floatingConfirmPassword">{t('XnLqTvFrRmNs')}</label>
            {!passwordsMatch && formData.confirmPassword.length > 0 && (
              <p className="error-text2">{t('FkLnRtQwXzTv')}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-3" disabled={!passwordValid || !passwordsMatch}>
            {t('JsRwNqTwXlBt')} {/* Registrarse */}
          </button>
        </form>
        <div className="signup-footer mt-4">
          <button onClick={handleLoginClick} className="btn btn-link">
            {t('LqKsTwFxRjXp')} {/* ¿Ya tienes una cuenta? Inicia Sesión */}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
