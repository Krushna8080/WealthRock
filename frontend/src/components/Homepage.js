import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PortfolioContext } from './PortfolioContext';
import './Homepage.css';

const mockMarketData = [
    // Commodities
    { commodity: 'Gold', price: '$1,800', change: '+0.5%', isPositive: true },
    { commodity: 'Silver', price: '$25', change: '+1.2%', isPositive: true },
    { commodity: 'Crude Oil', price: '$75', change: '-0.3%', isPositive: false },
    { commodity: 'Copper', price: '$4.10', change: '+0.8%', isPositive: true },
    
    // Stocks (Nifty)
    { commodity: 'Nifty 50', price: '18,000', change: '+0.9%', isPositive: true },
    { commodity: 'Nifty Bank', price: '41,500', change: '-0.2%', isPositive: false },

    // Currency Pairs
    { commodity: 'USD/INR', price: '75.50', change: '-0.1%', isPositive: false },
    { commodity: 'EUR/USD', price: '1.12', change: '+0.4%', isPositive: true },
    
    // Cryptocurrencies
    { commodity: 'Bitcoin', price: '$35,000', change: '+2.5%', isPositive: true },
    { commodity: 'Ethereum', price: '$2,500', change: '+3.1%', isPositive: true },
];

const sections = {
    'A': {
        'safe': ['Reliance Industries Limited (RELIANCE) - Stock', 'Tata Consultancy Services (TCS) - Stock'],
        'hedge': ['Adani Enterprises Limited (ADANIENT) - Stock', 'Bharti Airtel Limited (BHARTIARTL) - Stock'],
        'volatile': ['Adani Enterprises Limited (ADANIENT) - Stock', 'Bharti Airtel Limited (BHARTIARTL) - Stock']
    },
    'B': {
        'safe': ['Gold', 'Silver'],
        'hedge': ['Aluminum', 'Zinc'],
        'volatile': ['Cocoa', 'Cotton']
    },
    'C': {
        'safe': ['Gold', 'Silver'],
        'hedge': ['Aluminum', 'Zinc'],
        'volatile': ['Cocoa', 'Cotton']
    }
};

const getRandomAssets = (assets, count) => {
    const shuffled = [...assets].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

function Homepage() {
    const { addAssetToPortfolio } = useContext(PortfolioContext);

    const handleAddToPortfolio = (asset) => {
        addAssetToPortfolio(asset);
    };

    return (
        <div className="homepage">
            <div className="hero-section">
                <div className="hero-content">
                    <TrendingUp className="hero-icon" size={48} />
                    <h1>Market Intelligence Platform</h1>
                    <p>Real-time insights for informed trading decisions</p>
                </div>
            </div>

            <div className="container">
                <div className="section-header">
                    <h2>Market <span className="highlight">Insights</span></h2>
                    <p className="section-description">Live market data across multiple asset classes</p>
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
                    <h2>Featured <span className="highlight">Assets</span></h2>
                    <p className="section-description">Curated selection of top-performing assets</p>
                </div>
                
                <div className="sections-grid">
                    {Object.keys(sections).map((sectionKey) => (
                        <div key={sectionKey} className="section-card">
                            <div className="section-card-header">
                                <h3>Section {sectionKey}</h3>
                            </div>
                            <div className="assets-list">
                                {Object.keys(sections[sectionKey]).map((category) => (
                                    getRandomAssets(sections[sectionKey][category], 2).map((asset, index) => (
                                        <div key={index} className="asset-item">
                                            <Link 
                                                to={`/asset/${asset.split(' ')[0].toLowerCase()}`}
                                                className="asset-link"
                                            >
                                                {asset}
                                            </Link>
                                            <button
                                                onClick={() => handleAddToPortfolio(asset)}
                                                className="add-button"
                                                title="Add to Portfolio"
                                            >
                                                <PlusCircle size={20} />
                                            </button>
                                        </div>
                                    ))
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-header">
                    <h2>Trading <span className="highlight">Tools</span></h2>
                    <p className="section-description">Essential resources for your trading journey</p>
                </div>
                
                <div className="navigation-grid">
                    {[
                        { title: 'View All Sections', to: '/sections', description: 'Explore our complete market coverage' },
                        { title: 'Investment Allocation', to: '/form', description: 'Optimize your portfolio strategy' },
                        { title: 'View Portfolio', to: '/portfolio', description: 'Track your investments' },
                        { title: 'Market News', to: '/news', description: 'Stay updated with market trends' }
                    ].map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            className="nav-link"
                        >
                            <h3>{link.title}</h3>
                            <p>{link.description}</p>
                            <span className="nav-link-arrow">→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;