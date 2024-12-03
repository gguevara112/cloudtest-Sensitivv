import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';    

const Products = () => {
    const navigate = useNavigate();

    const productList = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
        { id: 4, name: 'Product 4' },
        { id: 5, name: 'Product 5' },
    ];

    const handleProductClick = () => {
        // Siempre navega a la misma ruta para mostrar el producto predeterminado
        navigate('/productshower');
    };

    return (
        <div className="container text-center">
          <div className="row row-cols-auto">
            {productList.map(product => (
              <div className="col" key={product.id}>
                <button 
                  className="containerProduct" 
                  onClick={handleProductClick} // Siempre llama a la misma función sin pasar ID
                >
                    <div className='imgProduct'>
                        <img src='https://images.openfoodfacts.org/images/products/000/002/072/4696/front_es.303.400.jpg' alt='product' />
                    </div>
                    <div className='nameProduct'>
                     {product.name}
                    </div>
                </button>
              </div>
            ))}
          </div>
        </div>
    );
};

export default Products;
