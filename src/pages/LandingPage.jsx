import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useScroll } from '@react-spring/web';
import HeaderTwo from '../components/HeaderTwo';
import './LandingPage.css';

const HomeProducts = () => {
  const { scrollYProgress } = useScroll();

  // Animación de opacidad para el texto principal
  const fadeStyle = useSpring({
    opacity: scrollYProgress.to([0, 0.5], [1, 0]),
  });

  // Animación de visibilidad para "Some static text next to the fading one"
  const isVisible = scrollYProgress.to((val) => (val < 0.66 ? 1 : 0));

  return (
    <div className='innnninnnkk' >
      <HeaderTwo />

<div
  style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  }}
>
  {/* Contenedor para ambos textos */}
  <div
    style={{
      position: 'relative', // Permite el posicionamiento absoluto de los hijos
      width: '100%', // Asegura que el contenedor ocupe el espacio necesario
      height: '100%',
      
    }}
  >
    {/* Texto principal */}
    <animated.div
  style={{
    ...fadeStyle,
    zIndex: 10, // Prioridad más alta para que esté por encima de los otros elementos 
    fontFamily: 'Helvetica',
    fontSize: '40px',
    position: 'absolute', // Posiciona el texto en el mismo espacio que el otro
    top: 0,

    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding:"30px", 
    textAlign: 'justify',
  }}
>
  <p>


  <span style={{ fontWeight: 'bold' , backgroundColor: "white"}}>Ingredients:  </span><span style={{  backgroundColor: "white"}}>Enriched Corn Meal (Corn Meal, Ferrous Sulfate, Niacin, Thiamin, Riboflavin, Folic Acid), Vegetable Oil (Corn, Canola, and/or Sunflower Oil), Cheese Seasoning (Whey, Cheddar Cheese [Milk,  It doesn't, Salt, Enzymes], Canola Oil, Maltodextrin [Made from Corn Oil s], Natural and Artificial Flavors, Whey Protein , Monosodium Glutamate, have to be, Citric Acid, Artificial Color [Yellow 6]), Sugar, Dextrose, High Fructose Corn Syrup, Partially Hydrogenated Soybean Oil, Modified Food Starch, Artificial Butter Flavor, Artificial Caramel Color,  so difficult, Artificial Sweeteners (Aspartame, Sucralose, Acesulfame Potassium), Soy Lecithin, Palm Kernel Oil, Sodium Caseinate, Sodium Phosphate, Disodium Inosinate, Disodium Guanylate, Sensitivv App: Make your diet easier , Barley Malt Extract, Potassium Chloride, Calcium Carbonate, Xanthan Gum, Guar Gum, Cellulose Gum, Natural Flavors, Artificial Flavors, Gelatin, Corn Syrup Solids, Salt.  </span>



  
  </p>
</animated.div>


    {/* Texto secundario */}

        
        <animated.div
        style={{
          opacity: isVisible,
          display: isVisible.to((value) => (value === 0 ? 'none' : 'block')),
          zIndex: 2,
          fontFamily: 'Helvetica',
          fontSize: '40px',
          position: 'absolute', // También está sobrepuesto
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          marginTop: '-370px',
          justifyContent: 'center',
          alignItems: 'center',
          padding:"30px", 
          textAlign: 'justify',
          transition: 'opacity 0.5s ease-in-out', // Smooth transition

        }}
      >

        <p>
  <span style={{ fontWeight: 'bold' , color: '#FFFFFF' }}>Ingredients:</span>
<span style={{ color: '#FFFFFF' }}>
  Enriched Corn Meal (Corn Meal, Ferrous Sulfate, Niacin, Thiamin, Riboflavin, Folic Acid), Vegetable Oil (Corn, Canola, and/or Sunflower Oil), Cheese Seasoning (Whey, Cheddar Cheese [Milk,
</span>
<span style={{ color: '#000000' }}>It doesn't</span>
<span style={{ color: '#FFFFFF' }}>, Salt, Enzymes], Canola Oil, Maltodextrin [Made from Corn Oil s], Natural and Artificial Flavors, Whey Protein, Monosodium Glutamate,</span>
<span style={{ color: '#000000' }}>have to be</span>
<span style={{ color: '#FFFFFF' }}>, Citric Acid, Artificial Color [Yellow 6]), Sugar, Dextrose, High Fructose Corn Syrup, Partially Hydrogenated Soybean Oil, Modified Food Starch, Artificial Butter Flavor, Artificial Caramel Color,</span>
<span style={{ color: '#000000' }}>so difficult</span>
<span style={{ color: '#FFFFFF' }}>, Artificial Sweeteners (Aspartame, Sucralose, Acesulfame Potassium), Soy Lecithin, Palm Kernel Oil, Sodium Caseinate, Sodium Phosphate, Disodium Inosinate, Disodium Guanylate,</span>
<span style={{ color: '#000000' }}>Sensitivv App: Make your diet easier</span>
<span style={{ color: '#FFFFFF' }}>, Barley Malt Extract, Potassium Chlori.</span>
 
 
  </p>
    </animated.div>
  </div>  
</div>


      <div style={{ height: '100vh', backgroundColor: '#FFFFFF' }} />
      <div style={{ height: '100vh', backgroundColor: '#FFFFFF' }} />
      <div style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.5rem' }}>
        </p>
        <div className="aosdifasdifjasdl"></div>
        <div className="aosdifasdifjasdl2">
            <div className='blockoimko1'>
                first cell

            </div>

        </div>
      </div>
      <div className="aosdifasdifjasdl3">
  <p>© 2024 - Sensitivv. Todos los derechos reservados.</p>
  <ul className="footer-links">
    <li>Acerca de</li>
    <li>Privacidad</li>
    <li>Contacto</li>
    <li>Soporte</li>

  </ul>
</div>

    </div>
  );
};

export default HomeProducts;
