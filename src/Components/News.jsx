import React, { useEffect, useState } from 'react';
import techImg from '../assets/images/tech.jpg';
import worldImg from '../assets/images/world.jpg';
import sportImg from '../assets/images/sports.jpg';
import scienceImg from '../assets/images/science.jpg';
import haelthImg from '../assets/images/health.jpg';
import entertainmentImg from '../assets/images/entertainment.jpg';
import nationImg from '../assets/images/nation.jpg';
import noImg from '../assets/images/no-img.png';
import './News.css';
import axios from 'axios';
import NewsModel from './NewsModel';

const categories = [
  'general',
  'world',
  'business',
  'technology',
  'entertainment',
  'sport',
  'science',
  'health',
  'nation',
];

const News = () => {
  const [headline, setHeadline] = React.useState(null);
  const [news, setNews] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('general');
  const [showModel, setShowModel] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=dff59b25cb818165f77363642b76fbe6`;

      const response = await axios.get(url);

      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      console.log(news);
    };

    fetchNews();
  }, [selectedCategory]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModel(true);

    console.log(article);
  };

  return (
    <div className='news-app'>
      <div className='news-header'>
        <h1 className='logo'>News App</h1>
      </div>
      <div className='news-content'>
        <nav className='navbar'>
          <h1 className='nav-heading'>Categories</h1>
          <div className='categories'>
            {categories.map((category) => (
              <a
                href='#'
                className='nav-link'
                key={category}
                onClick={(e) => handleCategoryClick(e, category)}
              >
                {category}
              </a>
            ))}
          </div>
        </nav>
        <div className='news-section'>
          {headline && (
            <div
              className='headline'
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.image || noImg} alt=' Headline-title' />
              <h2 className='headline-title'>{headline.title}</h2>
            </div>
          )}

          <div className='news-grid'>
            {news.map((article, index) => (
              <div
                className='news-grid-item'
                key={index}
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image || noImg} alt={article.title} />
                <h3>{article.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModel
          show={showModel}
          article={selectedArticle}
          onClose={() => setShowModel(false)}
        />
      </div>
      <footer>
        <p className='copyright'>
          <span>News App</span>
        </p>
        <p> &copy; All Rights Reserved. By Code And Create.</p>
      </footer>
    </div>
  );
};

export default News;
