import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción
import axios from 'axios';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import './ProductSearch.css';

const ProductSearch = () => {
  const navigate = useNavigate();
  const { searchResults, setSearchResults, setSearchTerm } = useProductContext();
  const { t } = useTranslation(); // Hook de traducción
  const userId = localStorage.getItem('userId');
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = localStorage.getItem('searchTerm');
    setLocalSearchTerm(term);
    setSearchTerm(term);

    const fetchData = async () => {
      setLoading(true); // Iniciar el estado de carga
      try {
        const [chileResponse, usaResponse, plainProductsResponse] = await Promise.all([
          axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${term}&search_simple=1&action=process&json=1&tagtype_0=countries&tag_contains_0=contains&tag_0=Chile`),
          axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${term}&search_simple=1&action=process&json=1&tagtype_0=countries&tag_contains_0=contains&tag_0=United States`),
          axios.get(`http://localhost:5001/api/plainproducts?search=${term}`),
        ]);

        const combinedResults = [
          ...plainProductsResponse.data.map((p) => ({ ...p, source: 'plain' })),
          ...chileResponse.data.products.map((p) => ({ ...p, source: 'off' })),
          ...usaResponse.data.products.map((p) => ({ ...p, source: 'off' })),
        ].slice(0, 20);

        setSearchResults(combinedResults);
      } catch (error) {
        console.error('Error al buscar productos:', error);
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    if (term) {
      fetchData();
    }

    localStorage.removeItem('selectedProductId');
  }, [setSearchResults, setSearchTerm]);

  const handleProductClick = async (id, source) => {
    try {
      if (source === 'off') {
        await axios.post(`http://localhost:5001/api/history`, {
          userID: userId,
          itemID: id,
          dateAccessed: new Date(),
        });
      }
      localStorage.setItem('selectedProductId', id);
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
          {loading ? (
            <div className="spinneru"></div> // Indicador de carga
          ) : (
            <>
              <div className="search-header3e">
                {t('ZxCvBnMqWeRt2')} "<span>{localSearchTerm}</span>"
              </div>

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

              <br />

              <div className="offProductsSection">
                <div className="row row-cols-auto">
                  {searchResults
                    .filter((result) => result.source === 'off' && result.image_url)
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;

