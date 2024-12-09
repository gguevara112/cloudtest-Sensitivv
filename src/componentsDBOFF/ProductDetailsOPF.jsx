import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetailsOPF = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [parsedIngredients, setParsedIngredients] = useState('');
  const [sensitivityMatches, setSensitivityMatches] = useState('');
  const [userItems, setUserItems] = useState([]); // Estado para los ítems del usuario
  const [userEmail, setUserEmail] = useState([]);
  const [userEmail2, setUserEmail2] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const selectedProductId = localStorage.getItem('selectedProductId');

    const fetchUserEmail = async () => {
      try {
        if (!userId) {
          console.error("UserId not found in localStorage.");
          return;
        }
    
        // Obtener información del usuario (lista de documentos)
        const response = await axios.get(`http://localhost:5001/api/users2/${userId}`);
        
        if (response.data.length > 0) {
          const itemIDs = response.data.map(doc => doc.itemID); // Extraer todos los itemID
          setUserEmail(itemIDs); // Guardar la lista en el estado
        } else {
          console.error("No documents found for the user.");
          setUserEmail([]); // Asegúrate de manejar el caso sin resultados
        }
      } catch (error) {
        console.error("Error al obtener el correo del usuario:", error);
        setUserEmail([]); // Manejo de errores
      }
    };

    const fetchUserEmail2 = async () => {
      try {
        if (!userId) {
          console.error("UserId not found in localStorage.");
          return;
        }
    
        // Obtener información del usuario (lista de documentos)
        const response = await axios.get(`http://localhost:5001/api/users2/${userId}`);
        
        if (response.data.length > 0) {
          const itemIDs2 = response.data.map(doc => doc.category); // Extraer todos los itemID
          setUserEmail2(itemIDs2); // Guardar la lista en el estado
        } else {
          console.error("No documents found for the user.");
          setUserEmail2([]); // Asegúrate de manejar el caso sin resultados
        }
      } catch (error) {
        console.error("Error al obtener el correo del usuario:", error);
        setUserEmail2([]); // Manejo de errores
      }
    };
    
    

    const fetchUserItems = async () => {
      try {
        if (!userId) {
          console.error("UserId not found in localStorage.");
          return;
        }

        // Obtener los primeros 2 ítems del usuario
        const response = await axios.get(`/api/productIngredients/${userId}`);
        setUserItems(response.data.slice(0, 2)); // Guardar los primeros 2 ítems
      } catch (error) {
        console.error("Error al obtener los ítems del usuario:", error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        if (!userId) {
          console.error("UserId not found in localStorage.");
          setLoading(false);
          return;
        }

        // Obtener detalles del producto
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${selectedProductId}.json`
        );

        if (response.data && response.data.product) {
          setProduct(response.data.product);

          // Parsear y normalizar los ingredientes
          const ingredients = response.data.product.ingredients_text
            ? response.data.product.ingredients_text
                .split(',')
                .map((ingredient) => ingredient.toLowerCase().trim())
            : [];
          setParsedIngredients(ingredients.join(', '));

          // Obtener coincidencias de sensibilidad
          const matches = await Promise.all(
            ingredients.map(async (ingredient) => {
              try {
                const matchResponse = await axios.get(
                  `/api/productIngredients/${userId}/${encodeURIComponent(ingredient)}`
                );
                return `${ingredient}: Category: ${matchResponse.data.category || 'No match'}`;
              } catch (error) {
                return `${ingredient}: No match`;
              }
            })
          );
          setSensitivityMatches(matches.join('\n'));
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product or user ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    // Llamadas para obtener datos del usuario, sus ítems y detalles del producto
    fetchUserEmail();
    fetchUserEmail2();
    fetchUserItems();
    if (selectedProductId) {
      fetchProductDetails();
    }
  }, [userId]);

  if (loading) {
    return <div className="spinnert"></div>;
  }

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className="product-info">
      <h2>{product.product_name}</h2>
        <p>
          <strong>Barcode:</strong> {product.code}
        </p>
{/* Coincidencias entre ingredientes y userEmail */}

  <p>
  <strong>Ingredients:</strong> {parsedIngredients.split(', ').map((ingredient, index, array) => {
      // Normalizar el ingrediente actual
      const normalizedIngredient = ingredient.toLowerCase().trim();

      // Buscar coincidencias en userEmail y obtener el índice
      const matchingIndex = userEmail.findIndex(
        (emailItem) => emailItem.toLowerCase().trim() === normalizedIngredient
      );

      // Obtener la categoría si hay coincidencia
      const category = matchingIndex !== -1 ? userEmail2[matchingIndex] : null;

      // Determinar el color según la categoría
      let color;
      switch (category) {
        case "Reactive":
          color = "#e00000";
          break;
        case "Sensitive":
          color = "#ecc900";
          break;
        case "Safe":
          color = "#88d82c";
          break;
        default:
          color = "black"; // Sin coincidencia
      }

      return (
        <span key={index} style={{ color }}>
          {ingredient}
          {index < array.length - 1 && ', '}
        </span>
      );
    })}
  </p>




        <p>
          <strong>Brand:</strong> {product.brands}
        </p>



      </div>
    </div>
  );
};

export default ProductDetailsOPF;
