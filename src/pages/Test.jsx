import React, { useState } from 'react';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import TestContainer from '../components/TestComponents/TestContainer';
import './basic.css';

const Test = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Estado para la visibilidad del Sidebar

  const toggleSidebar = (isVisible) => {
    setIsSidebarVisible(isVisible);
  };

  return (
    <div className='basicContainer'>
      <Header toggleSidebar={toggleSidebar} /> 
      <div className='pageSplit'>
        {isSidebarVisible && <SidebarTwo />} {/* Muestra u oculta SidebarTwo */}
        <TestContainer />
      </div>
    </div>
  );
};

export default Test;
