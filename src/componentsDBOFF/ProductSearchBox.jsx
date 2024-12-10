import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../components/Header.css";

const ProductSearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleSearchUpdate = () => {
      const term = localStorage.getItem('searchTerm');
      if (term) {
        // Aquí puedes actualizar los resultados basados en el nuevo término
        fetchResults(term);
      }
    };
  
    window.addEventListener('searchTermUpdated', handleSearchUpdate);
  
    return () => {
      window.removeEventListener('searchTermUpdated', handleSearchUpdate);
    };
  }, []);
  

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      try {
        // Guardar el término de búsqueda en localStorage
        localStorage.setItem('searchTerm', searchTerm);
  
        // Notificar un evento personalizado para actualizar la búsqueda
        window.dispatchEvent(new Event('searchTermUpdated'));
  
        // Redirigir si estás en otra página
        if (window.location.pathname !== '/productsearch') {
          navigate('/productsearch');
        }
      } catch (error) {
        console.error('Error al manejar la búsqueda:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder={t('AbCdEfGhIjKl')} // Traducir el texto del placeholder
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
