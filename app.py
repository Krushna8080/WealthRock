from flask import Flask, request, jsonify
import random
import os
import pandas as pd
import numpy as np
from data_processing import preprocess_data
from esg_analysis import generate_mock_esg_scores, esg_analysis
from sentiment_analysis import simulate_sentiment_analysis_impact, analyze_sentiment
from macro_analysis import generate_random_macro_data, macro_analysis
from technical_analysis import add_technical_indicators
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
# Define global variables
base_dir = os.path.dirname(os.path.dirname(os.path.abspath('./data/nifty.csv')))
data_dir = os.path.join(base_dir, 'data')
default_path = r'C:\Users\91808\OneDrive\Desktop\DynamicInvestmentAllocation\data\nifty.csv'

# Investment Allocation Functions
def get_allocation(capital, time_horizon, risk_tolerance):
    # Convert to appropriate types
    capital = float(capital)  # Ensure capital is a float
    time_horizon = int(time_horizon)  # Ensure time_horizon is an int

    if capital < 100000 and risk_tolerance == 'low' and time_horizon > 5:
        safe = 55
        hedge = 25
        volatile = 20
    elif capital > 1000000 and risk_tolerance == 'low' and time_horizon > 5:
        safe = 55
        hedge = 25
        volatile = 20
    else:
        weighted_score = get_weighted_score(capital, time_horizon, risk_tolerance)

        if weighted_score <= 4:
            safe = 60 - (weighted_score * 3)
            hedge = 30 - (weighted_score * 2)
            volatile = 10 + (weighted_score * 5)
        elif weighted_score <= 7:
            safe = 50 - ((weighted_score - 4) * 5)
            hedge = 30 - ((weighted_score - 4) * 4)
            volatile = 20 + ((weighted_score - 4) * 9)
        else:
            safe = 30 - ((weighted_score - 7) * 6)
            hedge = 30 - ((weighted_score - 7) * 4)
            volatile = 40 + ((weighted_score - 7) * 10)

    return {'safe': safe, 'hedge': hedge, 'volatile': volatile}

def get_weighted_score(capital, time_horizon, risk_tolerance):
    weights = {
        'capital': 0.30,
        'time_horizon': 0.30,
        'risk_tolerance': 0.40,
    }

    capital_score = get_capital_score(capital)
    time_horizon_score = get_time_horizon_score(time_horizon)
    risk_tolerance_score = get_risk_tolerance_score(risk_tolerance)

    weighted_score = (
        capital_score * weights['capital'] +
        time_horizon_score * weights['time_horizon'] +
        risk_tolerance_score * weights['risk_tolerance']
    )

    return weighted_score

def get_capital_score(capital):
    if capital > 1000000:
        return 10
    elif capital >= 400000:
        return 7
    else:
        return 5

def get_time_horizon_score(time_horizon):
    if time_horizon > 5:
        return 10
    elif time_horizon >= 3:
        return 7
    else:
        return 5

def get_risk_tolerance_score(risk_tolerance):
    if risk_tolerance == 'high':
        return 10
    elif risk_tolerance == 'medium':
        return 7
    elif risk_tolerance == 'low':
        return 5
    else:
        return 0

# Stock Market Evaluation Functions
def evaluate_score(score):
    if score >= 0.7:
        return "Positive"
    elif score >= 0.3:
        return "Neutral"
    else:
        return "Negative"

