// ArticleDetail.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción
import "./ArticleDetail.css";

const ArticleDetail = ({ article, onBackClick }) => {
    const { t } = useTranslation(); // Hook de traducción

    return (
        <div className='article-detail'>
            <button className='back-button' onClick={onBackClick}>
                {t('AbCdEfGhIj1l')} {/* ← Volver a la lista */}
            </button>
            <img src={article.image} alt={article.title} className='article-detail-image' />
            <h3 className='article-detail-title'>{article.title}</h3>
            <p className='article-detail-author'>{t('MnOpQrStUvWx')} {article.author}</p> {/* Por: */}
            <p className='article-detail-content'>{article.content}</p>
        </div>
    );
};

export default ArticleDetail;
