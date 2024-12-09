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
        <h2>User ID: {userId}</h2>
        <p>
  <strong>Email ({userEmail.length}):</strong>{' '}
  {userEmail.length > 0 
    ? userEmail.map((email, index) => (
        <span key={index}>
          {email}{index < userEmail.length - 1 && ', '}
        </span>
      ))
    : 'No email found'}
</p>
<p>
  <strong>Email ({userEmail2.length}):</strong>{' '}
  {userEmail2.length > 0 
    ? userEmail2.map((email, index) => (
        <span key={index}>
          {email}{index < userEmail2.length - 1 && ', '}
        </span>
      ))
    : 'No email found'}
</p>


        <p>
          <strong>Brand:</strong> {product.brands}
        </p>
        <p>
          <strong>Barcode:</strong> {product.code}
        </p>
        <p className="ingredients">
          <strong>Ingredients:</strong> {product.ingredients_text || "No ingredients available"}
        </p>

        {/* Ingredientes parseados */}
        <div className="parsed-ingredients">
          <h3>Parsed Ingredients</h3>
          <p>{parsedIngredients || 'No parsed ingredients available.'}</p>
        </div>

        {/* Coincidencias de sensibilidad */}
        <div className="sensitivity-matches">
          <h3>Sensitivity Matches</h3>
          <pre>{sensitivityMatches || 'No sensitivity matches found.'}</pre>
        </div>

        {/* Ítems del usuario */}
        <div className="user-items">
          <h3>User Items</h3>
          <ul>
            {userItems.length > 0 ? (
              (() => {
                const itemList = [];
                for (let i = 0; i < Math.min(2, userItems.length); i++) {
                  const item = userItems[i];
                  itemList.push(
                    <li key={item._id}>
                      <strong>{item.itemID}</strong> - Category: {item.category}
                    </li>
                  );
                }
                return itemList;
              })()
            ) : (
              <p>No user items found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsOPF;
