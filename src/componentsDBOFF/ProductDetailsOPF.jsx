import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción
import './ProductDetail.css';

const ProductDetailsOPF = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); 

  useEffect(() => {
    const selectedProductId = localStorage.getItem('selectedProductId');
    if (selectedProductId) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${selectedProductId}.json`
          );
          if (response.data && response.data.product) {
            setProduct(response.data.product);
          } else {
            console.error("Producto no encontrado en Open Food Facts.");
            setProduct(null);
          }
        } catch (error) {
          console.error("Error al cargar detalles del producto:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, []);

  if (loading) {
    return <div className="spinnert"></div>; // Muestra el spinner mientras se carga
  }

  if (!product) return <p>{t('MnOpQrStUvWx15')}</p>; // Producto no encontrado

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className="product-info">
        <h2>{product.product_name}</h2>
        <p>
          <strong>{t('MnOpQrStUvWx18')}:</strong> {product.brands}
        </p>{' '}
        {/* Marca */}
        <p>
          <strong>{t('MnOpQrStUvWx19')}:</strong> {product.code}
        </p>{' '}
        {/* Código de barras */}
        <p className="ingredients">
          <strong>{t('MnOpQrStUvWx20')}:</strong> {product.ingredients_text || t('MnOpQrStUvWx21')}
        </p>{' '}
        {/* Ingredientes */}
  
        {/* ID del producto */}
      </div>
    </div>
  );
};

export default ProductDetailsOPF;
