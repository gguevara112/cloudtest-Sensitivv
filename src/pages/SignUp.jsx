// SignUp.jsx
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
    confirmPassword: ''
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

    // Detectar idioma del navegador o asignar inglés si no está disponible
    const browserLanguage = i18n.language || 'en';
    const userLanguage = ['en', 'es'].includes(browserLanguage) ? browserLanguage : 'en';

    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          language: userLanguage,          // Asignar idioma detectado o inglés
          trialPeriodDays: 5               // Valor predeterminado
        })
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

      navigate('/');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(t('LjRtKqXsVwMn')); // Hubo un error al registrar el usuario. Inténtalo de nuevo.
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{t('PgLrTqJsXzVm')}</h2> {/* Crear Cuenta */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('JqPwFxTlRvNw')}</label> {/* Nombre */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('FrWpNtQjLzMv')}</label> {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('LfNrTjPwXzQk')}</label> {/* Contraseña */}
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-button"
              >
                {passwordVisible ? t('PqFsRvJmXtQl') : t('LmPsQwNrTvFx')} {/* Mostrar/Ocultar */}
              </button>
            </div>
            {!passwordValid && formData.password.length > 0 && (
              <p className="error-text2">{t('HsJkTrLvBnLk')}</p>
            )}
          </div>
          <div className="form-group">
            <label>{t('XnLqTvFrRmNs')}</label> {/* Confirmar Contraseña */}
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-button"
              >
                {passwordVisible ? t('PqFsRvJmXtQl') : t('LmPsQwNrTvFx')} {/* Mostrar/Ocultar */}
              </button>
            </div>
            {!passwordsMatch && formData.confirmPassword.length > 0 && (
              <p className="error-text2">{t('FkLnRtQwXzTv')}</p>
            )}
          </div>
          <button type="submit" className="signup-button" disabled={!passwordValid || !passwordsMatch}>
            {t('JsRwNqTwXlBt')} {/* Registrarse */}
          </button>
        </form>
        <div className="signup-footer">
          <button onClick={handleLoginClick} className="login-link">
            {t('LqKsTwFxRjXp')} {/* ¿Ya tienes una cuenta? Inicia Sesión */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
