import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../ProductContext';
import "../components/Header.css";

const ProductSearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSearchResults, setSearchTerm: setContextSearchTerm } = useProductContext();
  const { t } = useTranslation();

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      try {
        // Llamadas paralelas a OpenFoodFacts y a la base de datos
        const [chileResponse, usaResponse, plainProductsResponse] = await Promise.all([
          axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1&tagtype_0=countries&tag_contains_0=contains&tag_0=Chile`),
          axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1&tagtype_0=countries&tag_contains_0=contains&tag_0=United States`),
          axios.get(`http://localhost:5001/api/plainproducts?search=${searchTerm}`),
        ]);
  
        // Combinar los resultados, priorizando los de la base de datos
        const combinedResults = [
          ...plainProductsResponse.data.map((p) => ({ ...p, source: 'plain' })), // Fuente: Base de datos
          ...chileResponse.data.products.map((p) => ({ ...p, source: 'off' })), // Fuente: OpenFoodFacts
          ...usaResponse.data.products.map((p) => ({ ...p, source: 'off' })),
        ].slice(0, 20);
  
        setContextSearchTerm(searchTerm);
        setSearchResults(combinedResults);
        navigate('/productsearch');
      } catch (error) {
        console.error('Error al buscar productos:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder={t('AbCdEfGhIjKl')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleSearch}
        className="searchBar"
        disabled={loading}
      />
      {loading && <div className="spinner"></div>}
    </div>
  );
};

export default ProductSearchBox;
