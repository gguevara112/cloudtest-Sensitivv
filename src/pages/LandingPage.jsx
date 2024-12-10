import React, { useState, useEffect } from 'react';
import HeaderTwo from '../components/HeaderTwo';
import './LandingPage.css';

// Componente Banner
function Banner() {
  const backgroundImageUrl = "https://www.shutterstock.com/image-vector/beautiful-clouds-abstract-white-blue-600nw-2477952373.jpg"; // URL de la imagen
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Pequeño retraso antes de que aparezca
  }, []);

  return (
    <div
      className={`banner ${isVisible ? 'banner-visible' : ''}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="banner3-text">
        <svg className='iiikkkikiknnkk'  width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="white" stroke="black" strokeWidth="0" />
          <circle cx="40" cy="30" r="10" fill="#ed0000ff" />
          <circle cx="70" cy="30" r="10" fill="#ffdb22ff" />
          <circle cx="70" cy="60" r="10" fill="#80d425ff" />
        </svg>
        <br />
        Sensitivv
        <br />
      <div className='lsdflklksjfd'> App for tracking, testing, and organizing your food sensitivities</div>
      </div>
    </div>
  );
}

const HomeProducts = () => {
  return (
    <div className="landing-page">
      <HeaderTwo />
      <div className="content222">
        <Banner />
        <div className="blockoimko1">
          <h2 className="title">Recognize</h2>
          <p className="body">
            Know what you are eating and how it affects you. Sensitivv helps
            you identify the ingredients in your food and their impact on your
            health, so you can make better decisions.
          </p>
          <div className="image-containedr">
            <img src="src/pages/asSgbhFWRR.png" alt="Recognize section" />
          </div>
        </div>

        <div className="blockoimko1">
          <h2 className="title">Test</h2>
          <p className="body">
            Keep track of the ingredients you consume and how they make you
            feel. Sensitivv helps you organize your diet and understand how it
            affects your body.
          </p>
          <div className="image-container">
            <img src="src/pages/tttgrrtggert.png" alt="Test section" />
          </div>
        </div>

        <div className="blockoimko1">
          <h2 className="title">Organize</h2>
          <p className="body">
            Add reactions to your food and organize your diet according to
            your needs. Sensitivv helps you manage your diet and keep track of
            the ingredients you consume, and show it effortlessly.
          </p>
          <div className="image-container">
            <img src="src/pages/dddwfsdfdsrrrvsvvrv.png" alt="Organize section" />
          </div>
        </div>
      </div>
      <footer className="footerd">
        <p>© 2024 - Sensitivv. Todos los derechos reservados.</p>
        <ul className="footer-linddks">
          <li>Acerca de</li>
          <li>Privacidad</li>
          <li>Contacto</li>
          <li>Soporte</li>
        </ul>
      </footer>
    </div>
  );
};

export default HomeProducts;
