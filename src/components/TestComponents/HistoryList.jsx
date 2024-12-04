// Test.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './HistoryList.css';

const HistoryList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const { t } = useTranslation(); // Configurar el hook de traducción

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5001/api/testmade/${userId}`);
        const tests = response.data;

        // Obtiene detalles adicionales de los productos desde Open Food Facts
        const detailedItems = await Promise.all(
          tests.map(async (test) => {
            const productResponse = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${test.itemID}.json`);
            const product = productResponse.data.product;

            return {
              id: test._id,
              name: product ? product.product_name : t('MnOpQrStUvWxA'),
              imgSrc: product ? product.image_url : "https://via.placeholder.com/100",
              lastTested: test.dateCreated,
              DaysTestSelected: test.DaysTestSelected,
              itemID: test.itemID,
            };
          })
        );

        // Limita los elementos a los últimos 10
        setItems(detailedItems.slice(-5));
      } catch (error) {
        console.error("Error al obtener los tests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, [userId]);

  const handleItemClick = (itemID) => {
    localStorage.setItem('selectedProductId', itemID);
    navigate('/product');
  };

  return (
    <div className="historyTestContainer">
      <div className='rowfILists'>
        <div className='svgHistoryofproducts'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#848584">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div className='aksdjfb'>{t('MnOpQrStUvWxB')}</div>
      </div>

      {isLoading ? (
        <div className="loadingSpinner"></div>
      ) : (
        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item" onClick={() => handleItemClick(item.itemID)}>
              <img src={item.imgSrc} alt={item.name} />
              <div className="item-name">{item.name}</div>
              <div className="last-tested">
                {t('MnOpQrStUvWxC')} {new Date(item.lastTested).toLocaleString()}
              </div>
              <div className="days-test-selected">
                 {t('MnOpQrStUvWxD')} {item.DaysTestSelected}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
