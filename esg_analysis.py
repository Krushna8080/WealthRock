import pandas as pd

def generate_mock_esg_scores(assets):
    # Generate mock ESG scores for the given assets
    esg_scores = pd.DataFrame({
        'Asset': assets,
        'ESG_Score': [72]  # Only one score for Nifty
    })
    return esg_scores

def esg_analysis(esg_scores):
    # Filter assets with high ESG scores
    high_esg_assets = esg_scores[esg_scores['ESG_Score'] > 70]
    return high_esg_assets
