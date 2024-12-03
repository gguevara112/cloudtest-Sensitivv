import React, { useEffect, useState } from 'react';
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

  const buttonLabels = [
    { text: 'Critic', color: '#ed0000ff', opacityColor: 'rgba(237, 0, 0, 0.5)' },
    { text: 'Sensitive', color: '#ffdb22ff', opacityColor: 'rgba(255, 219, 34, 0.5)' },
    { text: 'Safe', color: '#80d425ff', opacityColor: 'rgba(128, 212, 37, 0.5)' }
  ];

  useEffect(() => {
    const fetchUserProductDetails = async () => {
      try {
        // Cargar notas desde la base de datos
        const notesResponse = await axios.get(`http://localhost:5001/api/productnotes/${userId}/${selectedProductId}`);
        if (notesResponse.data) setNotes(notesResponse.data.note);

        // Cargar categoría de sensibilidad desde la base de datos
        const sensitivityResponse = await axios.get(`http://localhost:5001/api/listsensitivity/${userId}/${selectedProductId}`);
        if (sensitivityResponse.data) {
          const category = sensitivityResponse.data.category;
          setSelectedButton(category === 'Reactive' ? 0 : category === 'Sensitive' ? 1 : 2);
        }

        // Cargar estado de wishlist desde la base de datos
        const wishlistResponse = await axios.get(`http://localhost:5001/api/wishlist/${userId}/${selectedProductId}`);
        setIsInWishlist(wishlistResponse.data !== null);
      } catch (error) {
        console.error('Error al cargar detalles específicos del usuario:', error);
      }
    };

    if (userId && selectedProductId) fetchUserProductDetails();
  }, [userId, selectedProductId]);

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
      console.error("Error al guardar la nota del producto:", error);
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
      console.error("Error al guardar la categoría de sensibilidad:", error);
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
      console.error("Error al agregar a la wishlist:", error);
    }
  };

  return (
    <div className="wishlist-notes-container">
      <div className="buttonsss">
        <div className="titleofidkwmdd">Reaction</div>
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
        <h3>Notes</h3>
        <textarea value={notes} onChange={handleNotesChange} placeholder="Type here" />
        <button className="save-notes-button" onClick={handleNotesSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="buttonsss">
        <div className='optaionsndf'>Options</div>
        <button className="wishlist-button" onClick={handleAddToWishlist} disabled={isInWishlist}>
          {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>
        <button className="test-button" onClick={() => setShowTestPopup(true)}>
          Start test
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
