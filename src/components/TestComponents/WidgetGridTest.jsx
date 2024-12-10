import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WidgetGridTest.css';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción

const WidgetGridTest = () => {
  const { t } = useTranslation(); // Hook de traducción
  const [product, setProduct] = useState({
    name: '---',
    imgSrc: 'https://via.placeholder.com/100',
    lastTested: null,
    DaysTestSelected: 0,
  });
  const [selectedButton, setSelectedButton] = useState(null); // Estado para el botón seleccionado
  const userId = localStorage.getItem('userId');
  const selectedProductId = localStorage.getItem('selectedProductId');

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
            name: productData ? productData.product_name : t('MnOpQrStUvWx1'),
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
    if (!product.lastTested || !product.DaysTestSelected) return t('MnOpQrStUvWx2');

    const lastTestDate = new Date(product.lastTested);
    const endTime = new Date(lastTestDate.getTime() + product.DaysTestSelected * 24 * 60 * 60 * 1000);
    const now = new Date();
    const remainingTime = endTime - now;

    if (remainingTime <= 0) return t('MnOpQrStUvWx3');

    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

    return `${days > 0 ? `${days} ${t(days > 1 ? 'MnOpQrStUvWx8' : 'MnOpQrStUvWx9')} ` : ''}` +
      `${hours > 0 ? `${hours} ${t(hours > 1 ? 'MnOpQrStUvWx10' : 'MnOpQrStUvWx11')} ` : ''}` +
      `${minutes} ${t(minutes > 1 ? 'MnOpQrStUvWx12' : 'MnOpQrStUvWx13')}`;
  };

  const buttonLabels = [
    { text: t('MnOpQrStUvWx4'), color: '#ed0000ff', category: 'Reactive' },
    { text: t('MnOpQrStUvWx5'), color: '#ffdb22ff', category: 'Sensitive' },
    { text: t('MnOpQrStUvWx6'), color: '#80d425ff', category: 'Safe' },
  ];

  const handleButtonClick = async (buttonIndex) => {
    setSelectedButton(buttonIndex);
    const category = buttonLabels[buttonIndex].category;

    try {
      const response = await axios.post(`http://localhost:5001/api/listsensitivity`, {
        userID: userId,
        itemID: selectedProductId,
        category,
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response.data.message); // Mensaje desde el backend
      }
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  return (
    <div className="xbuttonContainer2">
      <div className="xtestTrakerButton2">
        <div className="xcontainerProduct2">
          <div className="ximgProduct2">
            <img src={product.imgSrc} alt={product.name} />
          </div>
          <div className="xnameProduct2">
            {product.name}
          </div>
        </div>
        <div className="timeleftfortest">
          <div className="timeleftfortestNumber">
            {calculateRemainingTime()}
          </div>
          <div className="xtimeleftfortestText">
            {t('MnOpQrStUvWx7')}
          </div>
        </div>
      </div>

      <div className="xright-buttons">
        <div className="selection-buttons-rect">
          {buttonLabels.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              style={{
                backgroundColor: selectedButton === index ? button.color : '#cccccc',
                color: selectedButton === index ? '#ffffff' : '#000000',
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
