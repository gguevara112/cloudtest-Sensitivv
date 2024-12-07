import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useScroll } from '@react-spring/web';

const HomeProducts = () => {
  const { scrollYProgress } = useScroll();
  const fadeStyle = useSpring({
    opacity: scrollYProgress.to([0, 0.5], [1, 0]),
  });

  return (
    <div style={{ position: 'relative', height: '300vh' }}>
      <p style={{ textAlign: 'center', margin: '20px' }}>Some text above</p>

      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <animated.div
          style={{
            ...fadeStyle,
            fontSize: '3rem',
            color: 'white',
          }}
        >
          Welcome to the Parallax World
        </animated.div>
        <div style={{ marginTop: '20px', color: 'white', fontSize: '1.5rem' }}>
          Some static text next to the fading one
        </div>
      </div>

      <div style={{ height: '100vh', backgroundColor: '#1E90FF' }} />
      <div style={{ height: '100vh', backgroundColor: '#FFD700' }} />
      <div style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.5rem' }}>
          Some text below
        </p>
      </div>
    </div>
  );
};

export default HomeProducts;
