// ItemsL.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción
import './ItemsL.css';

const ItemsL = ({ items }) => {
  const { t } = useTranslation(); // Hook de traducción

  return (
    <ul className="listContainer">
      {items.map(item => (
        <li key={item.id} className="listItem">
          <img src={item.imgSrc} alt={item.name} />
          <div className="itemDetails">
            <h3>{item.name}</h3> 
            <p>{t('A1B2C3D4E5F7')} {/* Categoría: */} 
              {item.category === 'Reactive' ? t('G7H8I9J0K1L2') : item.category === 'Sensitive' ? t('M3N4O5P6Q7R8') : t('S9T0U1V2W3X4')}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemsL;
