import React, { useContext } from 'react';
import { PlusCircle, Layers } from 'lucide-react';
import { PortfolioContext } from './PortfolioContext';
import './Sections.css';

const sections = {
    'A': {
        'safe': ['Reliance Industries Limited (RELIANCE) - Stock', 'Tata Consultancy Services (TCS) - Stock', 'HDFC Bank Limited (HDFCBANK) - Stock',
            'Government of India 7.26% 2029 Bond (IN0020180017)', 'Government of India 7.72% 2051 Bond (IN0020220074)',
            'Government of India 6.84% 2022 Bond (IN0020160041)', 'Government of India 6.10% 2031 Bond (IN0020210058)',
            'Government of India 5.63% 2026 Bond (IN0020210074)', 'Nippon India ETF Nifty BeES (NIFTYBEES)', 'SBI ETF Nifty 50 (SETFNIF50)',
            'HDFC NIFTY ETF (HDFCNIFTY)', 'ICICI Prudential Nifty ETF (ICICINIFTY)', 'UTI Nifty Next 50 ETF (UTINEXT50)'],
        'hedge': ['Adani Enterprises Limited (ADANIENT) - Stock', 'Bharti Airtel Limited (BHARTIARTL) - Stock', 'Infosys Limited (INFY) - Stock',
            'Kotak Banking ETF (KOTAKBKETF) - ETF', 'Reliance Industries Limited (RELIANCE) - Stock', 'Tata Consultancy Services (TCS) - Stock',
            'HDFC Bank Limited (HDFCBANK) - Stock', 'Government of India 7.26% 2029 Bond (IN0020180017)', 'Government of India 7.72% 2051 Bond (IN0020220074)'],
        'volatile': ['Adani Enterprises Limited (ADANIENT) - Stock', 'Bharti Airtel Limited (BHARTIARTL) - Stock', 'Infosys Limited (INFY) - Stock',
            'Kotak Banking ETF (KOTAKBKETF) - ETF', 'ICICI Prudential Nifty ETF (ICICINETF) - ETF', 'Aditya Birla Sun Life Nifty ETF (ABSLNIFTY) - ETF',
            'BBB-rated Corporate Bonds (BBB-CORP) - Bond', 'High-Yield Municipal Bonds (HY-MUNI) - Bond', 'Emerging Market Bonds (EM-BOND) - Bond']
    },
    'B': {
        'safe': ['Gold', 'Silver', 'Platinum', 'Palladium', 'Copper', 'Crude Oil (Brent)', 'Natural Gas', 'US Dollar (USD)', 'Euro (EUR)',
            'Japanese Yen (JPY)', 'Swiss Franc (CHF)', 'British Pound (GBP)', 'Canadian Dollar (CAD)', 'Australian Dollar (AUD)'],
        'hedge': ['Aluminum', 'Zinc', 'Nickel', 'Corn', 'Soybeans', 'Wheat', 'Coffee', 'Singapore Dollar (SGD)', 'Hong Kong Dollar (HKD)',
            'New Zealand Dollar (NZD)', 'South Korean Won (KRW)', 'Norwegian Krone (NOK)', 'Swedish Krona (SEK)', 'Danish Krone (DKK)'],
        'volatile': ['Cocoa', 'Cotton', 'Sugar', 'Rubber', 'Ethanol', 'Lumber', 'Lithium', 'South African Rand (ZAR)', 'Turkish Lira (TRY)',
            'Brazilian Real (BRL)', 'Russian Ruble (RUB)', 'Indian Rupee (INR)', 'Chinese Yuan (CNY)', 'Mexican Peso (MXN)']
    },
    'C': {
        'safe': ['Gold', 'Silver', 'Platinum', 'Palladium', 'Copper', 'Crude Oil (Brent)', 'Natural Gas'],
        'hedge': ['Aluminum', 'Zinc', 'Nickel', 'Corn', 'Soybeans', 'Wheat', 'Coffee'],
        'volatile': ['Cocoa', 'Cotton', 'Sugar', 'Rubber', 'Ethanol', 'Lumber', 'Lithium']
    }
};

const Sections = () => {
    const { addAssetToPortfolio } = useContext(PortfolioContext);

    return (
        <div className="sections-page">
            <div className="sections-hero">
                <div className="sections-hero-content">
                    <Layers className="hero-icon" size={48} />
                    <h1>Asset Categories</h1>
                    <p className="hero-subtitle">Explore our comprehensive selection of investment options</p>
                </div>
            </div>

            <div className="sections-container">
                {Object.keys(sections).map((sectionKey) => (
                    <div key={sectionKey} className="section-block">
                        <div className="section-header">
                            <h2>Section <span className="highlight">{sectionKey}</span></h2>
                            <p className="section-description">
                                {sectionKey === 'A' && 'Stocks, Bonds & ETFs'}
                                {sectionKey === 'B' && 'Commodities & Currencies'}
                                {sectionKey === 'C' && 'Alternative Investments'}
                            </p>
                        </div>

                        <div className="categories-grid">
                            {Object.keys(sections[sectionKey]).map((category) => (
                                <div key={category} className="category-card">
                                    <div className="category-header">
                                        <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Assets</h3>
                                        <div className="risk-indicator">
                                            {category === 'safe' && <span className="risk-low">Low Risk</span>}
                                            {category === 'hedge' && <span className="risk-medium">Medium Risk</span>}
                                            {category === 'volatile' && <span className="risk-high">High Risk</span>}
                                        </div>
                                    </div>
                                    <div className="assets-list">
                                        {sections[sectionKey][category].map((asset, index) => (
                                            <div key={index} className="asset-item">
                                                <span className="asset-name">{asset}</span>
                                                <button
                                                    onClick={() => addAssetToPortfolio(asset)}
                                                    className="add-button"
                                                    title="Add to Portfolio"
                                                >
                                                    <PlusCircle size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sections;