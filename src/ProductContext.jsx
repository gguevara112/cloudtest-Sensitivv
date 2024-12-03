import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <ProductContext.Provider value={{
      selectedProductId, setSelectedProductId,
      searchTerm, setSearchTerm,
      searchResults, setSearchResults
    }}>
      {children}
    </ProductContext.Provider>
  );
};
