// History.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción
import { useProductContext } from '@/ProductContext';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const { setSelectedProductId } = useProductContext();
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName') || 'User'; // Obtiene el nombre del usuario desde localStorage
  const { t } = useTranslation(); // Hook de traducción


  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5001/api/history/${userId}`);
        setRecentlyViewed(response.data);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, [userId]);

  const handleProductClick = (id) => {
    // Guardar el id del producto en localStorage antes de redirigir
    localStorage.setItem('selectedProductId', id);
    navigate('/product');
  };

  return (
    <div>
      <div className='welcomeMessage'>{t('ZxCvBnMqWkLp', { userName })}</div> {/* Mensaje de bienvenida */}
      
      {isLoading ? (
        <div className="loadingSpinner"></div> // Círculo de carga
      ) : (
        <div className='historyContainer'>
          <div className='rowHistoryclock'>
            <div className='svgHistoryClock'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#848584" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div className='aksdjfb'>{t('AZDfGhJkLqWe')}</div> {/* Visto recientemente */}
          </div>
          <div className='containerResults234'>
            <div className="products-list text-center">
              <div className="row row-cols-auto">
                {recentlyViewed.map((product) => (
                  <div className="col" key={product.itemID}>
                    <button
                      className="containerProduct"
                      onClick={() => handleProductClick(product.itemID)}
                    >
                      <div className="imgProduct">
                        <img src={product.imgSrc} alt={product.name} />
                      </div>
                      <div className="nameProduct">
                        {product.name}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
