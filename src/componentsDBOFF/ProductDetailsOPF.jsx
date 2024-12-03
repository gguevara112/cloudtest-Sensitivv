import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetailsOPF = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className="product-info">
        <h2>{product.product_name}</h2>
        <p><strong>Brand:</strong> {product.brands}</p>
        <p><strong>Barcode:</strong> {product.code}</p>
        <p className="ingredients"><strong>Ingredients:</strong> {product.ingredients_text || 'No disponible'}</p>
        <p><strong>Product ID:</strong> {localStorage.getItem('selectedProductId')}</p>
      </div>
    </div>
  );
};

export default ProductDetailsOPF;
