import React from 'react';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import ProductDetailsOPF from './ProductDetailsOPF';
import ProductDetailForUser from './ProductDetailForUser';
import './ProductDetail.css';

const ProductDetail = () => (
  <div className="basicContainer">
    <Header />
    <div className="pageSplit">
      <SidebarTwo />
      <div className="product-detail-container">
        <button className="back-button" onClick={() => window.history.back()}>
          &#8592; Back
        </button>
        <ProductDetailsOPF />
        <ProductDetailForUser />
      </div>
    </div>
  </div>
);

export default ProductDetail;
