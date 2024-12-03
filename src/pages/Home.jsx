import React, { useState } from 'react';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import HomeContainer from '../components/HomeComponents/HomeContainer';
import "./basic.css";

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Estado para la visibilidad del Sidebar

  const toggleSidebar = (isVisible) => {
    setIsSidebarVisible(isVisible);
  };

  return (
    <div className='basicContainer'>
      <Header toggleSidebar={toggleSidebar} /> 
      <div className='pageSplit'>
        {isSidebarVisible && <SidebarTwo />} {/* Muestra u oculta SidebarTwo */}
        <HomeContainer />
      </div>
    </div>
  );
};

export default Home;
