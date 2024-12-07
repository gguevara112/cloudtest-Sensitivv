import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useScroll } from '@react-spring/web';
import Header from '../components/HeaderTwo';
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
    <div style={{ position: 'relative', height: '300vh', scrollbarWidth: 'none' }}>
      <Header />

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <animated.div
          style={{
            ...fadeStyle,
            fontSize: '3rem',
            color: 'white',
          }}
        >
          Welcome to the Parallax World
        </animated.div>

        {/* Texto dinámico con visibilidad basada en scroll */}
        <animated.div
          style={{
            opacity: isVisible,
            display: isVisible.to((value) => (value === 0 ? 'none' : 'block')),
            color: 'white',
            fontSize: '1.5rem',
            marginTop: '20px',
          }}
        >
          Some static text next to the fading one
        </animated.div>
      </div>

      <div style={{ height: '100vh', backgroundColor: '#1E90FF' }} />
      <div style={{ height: '100vh', backgroundColor: '#FFD700' }} />
      <div style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.5rem' }}>
          Some text below 920px
        </p>
        <div className="aosdifasdifjasdl">sdf</div>
      </div>
    </div>
  );
};

export default HomeProducts;
