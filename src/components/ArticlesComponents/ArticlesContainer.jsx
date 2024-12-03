// ArticlesContainer.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./ArticlesContainer.css";
import ArticleDetail from './ArticleDetail';

const ArticlesContainer = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const { t } = useTranslation(); // Hook de traducción

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/articles'); // Ajusta el endpoint si es necesario
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error("Error al obtener artículos:", error);
        }
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const handleBackClick = () => {
        setSelectedArticle(null);
    };

    return (
        <div className='articles-container'>
            <h2>{t('AbCdEfGhIjKo')}</h2> {/* Tips para Salud y Bienestar Gástrico */}
            {selectedArticle ? (
                <ArticleDetail article={selectedArticle} onBackClick={handleBackClick} />
            ) : (
                <ul className='articles-list'>
                    {articles.map((article) => (
                        <li 
                            key={article._id} 
                            className='article-item' 
                            onClick={() => handleArticleClick(article)}
                        >
                            <img src="https://via.placeholder.com/150" alt={article.title} className='article-image' />
                            <div className='article-content'>
                                <h3>{article.title}</h3>
                                <p>{article.content.substring(0, 100)}...</p>
                                <p className='article-author'>{t('MnOpQrStUvWx')} {article.author}</p> {/* Por: */}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArticlesContainer;
