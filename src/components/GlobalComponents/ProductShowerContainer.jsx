import React from 'react';
import Header from '../components/UIComponents/Header';
import Sidebar from '../components/UIComponents/Sidebar';
import ListsContainer from '../components/ListsComponents/ListsContainer';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import "../GlobalComponents"
import ProductShower from './ProductShower';


const ProductShowerContainer = () => {
  return (
    <div className='basicContainer'>
      <Header /> 
      <div className='pageSplit'>
        <SidebarTwo />
        <ProductShower />
      </div>
    </div>
  );
};

export default ProductShowerContainer;
