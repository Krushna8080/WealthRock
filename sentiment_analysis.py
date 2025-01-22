# sentiment_analysis.py

import pandas as pd
import numpy as np
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    sentiment = analyzer.polarity_scores(text)
    return sentiment

def bulk_sentiment_analysis(news_data):
    analyzer = SentimentIntensityAnalyzer()
    news_data['sentiment'] = news_data['text'].apply(lambda x: analyzer.polarity_scores(x)['compound'])
    return news_data

def generate_random_news(n_samples):
    # Simulate generating random news headlines
    news_data = pd.DataFrame(columns=['text'])
    np.random.seed(42)
    for i in range(n_samples):
        news_data.loc[i] = [' '.join(np.random.choice(['Good', 'Bad', 'Neutral']) for _ in range(5))]
    return news_data

def simulate_sentiment_analysis_impact():
    # Simulate generating random news and analyzing sentiment
    news_data = generate_random_news(100)
    news_data['Sentiment'] = news_data['text'].apply(lambda x: analyze_sentiment(x)['compound'])
    
    # Simulate impact of sentiment on asset returns
    n_samples = len(news_data)
    sentiment_scores = news_data['Sentiment'].values
    news_data['Asset_Returns'] = simulate_asset_returns(n_samples, sentiment_scores)
    
    return news_data

def simulate_asset_returns(n_samples, sentiment_scores):
    np.random.seed(123)
    base_returns = np.random.normal(loc=0.5, scale=2.0, size=n_samples)
    impact_factor = 0.3  # Adjust this factor to control the impact of sentiment
    asset_returns = base_returns + sentiment_scores * impact_factor
    return asset_returns
