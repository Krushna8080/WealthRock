import pandas as pd
import ta

def add_technical_indicators(data):
    data = data.copy()
    
    # Adding Moving Averages
    data['SMA_50'] = ta.trend.sma_indicator(data['Value'], window=50)
    data['SMA_200'] = ta.trend.sma_indicator(data['Value'], window=200)
    
    # Adding RSI
    data['RSI'] = ta.momentum.rsi(data['Value'], window=14)
    
    # Adding MACD
    macd = ta.trend.MACD(data['Value'])
    data['MACD'] = macd.macd()
    data['MACD_Signal'] = macd.macd_signal()
    data['MACD_Diff'] = macd.macd_diff()  # Adding MACD histogram difference

    return data
