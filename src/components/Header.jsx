import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from './GlobalComponents/ProfilePopup';
import ProductSearchBox from '../componentsDBOFF/ProductSearchBox';

import './Header.css';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Estado para la visibilidad del Sidebar

  const handleProfileClick = () => {
    setIsPopupOpen(true); // Abre el popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Cierra el popup
  };

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible); // Alterna la visibilidad del Sidebar
    toggleSidebar(!isSidebarVisible); // Llama a la función pasada desde Wishlist para notificar el cambio
  };

  return (
    <div className="containerHeader">
      <div className="headerContentSplit">
        <div className='hamIconAndSearch'>
          <div className='hamAndIconn'>
            <button className='hamburgerIconB' onClick={handleSidebarToggle}>
              <div className="hamburgerIconn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 12" strokeWidth="2" stroke="#5f6368" width="24px" height="24px">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h16M1 6h16M1 11h16" />
                </svg>
              </div>
            </button>
            <div className='okmnjikkshj'></div>

              <div className='svgIconSensitivv'>
                <svg width="42" height="42" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> {/* Gradientes para los círculos pequeños */} <defs> <linearGradient id="redGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ff4d4d", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ed0000", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="yellowGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#ffeb3b", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#ffdb22", stopOpacity: 1 }} /> </linearGradient> <linearGradient id="greenGradient" x1="50%" y1="0%" x2="50%" y2="100%"> <stop offset="0%" style={{ stopColor: "#a4e643", stopOpacity: 1 }} /> <stop offset="100%" style={{ stopColor: "#80d425", stopOpacity: 1 }} /> </linearGradient> </defs> {/* Círculo principal en blanco sin sombras */} <circle cx="50" cy="50" r="50" fill="white" stroke="black" strokeWidth="0" /> {/* Círculos pequeños con gradiente lineal */} <circle cx="40" cy="30" r="10" fill="url(#redGradient)" /> <circle cx="70" cy="30" r="10" fill="url(#yellowGradient)" /> <circle cx="70" cy="60" r="10" fill="url(#greenGradient)" /> </svg>
              </div>
              <div className='brand'>Sensitivv</div>
          </div>
          <div className='searchContainer'>
            <div className='searchShaper'>
              <div className='searchStyle'>
                <div className='searchIcon'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <ProductSearchBox />
                <div className='spaceSearchBox'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='profile'>
          <div className='imageContainer'>
            <button className='settingButtonprofile' onClick={handleProfileClick} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <img className="imgStyle" src="https://i.pinimg.com/564x/1c/43/4d/1c434d1640f9572e2ac7be5c6bac9348.jpg" alt="profile" />
          </div>
        </div>
      </div>

      {isPopupOpen && <ProfilePopup closePopup={closePopup} />}
    </div>
  );
};

export default Header;
