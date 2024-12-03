import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WidgetGridTest.css';

const WidgetGridTest = () => {
  const [product, setProduct] = useState({
    name: 'Producto Estático',
    imgSrc: 'https://via.placeholder.com/100',
    lastTested: null,
    DaysTestSelected: 0,
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/testmade/${userId}`);
        const tests = response.data;

        if (tests.length > 0) {
          const lastTest = tests[0]; // Suponiendo que el primer elemento es el último test realizado
          const productResponse = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${lastTest.itemID}.json`);
          const productData = productResponse.data.product;

          setProduct({
            name: productData ? productData.product_name : "Nombre no disponible",
            imgSrc: productData ? productData.image_url : "https://via.placeholder.com/100",
            lastTested: lastTest.dateCreated,
            DaysTestSelected: lastTest.DaysTestSelected,
          });
        }
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      }
    };

    fetchProductDetails();
  }, [userId]);

  const calculateRemainingTime = () => {
    if (!product.lastTested || !product.DaysTestSelected) return 'Tiempo no disponible';

    const lastTestDate = new Date(product.lastTested);
    const endTime = new Date(lastTestDate.getTime() + product.DaysTestSelected * 24 * 60 * 60 * 1000);
    const now = new Date();
    const remainingTime = endTime - now;

    if (remainingTime <= 0) return 'Tiempo expirado';

    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

    return `${days > 0 ? `${days} día${days > 1 ? 's' : ''} ` : ''}${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min`;
  };

  const buttonLabels = [
    { text: 'Critic', color: '#ed0000ff' },
    { text: 'Sensitive', color: '#ffdb22ff' },
    { text: 'Safe', color: '#80d425ff' },
  ];

  return (
    <div className="buttonContainer2">
      <div className="testTrakerButton2">
        <div className="containerProduct2">
          <div className="imgProduct2">
            <img src={product.imgSrc} alt={product.name} />
          </div>
          <div className="nameProduct2">
            {product.name}
          </div>
        </div>
        <div className="timeleftfortest">
          <div className="timeleftfortestNumber">
            {calculateRemainingTime()}
          </div>
          <div className="timeleftfortestText">
            Tiempo restante de la prueba
          </div>
        </div>
      </div>

      <div className="right-buttons">
        <div className="selection-buttons-rect">
          {buttonLabels.map((button, index) => (
            <button
              key={index}
              style={{
                backgroundColor: button.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 20px',
              }}
              className="color-button"
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetGridTest;
