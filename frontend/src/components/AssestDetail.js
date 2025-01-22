

import React from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp, Activity, DollarSign, BarChart3 } from 'lucide-react';
import './AssestDetail.css';

const mockData = {
  // Section A - Safe Assets
  reliance: {
    high: 3000,
    low: 2500,
    current: 2700,
    volume: 80000,
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Reliance Price',
          data: [2550, 2600, 2700, 2750, 2800, 2700],
          fill: false,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
        },
      ],
    },
  },
  tcs: {
    high: 3500,
    low: 3000,
    current: 3200,
    volume: 60000,
  },
  hdfcbank: {
    high: 1700,
    low: 1500,
    current: 1600,
    volume: 70000,
  },
  // Bonds
  govBond2029: {
    high: 106,
    low: 102,
    current: 104,
    volume: 10000,
  },
  govBond2051: {
    high: 115,
    low: 110,
    current: 112,
    volume: 8000,
  },

  // Section A - Hedge Assets
  adani: {
    high: 2500,
    low: 2200,
    current: 2300,
    volume: 50000,
  },
  bharti: {
    high: 780,
    low: 700,
    current: 740,
    volume: 60000,
  },
  infosys: {
    high: 1800,
    low: 1600,
    current: 1700,
    volume: 55000,
  },
  kotakBankingETF: {
    high: 2500,
    low: 2200,
    current: 2300,
    volume: 50000,
  },

  // Section A - Volatile Assets
  iciciPrudentialNiftyETF: {
    high: 2600,
    low: 2300,
    current: 2400,
    volume: 45000,
  },

  // Section B - Safe Assets
  gold: {
    high: 2000,
    low: 1800,
    current: 1900,
    volume: 5000,
  },
  silver: {
    high: 25,
    low: 20,
    current: 22,
    volume: 3000,
  },
  platinum: {
    high: 1100,
    low: 900,
    current: 1000,
    volume: 2000,
  },
  palladium: {
    high: 2500,
    low: 2200,
    current: 2400,
    volume: 1500,
  },
  copper: {
    high: 4.5,
    low: 3.5,
    current: 4.0,
    volume: 4000,
  },

  // Section B - Hedge Assets
  aluminum: {
    high: 2.8,
    low: 2.5,
    current: 2.6,
    volume: 2200,
  },
  zinc: {
    high: 1.5,
    low: 1.3,
    current: 1.4,
    volume: 2000,
  },
  nickel: {
    high: 30,
    low: 25,
    current: 28,
    volume: 1500,
  },
  corn: {
    high: 6,
    low: 5,
    current: 5.5,
    volume: 1800,
  },
  soybeans: {
    high: 15,
    low: 12,
    current: 13.5,
    volume: 1600,
  },

  // Section B - Volatile Assets
  cocoa: {
    high: 2500,
    low: 2300,
    current: 2400,
    volume: 1200,
  },
  cotton: {
    high: 80,
    low: 70,
    current: 75,
    volume: 1300,
  },
  sugar: {
    high: 20,
    low: 18,
    current: 19,
    volume: 1400,
  },
  rubber: {
    high: 2.5,
    low: 2.0,
    current: 2.2,
    volume: 1100,
  },
  ethanol: {
    high: 1.7,
    low: 1.5,
    current: 1.6,
    volume: 1000,
  },

  // Section C - Safe Assets
  silverC: {
    high: 25,
    low: 20,
    current: 22,
    volume: 3000,
  },
  platinumC: {
    high: 1100,
    low: 900,
    current: 1000,
    volume: 2000,
  },
  palladiumC: {
    high: 2500,
    low: 2200,
    current: 2400,
    volume: 1500,
  },
  copperC: {
    high: 4.5,
    low: 3.5,
    current: 4.0,
    volume: 4000,
  },

  // Section C - Hedge Assets
  aluminumC: {
    high: 2.8,
    low: 2.5,
    current: 2.6,
    volume: 2200,
  },
  zincC: {
    high: 1.5,
    low: 1.3,
    current: 1.4,
    volume: 2000,
  },
  nickelC: {
    high: 30,
    low: 25,
    current: 28,
    volume: 1500,
  },
  cornC: {
    high: 6,
    low: 5,
    current: 5.5,
    volume: 1800,
  },
  soybeansC: {
    high: 15,
    low: 12,
    current: 13.5,
    volume: 1600,
  },

  // Section C - Volatile Assets
  cocoaC: {
    high: 2500,
    low: 2300,
    current: 2400,
    volume: 1200,
  },
  cottonC: {
    high: 80,
    low: 70,
    current: 75,
    volume: 1300,
  },
  sugarC: {
    high: 20,
    low: 18,
    current: 19,
    volume: 1400,
  },
  rubberC: {
    high: 2.5,
    low: 2.0,
    current: 2.2,
    volume: 1100,
  },
  ethanolC: {
    high: 1.7,
    low: 1.5,
    current: 1.6,
    volume: 1000,
  },
};

const AssetDetail = () => {
  const { assetName } = useParams();
  const assetData = mockData[assetName.toLowerCase()];

  if (!assetData) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Asset Not Found</h2>
          <p>The requested asset information is not available.</p>
        </div>
      </div>
    );
  }

  const percentageChange = ((assetData.current - assetData.low) / assetData.low * 100).toFixed(2);
  const isPositive = assetData.current > assetData.low;

  return (
    <div className="asset-detail-page">
      <div className="asset-hero">
        <div className="asset-hero-content">
          <h1>{assetName}</h1>
          <p className="asset-subtitle">Detailed Market Analysis</p>
        </div>
      </div>

      <div className="asset-container">
        <div className="asset-overview">
          <div className="asset-card current-price">
            <div className="card-header">
              <h3>Current Price</h3>
              <DollarSign className="card-icon" />
            </div>
            <div className="price-content">
              <span className="price-value">{assetData.current}</span>
              <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '+' : ''}{percentageChange}%
              </span>
            </div>
          </div>

          <div className="asset-metrics-grid">
            <div className="asset-card">
              <div className="card-header">
                <h3>24h High</h3>
                <TrendingUp className="card-icon" />
              </div>
              <div className="metric-value">{assetData.high}</div>
            </div>

            <div className="asset-card">
              <div className="card-header">
                <h3>24h Low</h3>
                <Activity className="card-icon" />
              </div>
              <div className="metric-value">{assetData.low}</div>
            </div>

            <div className="asset-card">
              <div className="card-header">
                <h3>Volume</h3>
                <BarChart3 className="card-icon" />
              </div>
              <div className="metric-value">{assetData.volume.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;