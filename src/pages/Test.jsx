import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import TestContainer from '../components/TestComponents/TestContainer';
import './basic.css';

const Test = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Estado para la visibilidad del Sidebar
  const navigate = useNavigate(); // Hook para redirigir
  const userId = localStorage.getItem('userId'); // Obtén el userId del localStorage

  useEffect(() => {
    // Si no hay userId, redirige a /login
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]); // Ejecuta el efecto si cambia userId o navigate

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
