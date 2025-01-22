import React, { createContext, useState } from 'react';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);

  const addAssetToPortfolio = (asset) => {
    setPortfolio((prevPortfolio) => [...prevPortfolio, asset]);
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addAssetToPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};
