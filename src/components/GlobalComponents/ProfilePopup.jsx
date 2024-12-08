// ProfilePopup.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import './ProfilePopup.css';

const ProfilePopup = ({ closePopup }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [language, setLanguage] = useState('');
  const [trialPeriodDays, setTrialPeriodDays] = useState(3);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await fetch(`http://localhost:5001/api/users/${userId}`);
          const data = await response.json();
          setUserInfo(data);
          setLanguage(data.language || 'en');
          setTrialPeriodDays(data.trialPeriodDays || 3);
          i18n.changeLanguage(data.language || 'en');
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const handleTrialPeriodChange = (e) => {
    setTrialPeriodDays(Number(e.target.value));
  };

  const handleSavePreferences = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await fetch(`http://localhost:5001/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            language,
            trialPeriodDays
          })
        });
        closePopup();
      } catch (error) {
        console.error("Error al actualizar las preferencias del usuario:", error);
      }
    }
  };

  return (
    <div className="popupOverlayqwer">
      <div className="popupContentqwer">
        <div className='oasmpdsop'>
          <div className='iodsfino'>
            {t('JyKnEfNvQuWs')}
          </div>
          <button onClick={handleSavePreferences} className="iodfna">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className='ioansdfaxc'>
          <div className="psjdfop">
            <div className="akjsbnm">
              <img src="https://i.pinimg.com/564x/1c/43/4d/1c434d1640f9572e2ac7be5c6bac9348.jpg" alt="Profile" />
            </div>
            
            {userInfo ? (
              <div className="userInfoDisplay">
                <p><strong>{t('RgVeFkVqTgNe')}:</strong> {userInfo.name}</p>
                <p><strong>{t('LkMwPtHwNxLp')}:</strong> {userInfo.email}</p>
                <button className="mqapwir">
                  {t('EjKsLyGfLkWp')}
                </button>
                
                <hr className="eiqntsx" />
                
                <div className="dloimnv">
                  <label>{t('WpGfRtVnLyKv')}:</label>
                  <select value={language} onChange={handleLanguageChange} className="jgoiuas">
                    <option value="es">{t('FwLpTyZjXvLs')}</option>
                    <option value="en">{t('JqNgWtPvLzGx')}</option>
                  </select>
                </div>
                
                <div className="dloimnv">
                  <label>{t('JmQsPrNzHyEp')}:</label>
                  <select value={trialPeriodDays} onChange={handleTrialPeriodChange} className="woiurtn">
                    <option value="2">{t('GjHtRnMkVpLs', { count: 2 })}</option>
                    <option value="3">{t('GjHtRnMkVpLs', { count: 3 })}</option>
                    <option value="4">{t('GjHtRnMkVpLs', { count: 4 })}</option>
                    <option value="5">{t('GjHtRnMkVpLs', { count: 5 })}</option>
                  </select>
                </div>
              </div>
            ) : (
              <p>{t('VbNfGxLkRwMv')}</p>
            )}
            
            <button onClick={handleLogout} className="puialzx">
              {t('KjTpFqJnBkSw')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
