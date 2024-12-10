import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción

import axios from 'axios';
import TestPopup from '../components/GlobalComponents/TestPopup';
import './ProductDetail.css';

const ProductDetailForUser = () => {

  const [product, setProduct] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showTestPopup, setShowTestPopup] = useState(false);
  const [showToast, setShowToast] = useState(false); // Estado para controlar el toast
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
      const selectedProductId = localStorage.getItem('selectedProductId');
      if (selectedProductId) {
        const fetchProductDetails = async () => {
          try {
            const response = await axios.get(
              `https://world.openfoodfacts.org/api/v0/product/${selectedProductId}.json`
            );
            if (response.data && response.data.product) {
              setProduct(response.data.product);
            } else {
              console.error("Producto no encontrado en Open Food Facts.");
              setProduct(null);
            }
          } catch (error) {
            console.error("Error al cargar detalles del producto:", error);
          } finally {
          }
        };
  
        fetchProductDetails();
      }
      try {

  
        // Obtener la reacción de sensibilidad
        const sensitivityResponse = await axios.get(
          `http://localhost:5001/api/listsensitivity/${userId}/${selectedProductId}`
        );
        if (sensitivityResponse.data?.category) {
          const category = sensitivityResponse.data.category;
          setSelectedButton(
            category === 'Reactive'
              ? 0
              : category === 'Sensitive'
              ? 1
              : 2
          );
        } else {
          setSelectedButton(null); // Restablecer si no hay datos
        }
  
        // Verificar si está en la wishlist
        const wishlistResponse = await axios.get(
          `http://localhost:5001/api/wishlist/${userId}/${selectedProductId}`
        );
        setIsInWishlist(wishlistResponse.data !== null);

        // Obtener las notas
        const notesResponse = await axios.get(
          `http://localhost:5001/api/productnotes/${userId}/${selectedProductId}`
        );
        setNotes(notesResponse.data?.note || '');

      } catch (error) {
        console.error("Error al cargar detalles del producto:", error);
      }
    };
  
    if (userId && selectedProductId) fetchUserProductDetails();
  }, [userId, selectedProductId]);
  
  const handleNotesSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(`http://localhost:5001/api/productnotes`, {
        userID: userId,
        itemID: selectedProductId,
        note: notes,
      });
      // Vuelve a cargar los detalles después de guardar
      if (userId && selectedProductId) {
        await fetchUserProductDetails();
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error al guardar notas:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  
  const handleNotesChange = (event) => setNotes(event.target.value);



const handleButtonClick = async (buttonIndex) => {
  setSelectedButton(buttonIndex);
  const category = buttonIndex === 0 ? 'Reactive' : buttonIndex === 1 ? 'Sensitive' : 'Safe';
  setIsSaving(true);
  try {
    const response = await axios.post(`http://localhost:5001/api/listsensitivity`, {
      userID: userId,
      itemID: selectedProductId,
      category,
    });

    if (product.ingredients_text) {
      const ingredients = product.ingredients_text.split(',').map((ingredient) => ingredient.trim());
    
      for (const ingredient of ingredients) {
        try {
          const response = await axios.post(`http://localhost:5001/api/productIngredients`, {
            userID: userId,
            itemID: ingredient, // Publica cada ingrediente como un itemID
            category, // Categoría seleccionada
          });

          console.log(`Ingrediente guardado: ${ingredient}`, response.data.message);
        } catch (error) {
          console.error(`Error al guardar el ingrediente ${ingredient}:`, error);
        } finally {
          setIsSaving(false);
        }
      }          
      window.location.reload();
    } else {
      console.warn('No se encontraron ingredientes para este producto.');
    }
    

    // Mostrar el mensaje de éxito    
    if (response.status === 200 || response.status === 201) {
      console.log(response.data.message); // Mensaje desde el backend
    }

    // Actualizar la interfaz con la nueva categoría
    setSelectedButton(buttonIndex);
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
      setShowToast(true); // Mostrar el toast
      setTimeout(() => setShowToast(false), 3000); // Ocultar el toast después de 3 segundos
    } catch (error) {
      console.error('Error adding to wishlist:', error); // Mensaje de error en consola
    }
  };

  if (!product) return <p></p>; // Producto no encontrado


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
        <textarea value={notes}  maxLength="1500" onChange={handleNotesChange} placeholder={t('MnOpQrStUvWx32')} />
        <button className="save-notes-button" onClick={handleNotesSave} disabled={isSaving}>
          {isSaving ? t('MnOpQrStUvWx33') : t('MnOpQrStUvWx34')}
        </button>
      </div>
 
      <div className="buttonsss">
        <div className="optaionsndf">{t('MnOpQrStUvWx35')}</div> {/* Options */}
        <button className="wishlist-button" onClick={handleAddToWishlist} disabled={isInWishlist}>
          {isInWishlist ? t('MnOpQrStUvWx36') : t('MnOpQrStUvWx37')}
        </button>
        <button className="test-button" onClick={() => setShowTestPopup(true)}>
          {t('MnOpQrStUvWx38')}
        </button>
      </div>

      {/* Toast con Bootstrap */}
      {showToast && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1055 }}
        >
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Success</strong> {/* Título del toast */}
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
               {t('MnOpQrStUvWx40')}
            </div>
          </div>
        </div>
      )}

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
