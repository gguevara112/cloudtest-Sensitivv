import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción
import axios from 'axios';
import TestPopup from '../components/GlobalComponents/TestPopup';
import './ProductDetail.css';

const ProductDetailForUser = () => {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showTestPopup, setShowTestPopup] = useState(false);
  const userId = localStorage.getItem('userId');
  const selectedProductId = localStorage.getItem('selectedProductId');
  const { t } = useTranslation(); // Hook para traducir

  const buttonLabels = [
    { text: t('MnOpQrStUvWx23'), color: '#ed0000ff', opacityColor: 'rgba(237, 0, 0, 0.5)' }, // Critic
    { text: t('MnOpQrStUvWx24'), color: '#ffdb22ff', opacityColor: 'rgba(255, 219, 34, 0.5)' }, // Sensitive
    { text: t('MnOpQrStUvWx25'), color: '#80d425ff', opacityColor: 'rgba(128, 212, 37, 0.5)' }  // Safe
  ];

  useEffect(() => {
    const fetchUserProductDetails = async () => {
      try {
        const notesResponse = await axios.get(`http://localhost:5001/api/productnotes/${userId}/${selectedProductId}`);
        if (notesResponse.data) setNotes(notesResponse.data.note);

        const sensitivityResponse = await axios.get(`http://localhost:5001/api/listsensitivity/${userId}/${selectedProductId}`);
        if (sensitivityResponse.data) {
          const category = sensitivityResponse.data.category;
          setSelectedButton(category === 'Reactive' ? 0 : category === 'Sensitive' ? 1 : 2);
        }

        const wishlistResponse = await axios.get(`http://localhost:5001/api/wishlist/${userId}/${selectedProductId}`);
        setIsInWishlist(wishlistResponse.data !== null);
      } catch (error) {
        console.error(t('MnOpQrStUvWx26'), error); // Error al cargar datos
      }
    };

    if (userId && selectedProductId) fetchUserProductDetails();
  }, [userId, selectedProductId, t]);

  const handleNotesChange = (event) => setNotes(event.target.value);

  const handleNotesSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(`http://localhost:5001/api/productnotes`, {
        userID: userId,
        itemID: selectedProductId,
        note: notes,
        dateCreated: new Date(),
      });
    } catch (error) {
      console.error(t('MnOpQrStUvWx27'), error); // Error al guardar notas
    } finally {
      setIsSaving(false);
    }
  };

  const handleButtonClick = async (buttonIndex) => {
    setSelectedButton(buttonIndex);
    const category = buttonIndex === 0 ? 'Reactive' : buttonIndex === 1 ? 'Sensitive' : 'Safe';

    try {
      await axios.post(`http://localhost:5001/api/listsensitivity`, {
        userID: userId,
        itemID: selectedProductId,
        category,
      });
    } catch (error) {
      console.error(t('MnOpQrStUvWx28'), error); // Error al guardar categoría
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await axios.post(`http://localhost:5001/api/wishlist`, {
        userID: userId,
        itemID: selectedProductId,
        dateCreated: new Date(),
        updatedAt: new Date(),
      });
      setIsInWishlist(true);
    } catch (error) {
      console.error(t('MnOpQrStUvWx29'), error); // Error al agregar a la wishlist
    }
  };

  return (
    <div className="wishlist-notes-container">
      <div className="buttonsss">
        <div className="titleofidkwmdd">{t('MnOpQrStUvWx30')}</div> {/* Reaction */}
        <div className="selection-buttons-rect">
          {buttonLabels.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              style={{
                backgroundColor: selectedButton === index ? button.color : button.opacityColor,
              }}
              className="color-button"
            >
              {button.text}
            </button>
          ))}
        </div>
      </div> 

      <div className="notes-section">
        <h3>{t('MnOpQrStUvWx31')}</h3> {/* Notes */}
        <textarea value={notes} onChange={handleNotesChange} placeholder={t('MnOpQrStUvWx32')} />
        <button className="save-notes-button" onClick={handleNotesSave} disabled={isSaving}>
          {isSaving ? t('MnOpQrStUvWx33') : t('MnOpQrStUvWx34')}
        </button>
      </div>

      <div className="buttonsss">
        <div className='optaionsndf'>{t('MnOpQrStUvWx35')}</div> {/* Options */}
        <button className="wishlist-button" onClick={handleAddToWishlist} disabled={isInWishlist}>
          {isInWishlist ? t('MnOpQrStUvWx36') : t('MnOpQrStUvWx37')}
        </button>
        <button className="test-button" onClick={() => setShowTestPopup(true)}>
          {t('MnOpQrStUvWx38')}
        </button>
      </div>

      {showTestPopup && (
        <TestPopup
          closePopup={() => setShowTestPopup(false)}
          productId={selectedProductId}
        />
      )}
    </div>
  );
};

export default ProductDetailForUser;
