import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from './GlobalComponents/ProfilePopup';
import ProductSearchBox from '../componentsDBOFF/ProductSearchBox';

import './HeaderTwo.css';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const closePopup = () => {
    setIsPopupOpen(false); // Cierra el popup
  };
  const handleLoginClickNavLOG = () => {
    navigate('/login');
  };
  const handleLoginClickNavSIGN = () => {
    navigate('/signup');
  };

  return (
    <div className="containerHeader2">
      <div className="headerContentSplit">
        <div className='hamIconAndSearch'>
          <div className='hamAndIconn'>

            <div className='okmnjikkshj'></div>

              <div className='svgIconSensitivv'>
                <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> {/* Gradientes para los círculos pequeños */} <defs> <linearGradient id="redGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ff4d4d", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ed0000", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="yellowGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ffeb3b", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ffdb22", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="greenGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#a4e643", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#80d425", stopOpacity: 1 }} /> </linearGradient> </defs> {/* Círculo principal en blanco sin sombras */} <circle cx="50" cy="50" r="50" fill="white" stroke="grey" strokeWidth="1" /> {/* Círculos pequeños con gradiente lineal */} <circle cx="40" cy="30" r="10" fill="url(#redGradient)" /> <circle cx="70" cy="30" r="10" fill="url(#yellowGradient)" /> <circle cx="70" cy="60" r="10" fill="url(#greenGradient)" /> </svg>
              </div>
              <div className='brand'>Sensitivv</div>
          </div>
          <div className='searchContainer'>
            <div className='searchShaper'>
              <div className='searchStyle'>

                <div className='spaceSearchBox'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='profile'>
          <div className='imageContainer'>

            <button className="AjdfosDFKsdfJ"  onClick={handleLoginClickNavLOG} >Log In</button>
            <button className="AjdfosDFKsdfJ2" onClick={handleLoginClickNavSIGN} >Sign In</button>
          </div>
        </div>
      </div>

      {isPopupOpen && <ProfilePopup closePopup={closePopup} />}
    </div>
  );
};

export default Header;
