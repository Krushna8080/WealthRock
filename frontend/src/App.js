import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import FormPage from './components/FormPage';
import ResultPage from './components/ResultPage';
import AssetDetail from './components/AssestDetail';
import Portfolio from './components/Portfolio';
import { PortfolioProvider } from './components/PortfolioContext';
import News from './components/News'
import Sections from './components/Sections';

function App() {
    return (
        <PortfolioProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/form" element={<FormPage />} />
                    <Route path="/results" element={<ResultPage />} />
                    <Route path="/asset/:assetName" element={<AssetDetail />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/news" element={<News />} />  {/* Add this line */}
                    <Route path="/sections" element={<Sections />} />
                </Routes>
            </Router>
        </PortfolioProvider>
    );
}

export default App;
