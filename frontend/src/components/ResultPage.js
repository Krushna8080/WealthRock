import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart,
  TrendingUp,
  DollarSign,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import './ResultPage.css';

function ResultPage() {
  const { state } = useLocation();
  const { data } = state || {};

  if (!data) {
    return (
      <div className="error-container">
        <AlertCircle size={48} className="error-icon" />
        <h1>No Data Available</h1>
        <p>Please ensure you have selected investment parameters.</p>
      </div>
    );
  }

  const normalizePercentage = (value) => {
    // Convert to number and ensure it's between 0 and 100
    const num = Number(value);
    return Math.min(Math.max(num, 0), 100).toFixed(2);
  };

  const renderAllocation = () => {
    const total = Object.values(data.allocation).reduce((sum, val) => sum + Number(val), 0);
    
    return Object.entries(data.allocation).map(([asset, percentage]) => {
      // Calculate the normalized percentage for display
      const normalizedPercentage = (Number(percentage) / total * 100);
      
      return (
        <div className="allocation-item" key={asset}>
          <div className="allocation-info">
            <span className="asset-name">{asset}</span>
            <span className="asset-percentage">{normalizePercentage(normalizedPercentage)}%</span>
          </div>
          <div className="allocation-bar">
            <div 
              className="allocation-fill" 
              style={{ width: `${normalizedPercentage}%` }}
            />
          </div>
        </div>
      );
    });
  };

  const renderMarketEvaluation = () => {
    return Object.entries(data.market_evaluation).map(([metric, value]) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <div className="metric-card" key={metric}>
            <span className="metric-name">{metric.replace(/_/g, ' ')}</span>
            <div className="metric-details">
              {Object.entries(value).map(([key, subValue]) => (
                <div key={key} className="metric-subvalue">
                  <span className="subvalue-label">{key}:</span>
                  <span className={`subvalue-data ${
                    typeof subValue === 'number' && subValue > 0 ? 'trend-up' : 
                    typeof subValue === 'number' && subValue < 0 ? 'trend-down' : ''
                  }`}>
                    {typeof subValue === 'number' ? (
                      <>
                        {subValue > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {Number(subValue).toFixed(2)}
                      </>
                    ) : subValue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      const isPositive = typeof value === 'number' && value > 0;
      return (
        <div className="metric-card" key={metric}>
          <span className="metric-name">{metric.replace(/_/g, ' ')}</span>
          <div className={`metric-value ${isPositive ? 'trend-up' : 'trend-down'}`}>
            {typeof value === 'number' ? (
              <>
                {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Number(value).toFixed(2)}%
              </>
            ) : value}
          </div>
        </div>
      );
    });
  };

  const renderSelectedAssets = () => {
    return Object.entries(data.selected_assets).map(([asset, details]) => (
      <div className="asset-card" key={asset}>
        <div className="asset-header">
          <span className="asset-title">{asset}</span>
          <span className="asset-type">
            {typeof details === 'object' && details !== null ? details.type || 'Asset' : 'Asset'}
          </span>
        </div>
        <p className="asset-description">
          {typeof details === 'object' && details !== null
            ? details.description || JSON.stringify(details)
            : String(details)}
        </p>
      </div>
    ));
  };

  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-header">
          <h1>Investment Portfolio Analysis</h1>
          <p className="result-subtitle">Comprehensive breakdown of your investment strategy</p>
        </div>

        <div className="results-grid">
          <div className="result-section allocation-section">
            <div className="section-header">
              <PieChart size={24} />
              <h2>Portfolio Allocation</h2>
            </div>
            <div className="allocation-grid">
              {renderAllocation()}
            </div>
          </div>

          <div className="result-section">
            <div className="section-header">
              <BarChart3 size={24} />
              <h2>Market Analysis</h2>
            </div>
            <div className="market-metrics">
              {renderMarketEvaluation()}
            </div>
          </div>

          <div className="result-section">
            <div className="section-header">
              <DollarSign size={24} />
              <h2>Selected Assets</h2>
            </div>
            <div className="assets-grid">
              {renderSelectedAssets()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;