import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Clock, Shield } from 'lucide-react';
import './FormPage.css';

function FormPage() {
  const [capital, setCapital] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('low');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://wealthrock.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          capital: Number(capital), 
          risk_tolerance: riskTolerance, 
          time_horizon: Number(timeHorizon) 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/results', { state: { data } });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'An error occurred while submitting the form');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Investment Profile</h1>
          <p className="form-subtitle">Tell us about your investment preferences</p>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <DollarSign size={20} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="capital">Investment Capital</label>
              <input
                type="number"
                id="capital"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                placeholder="Enter amount"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <Shield size={20} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="risk-tolerance">Risk Tolerance</label>
              <select
                id="risk-tolerance"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
                required
              >
                <option value="low">Conservative</option>
                <option value="medium">Moderate</option>
                <option value="high">Aggressive</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <Clock size={20} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="time-horizon">Time Horizon (Years)</label>
              <input
                type="number"
                id="time-horizon"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                placeholder="Investment duration"
                min="1"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Generate Investment Strategy
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;