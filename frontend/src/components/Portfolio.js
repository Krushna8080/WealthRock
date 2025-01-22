import React, { useContext } from 'react';
import { PortfolioContext } from './PortfolioContext';
import { Briefcase } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
  const { portfolio } = useContext(PortfolioContext);

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <div className="portfolio-hero-content">
          <div className="hero-icon">
            <Briefcase size={48} />
          </div>
          <h1>My Portfolio</h1>
          <p className="hero-subtitle">Showcasing my professional journey and achievements</p>
        </div>
      </div>

      <div className="portfolio-container">
        <div className="portfolio-grid">
          {portfolio.map((item, index) => (
            <div key={index} className="portfolio-card">
              <div className="card-content">
                <div className="card-indicator"></div>
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;