def evaluate_stock_market():
    try:
        nifty_data = preprocess_data(default_path)
        nifty_data = nifty_data[nifty_data['Date'].dt.year.between(2000, 2023)]
    except FileNotFoundError as e:
        print(f"FileNotFoundError: {e}")
        return None
    except KeyError as e:
        print(f"KeyError: {e}")
        return None

    nifty_data_with_indicators = add_technical_indicators(nifty_data)
    print("Nifty Data with Technical Indicators:")
    print(nifty_data_with_indicators.head())

    if 'MACD' not in nifty_data_with_indicators.columns or 'MACD_Signal' not in nifty_data_with_indicators.columns:
        print("MACD columns are missing in the data.")
        return

    sma_50_above_sma_200 = (nifty_data_with_indicators['SMA_50'].iloc[-1] > nifty_data_with_indicators['SMA_200'].iloc[-1])
    rsi_below_70 = (nifty_data_with_indicators['RSI'].iloc[-1] < 70)
    rsi_above_30 = (nifty_data_with_indicators['RSI'].iloc[-1] > 30)
    macd_positive = (nifty_data_with_indicators['MACD'].iloc[-1] > nifty_data_with_indicators['MACD_Signal'].iloc[-1])

    technical_score = sum([sma_50_above_sma_200, rsi_below_70, rsi_above_30, macd_positive]) / 4
    technical_outlook = evaluate_score(technical_score)

    assets = ['Nifty']
    esg_scores = generate_mock_esg_scores(assets)
    high_esg_assets = esg_analysis(esg_scores)
    esg_score = len(high_esg_assets) / len(assets)
    esg_outlook = evaluate_score(esg_score)

    macro_indicators = generate_random_macro_data(24)
    gdp_growth, interest_rate = macro_analysis(macro_indicators)
    macro_score = (gdp_growth > 0) and (interest_rate < 5)
    macro_outlook = "Positive" if macro_score else "Negative"

    news_data_with_sentiment = simulate_sentiment_analysis_impact()
    average_sentiment = news_data_with_sentiment['Sentiment'].mean()
    sentiment_score = average_sentiment > 0
    sentiment_outlook = "Positive" if sentiment_score else "Negative"

    overall_score = (technical_score + esg_score + macro_score + sentiment_score) / 4
    overall_outlook = "Positive" if overall_score > 0.5 else "Negative"

    print(f"Technical Score: {technical_outlook} ({technical_score})")
    print(f"ESG Score: {esg_outlook} ({esg_score})")
    print(f"Macro Score: {macro_outlook} ({macro_score})")
    print(f"Sentiment Score: {sentiment_outlook} ({sentiment_score})")
    print(f"Overall Score: {overall_outlook} ({overall_score})")

    return {"overall": {"outlook": overall_outlook, "score": overall_score}}

# Asset Selection Functions
def select_assets(sections, safe_percentage, hedge_percentage, volatile_percentage, market_outlook):
    selected_assets = {'safe': [], 'hedge': [], 'volatile': []}

    num_assets = 3  # Number of assets to randomly select

    if market_outlook == "Positive":
        safe_assets = random.sample(sections['A']['safe'], num_assets)
        hedge_assets = random.sample(sections['B']['hedge'], num_assets)
        volatile_assets = random.sample(sections['C']['volatile'], num_assets)
    elif market_outlook == "Neutral":
        safe_assets = random.sample(sections['A']['safe'], num_assets)
        hedge_assets = random.sample(sections['B']['hedge'], num_assets)
        volatile_assets = random.sample(sections['C']['volatile'], num_assets)
    else:  # "Negative" market outlook
        safe_assets = random.sample(sections['A']['safe'], num_assets)
        hedge_assets = random.sample(sections['B']['hedge'], num_assets)
        volatile_assets = random.sample(sections['C']['volatile'], num_assets)

    selected_assets['safe'] = safe_assets
    selected_assets['hedge'] = hedge_assets
    selected_assets['volatile'] = volatile_assets

    return selected_assets

