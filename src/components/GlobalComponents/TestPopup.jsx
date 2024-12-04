import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import './ProfilePopup.css';

const ProfilePopup = ({ closePopup }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [language, setLanguage] = useState('');
  const [trialPeriodDays, setTrialPeriodDays] = useState(3); // Preferencia original del usuario
  const [selectedTrialPeriodDays, setSelectedTrialPeriodDays] = useState(3); // Valor seleccionado en el popup
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
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
          setTrialPeriodDays(data.trialPeriodDays || 3); // Cargar la preferencia original del usuario
          setSelectedTrialPeriodDays(data.trialPeriodDays || 3); // Usar la preferencia como valor predeterminado en el popup
          i18n.changeLanguage(data.language || 'en');
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      }
    };

    const fetchProductInfo = async () => {
      const productId = localStorage.getItem('selectedProductId');
      if (productId) {
        try {
          const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${productId}.json`);
          const data = await response.json();
          if (data.product) {
            setProductImage(data.product.image_url);
            setProductName(data.product.product_name);
          }
        } catch (error) {
          console.error("Error al obtener la información del producto:", error);
        }
      }
    };

    fetchUserInfo();
    fetchProductInfo();
  }, []);

  const closepls = () => {
    closePopup();
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const handleTrialPeriodChange = (e) => {
    setSelectedTrialPeriodDays(Number(e.target.value)); // Actualiza solo el valor del popup
  };

  const handleSavePreferences = async () => {
    const userId = localStorage.getItem('userId');
    const itemID = localStorage.getItem('selectedProductId'); // Obtener el itemID desde el localStorage
    const dateCreated = new Date();
    navigate('/test');


    if (userId) {
      try {
        // Actualizar preferencias del usuario
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

        // Guardar el test realizado en la tabla "testmade" con DaysTestSelected
        if (itemID) {
          await fetch(`http://localhost:5001/api/testmade`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userID: userId,
              itemID,
              dateCreated,
              DaysTestSelected: selectedTrialPeriodDays // Guardar el valor actualmente seleccionado en el popup
            })
          });
        }

        closePopup();
      } catch (error) {
        console.error("Error al actualizar las preferencias o guardar el test:", error);
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
          <button onClick={closepls} className="iodfna">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className='ioansdfaxc'>
          <div className="psjdfop">
            {userInfo ? (
              <div className="userInfoDisplay">
                {productImage && (
                  <div className="product-imageBContainer">
                    <div className="product-image2Container">
                      <div className="product-image2">
                        <img src={productImage} alt="Selected Product" />
                      </div>
                    </div>
                    <div className="product-namegggg">{productName}</div>
                  </div>
                )}
                
                <div className="dloimnv">
                  <label>{t('JmQsPrNzHyEp')}:</label>
                  <select value={selectedTrialPeriodDays} onChange={handleTrialPeriodChange} className="woiurtn">
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
            
            <button onClick={handleSavePreferences} className="puialzx3">
              {t('KjTpFqJnBkSw3')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
