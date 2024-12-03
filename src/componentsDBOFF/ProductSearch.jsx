// ProductSearch.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import axios from 'axios';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import './ProductSearch.css';

const ProductSearch = () => {
  const navigate = useNavigate();
  const { searchResults, searchTerm } = useProductContext(); // Obtener el término de búsqueda
  const userId = localStorage.getItem('userId'); // Obtener el ID del usuario de localStorage

  useEffect(() => {
    // Limpiar cualquier productId anterior al cargar el componente
    localStorage.removeItem('selectedProductId');
  }, []);

  const handleProductClick = async (id) => {
    try {
      // Guardar en la tabla history antes de redirigir
      await axios.post(`http://localhost:5001/api/history`, {
        userID: userId,
        itemID: id,
        dateAccessed: new Date(),
      });

      // Guardar el nuevo productId en localStorage
      localStorage.setItem('selectedProductId', id);

      navigate('/product');
    } catch (error) {
      console.error("Error al guardar en el historial:", error);
    }
  };

  return (
    <div className="basicContainer">
      <Header />
      <div className="pageSplit">
        <SidebarTwo />

        <div className='containerResults'>
          {/* Agregar el encabezado de resultados de búsqueda */}
          <div className="search-header3e">
            Resultados de búsqueda para: "<span>{searchTerm}</span>"
          </div>
          
          <div className="products-list text-center">
            <div className="row row-cols-auto">
              {searchResults
                .filter((product) => product.image_url) // Filtrar productos con imagen
                .map((product) => (
                  <div className="col" key={product.code}>
                    <button className="containerProduct" onClick={() => handleProductClick(product.code)} >
                      <div className="imgProduct">
                        <img src={product.image_url} alt={product.product_name} />
                      </div>
                      <div className="nameProduct">
                        {product.product_name}
                      </div>
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
