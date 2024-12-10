import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../components/HeaderTwo';
import './LandingPage.css';

function Banner() {
  const { t } = useTranslation();
  const backgroundImageUrl = "https://www.shutterstock.com/image-vector/beautiful-clouds-abstract-white-blue-600nw-2477952373.jpg";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div
      className={`banner ${isVisible ? 'banner-visible' : ''}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="banner3-text">
        <svg className='iiikkkikiknnkk' width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="white" stroke="black" strokeWidth="0" />
          <circle cx="40" cy="30" r="10" fill="#ed0000ff" />
          <circle cx="70" cy="30" r="10" fill="#ffdb22ff" />
          <circle cx="70" cy="60" r="10" fill="#80d425ff" />
        </svg>
        <br />
        Sensitivv
        <br />
        <div className='lsdflklksjfd'>
          {t('TuVwXyZaBcDe18')}
        </div>
      </div>
    </div>
  );
}

const HomeProducts = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="landing-page">
      <HeaderTwo />
      <div className="content222">
        <Banner />
        <div className="blockoimko1">
          <h2 className="title">{t('TuVwXyZaBcDe3')}</h2>
          <p className="body">{t('TuVwXyZaBcDe4')}</p>
          <div className="image-container">
            <img src="src/pages/asSgbhFWRR.png" alt={t('TuVwXyZaBcDe5')} />
          </div>
        </div>

        <div className="blockoimko1">
          <h2 className="title">{t('TuVwXyZaBcDe6')}</h2>
          <p className="body">{t('TuVwXyZaBcDe7')}</p>
          <div className="image-container">
            <img src="src/pages/tttgrrtggert.png" alt={t('TuVwXyZaBcDe8')} />
          </div>
        </div>

        <div className="blockoimko1">
          <h2 className="title">{t('TuVwXyZaBcDe9')}</h2>
          <p className="body">{t('TuVwXyZaBcDe10')}</p>
          <div className="image-container">
            <img src="src/pages/dddwfsdfdsrrrvsvvrv.png" alt={t('TuVwXyZaBcDe11')} />
          </div>
        </div>
      </div>
      <footer className="footerd">
          <p>© 2024 - Sensitivv. {t('TuVwXyZaBcDe12')}</p>
          <ul className="footer-linddks">
            <li>{t('TuVwXyZaBcDe13')}</li>
            <li>{t('TuVwXyZaBcDe14')}</li>
            <li>{t('TuVwXyZaBcDe15')}</li>
            <li>{t('TuVwXyZaBcDe16')}</li>

          <div className="language-switcher">
            <select
              className="form-select form-select-sm"
              aria-label="Small select example"
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          </ul>

        </footer>

    </div>
  );
};

export default HomeProducts;
