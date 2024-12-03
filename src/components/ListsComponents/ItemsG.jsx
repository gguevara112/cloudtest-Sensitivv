// ItemsG.jsx
import React from 'react';
import './ItemsG.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ItemsG = ({ items, categories, onItemClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleItemClick = (itemID) => {
    // Guardar el itemID en localStorage antes de navegar
    localStorage.setItem('selectedProductId', itemID);
    navigate('/product');
  };

  return (
    <div className="gridContainer">
      {categories.map((category) => (
        <div key={category} className="categoryColumn">
          <div className="titleWithCircle">
            <div
              className={`circle ${
                category === 'Reactive' ? 'redCircle' : category === 'Sensitive' ? 'yellowCircle' : 'greenCircle'
              }`}
            ></div>
            <h3>
              {category === 'Reactive' ? t('A1B2C3D4E5F6') : category === 'Sensitive' ? t('G7H8I9J0K1L2') : t('M3N4O5P6Q7R8')}
            </h3>
          </div>
          {items
            .filter((item) => item.category === category)
            .map((item) => (
              <div key={item.id} className="gridItem" onClick={() => handleItemClick(item.itemID)}>
                <img src={item.imgSrc} alt={item.name} />
                <h4>{item.name}</h4>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ItemsG;
