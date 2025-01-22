import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import './News.css';

const mockMarketData = [
    { commodity: 'Gold', price: '$1,800', change: '+0.5%', isPositive: true },
    { commodity: 'Silver', price: '$25', change: '+1.2%', isPositive: true },
    { commodity: 'Crude Oil', price: '$75', change: '-0.3%', isPositive: false },
    // Add more mock data as needed
];

const mockNews = [
    { 
        headline: 'Market rallies on positive economic data',
        date: '2024-08-09',
        summary: 'Global markets showed strong performance today as new economic data exceeded expectations, particularly in manufacturing and services sectors.',
        category: 'Markets'
    },
    { 
        headline: 'Gold prices surge amid global uncertainties',
        date: '2024-08-08',
        summary: 'Safe-haven assets continue to attract investors as geopolitical tensions and inflation concerns drive market sentiment.',
        category: 'Commodities'
    },
    { 
        headline: 'Tech stocks rebound after recent slump',
        date: '2024-08-07',
        summary: 'Technology sector shows signs of recovery as investor confidence returns following positive earnings reports from major companies.',
        category: 'Stocks'
    },
    // Add more mock news as needed
];

const News = () => {
    return (
        <div className="news-page">
            <div className="news-hero">
                <div className="news-hero-content">
                    <TrendingUp className="hero-icon" size={48} />
                    <h1>Market Insights</h1>
                    <p className="hero-subtitle">Stay informed with the latest market updates and analysis</p>
                </div>
            </div>

            <div className="news-container">
                <div className="section-header">
                    <h2>Market <span className="highlight">Overview</span></h2>
                    <p className="section-description">Real-time market data and performance metrics</p>
                </div>

                <div className="market-grid">
                    {mockMarketData.map((data, index) => (
                        <div key={index} className="market-card">
                            <div className="market-card-content">
                                <div className="market-card-header">
                                    <h3>{data.commodity}</h3>
                                    {data.isPositive ? 
                                        <ArrowUpRight className="trend-icon positive" /> : 
                                        <ArrowDownRight className="trend-icon negative" />
                                    }
                                </div>
                                <div className="market-card-details">
                                    <span className="price">{data.price}</span>
                                    <span className={`change ${data.isPositive ? 'positive' : 'negative'}`}>
                                        {data.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-header">
                    <h2>Latest <span className="highlight">Updates</span></h2>
                    <p className="section-description">Breaking news and market analysis</p>
                </div>

                <div className="news-grid">
                    {mockNews.map((news, index) => (
                        <div key={index} className="news-card">
                            <div className="news-card-content">
                                <div className="news-category">{news.category}</div>
                                <h3 className="news-headline">{news.headline}</h3>
                                <p className="news-summary">{news.summary}</p>
                                <div className="news-footer">
                                    <div className="news-date">
                                        <Calendar size={16} />
                                        <span>{news.date}</span>
                                    </div>
                                    <button className="read-more">
                                        Read More
                                        <span className="arrow">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;