@app.route('/submit_allocation', methods=['POST'])
@app.route('/submit_allocation', methods=['POST'])
def submit_allocation():
    data = request.json
    capital = data.get('capital')
    time_horizon = data.get('time_horizon')
    risk_tolerance = data.get('risk_tolerance')

    try:
        # Convert types before calling get_allocation
        capital = float(capital)  # Convert capital to float
        time_horizon = int(time_horizon)  # Convert time_horizon to int
        
        allocation = get_allocation(capital, time_horizon, risk_tolerance)
        market_evaluation = evaluate_stock_market()

        if market_evaluation is None:
            return jsonify({"error": "Error in evaluating market conditions."}), 500

        market_outlook = market_evaluation["overall"]["outlook"]

        sections = {
            'A': {
                'safe': ['Reliance Industries Limited (RELIANCE) - Stock', 'Tata Consultancy Services (TCS) - Stock', 'HDFC Bank Limited (HDFCBANK) - Stock',
                         'Government of India 7.26% 2029 Bond (IN0020180017)', 'Government of India 7.72% 2051 Bond (IN0020220074)',
                         'Government of India 6.84% 2022 Bond (IN0020160041)', 'Government of India 6.10% 2031 Bond (IN0020210058)',
                         'Government of India 5.63% 2026 Bond (IN0020210074)', 'Nippon India ETF Nifty BeES (NIFTYBEES)', 'SBI ETF Nifty 50 (SETFNIF50)',
                         'HDFC NIFTY ETF (HDFCNIFTY)', 'ICICI Prudential Nifty ETF (ICICINIFTY)', 'UTI Nifty Next 50 ETF (UTINEXT50)'],
                'hedge': ['Adani Enterprises Limited (ADANIENT) - Stock', 'Bharti Airtel Limited (BHARTIARTL) - Stock', 'Infosys Limited (INFY) - Stock',
                             'Kotak Banking ETF (KOTAKBKETF) - ETF','Reliance Industries Limited (RELIANCE) - Stock', 'Tata Consultancy Services (TCS) - Stock', 'HDFC Bank Limited (HDFCBANK) - Stock',
                         'Government of India 7.26% 2029 Bond (IN0020180017)', 'Government of India 7.72% 2051 Bond (IN0020220074)',],
                'volatile': ['Adani Enterprises Limited (ADANIENT) - Stock', 'Bharti Airtel Limited (BHARTIARTL) - Stock', 'Infosys Limited (INFY) - Stock',
                             'Kotak Banking ETF (KOTAKBKETF) - ETF', 'ICICI Prudential Nifty ETF (ICICINETF) - ETF',
                             'Aditya Birla Sun Life Nifty ETF (ABSLNIFTY) - ETF', 'BBB-rated Corporate Bonds (BBB-CORP) - Bond',
                             'High-Yield Municipal Bonds (HY-MUNI) - Bond', 'Emerging Market Bonds (EM-BOND) - Bond']
            },
            'B': {
                'safe': ['Gold', 'Silver', 'Platinum', 'Palladium', 'Copper', 'Crude Oil (Brent)', 'Natural Gas',
                         'US Dollar (USD)', 'Euro (EUR)', 'Japanese Yen (JPY)', 'Swiss Franc (CHF)',
                         'British Pound (GBP)', 'Canadian Dollar (CAD)', 'Australian Dollar (AUD)'],
                'hedge': ['Aluminum', 'Zinc', 'Nickel', 'Corn', 'Soybeans', 'Wheat', 'Coffee',
                          'Singapore Dollar (SGD)', 'Hong Kong Dollar (HKD)', 'New Zealand Dollar (NZD)',
                          'South Korean Won (KRW)', 'Norwegian Krone (NOK)', 'Swedish Krona (SEK)',
                          'Danish Krone (DKK)'],
                'volatile': ['Cocoa', 'Cotton', 'Sugar', 'Rubber', 'Ethanol', 'Lumber', 'Lithium',
                             'South African Rand (ZAR)', 'Turkish Lira (TRY)', 'Brazilian Real (BRL)',
                             'Russian Ruble (RUB)', 'Indian Rupee (INR)', 'Chinese Yuan (CNY)',
                             'Mexican Peso (MXN)']
            },
            'C': {
                'safe': ['Gold', 'Silver', 'Platinum', 'Palladium', 'Copper', 'Crude Oil (Brent)', 'Natural Gas'],
                'hedge': ['Aluminum', 'Zinc', 'Nickel', 'Corn', 'Soybeans', 'Wheat', 'Coffee'],
                'volatile': ['Cocoa', 'Cotton', 'Sugar', 'Rubber', 'Ethanol', 'Lumber', 'Lithium']
            }
        }

        selected_assets = select_assets(sections, allocation['safe'], allocation['hedge'], allocation['volatile'], market_outlook)

        return jsonify({
            "allocation": allocation,
            "market_evaluation": market_evaluation,
            "selected_assets": selected_assets
        })
    except (ValueError, TypeError) as e:
        return jsonify({"error": str(e)}), 400
    
from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

# Serve React's index.html for the root route
@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files (e.g., CSS, JS)
@app.route('/<path:path>')
def serve_static_files(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
