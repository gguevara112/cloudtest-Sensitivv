import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import axios from 'axios';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import './ProductSearch.css';

const ProductSearch = () => {
  const navigate = useNavigate();
  const { searchResults, searchTerm } = useProductContext();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    localStorage.removeItem('selectedProductId');
  }, []);

  const handleProductClick = async (id, source) => {
    try {
      // Guardar en la tabla history antes de redirigir
      if (source === 'off') {
        await axios.post(`http://localhost:5001/api/history`, {
          userID: userId,
          itemID: id,
          dateAccessed: new Date(),
        });
      }

      // Guardar el nuevo productId en localStorage
      localStorage.setItem('selectedProductId', id);

      // Redirigir según el origen del producto
      navigate(source === 'off' ? '/product' : '/product');
    } catch (error) {
      console.error('Error al guardar en el historial:', error);
    }
  };

  return (
    <div className="basicContainer">
      <Header />
      <div className="pageSplit">
        <SidebarTwo />
        <div className="containerResults">
          <div className="search-header3e">
            Resultados de búsqueda para: "<span>{searchTerm}</span>"
          </div>

          {/* Resultados de tu base de datos */}
          <div className="plainProductsSection">

            <div className="row row-cols-auto">
              {searchResults
                .filter((result) => result.source === 'plain')
                .map((result) => (
                  <div className="col" key={result._id}>
                    <button
                      className="containerProduct2"
                      onClick={() => handleProductClick(result._id, result.source)}
                    >
                      <div className="plainProductName">{result.name}</div>
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <br /> {/* Separador visual */}

          {/* Resultados de OpenFoodFacts */}
          <div className="offProductsSection">
  <div className="row row-cols-auto">
    {searchResults
      .filter((result) => result.source === 'off' && result.image_url) // Filtrar productos de "off" con imagen
      .map((result) => (
        <div className="col" key={result.code}>
          <button
            className="containerProduct"
            onClick={() => handleProductClick(result.code, result.source)}
          >
            <div className="imgProduct">
              <img src={result.image_url} alt={result.product_name} />
            </div>
            <div className="nameProduct">{result.product_name}</div>
          </button>
        </div>
      ))}
  </div>
</div>





        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
