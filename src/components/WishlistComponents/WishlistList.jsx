// Wishlist.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './WishlistList.css';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false); // Estado para controlar el toast
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5001/api/wishlist/${userId}`);
        const wishlistItems = response.data;
        const detailedItems = await Promise.all(
          wishlistItems.map(async (item) => {
            const productResponse = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${item.itemID}.json`);
            const product = productResponse.data.product;
            return {
              id: item._id,
              name: product.product_name,
              imgSrc: product.image_url,
              itemID: item.itemID,
              code: product.code,
            };
          })
        );

        setItems(detailedItems);
      } catch (error) {
        console.error("Error al obtener la wishlist del usuario:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleItemClick = (itemID) => {
    // Guardar el id del producto en localStorage antes de redirigir
    localStorage.setItem('selectedProductId', itemID);

    navigate('/product');
  };

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDrop = (index) => {
    const newItems = [...items];
    const draggedOverItem = newItems[index];
    newItems[index] = newItems[draggedItem];
    newItems[draggedItem] = draggedOverItem;
    setItems(newItems);
    setDraggedItem(null);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5001/api/wishlist/${userId}/${itemId}`);
      setItems(items.filter(item => item.itemID !== itemId));
      navigate('/wishlist');
      setShowToast(true); // Mostrar el toast
      setTimeout(() => setShowToast(false), 3000); // Ocultar el toast después de 3 segundos
    } catch (error) {
      console.error("Error al eliminar el producto de la wishlist:", error);
    }
  };

  return (
    <div className="wishlistContainer">
      <div className='rowfIW'>
        <div className='starIconW'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8b5cf6" className="size-6">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className='añlsdkfj'>{t('WxYzAbCdEfGh')}</div> {/* Wishlist */}
      </div>

      {isLoading ? (
        <div className="loadingSpinner"></div>
      ) : (
        <div className="item-listW">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`item ${draggedItem === index ? 'dragged' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              onClick={() => handleItemClick(item.code)} // Al hacer clic, se establece el ID del producto y se navega a ProductDetail
            >
              <img src={item.imgSrc} alt={item.name} />
              <div className="item-name5">{item.name}</div>

              <button className="testButton">{t('HiJkLmNoPqRs')}</button> {/* Test */}
              <button className="deleteButton" onClick={() => handleDelete(item.itemID)}>{t('TuVwXyZaBcDe')}</button> {/* Delete */}
            </div>
          ))}
        </div>
      )}

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
               {t('MnOpQrStUvWx41')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
