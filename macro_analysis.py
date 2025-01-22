import pandas as pd
import numpy as np

def generate_random_macro_data(num_entries=24):
    np.random.seed(0)
    data = {
        'date': pd.date_range(start='2000-01-01', periods=num_entries, freq='Y'),
        'gdp_growth': np.random.uniform(1, 10, num_entries),
        'interest_rate': np.random.uniform(1, 10, num_entries)
    }
    macro_data = pd.DataFrame(data)
    return macro_data

def macro_analysis(macro_data):
    gdp_growth = macro_data['gdp_growth'].mean()
    interest_rate = macro_data['interest_rate'].mean()
    return gdp_growth, interest_rate
