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
          <div className="back-iconfortext">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          </div>
          Back
        </button>
        <ProductDetailsOPF />
        <ProductDetailForUser />
      </div>
    </div>
  </div>
);

export default ProductDetail;
