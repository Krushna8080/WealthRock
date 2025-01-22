import pandas as pd
import os

def preprocess_data(filepath):
    data = pd.read_csv(filepath)
    
    # Print the columns to inspect the CSV structure
    print("Data columns after stripping whitespace:")
    data.columns = data.columns.str.strip()
    print(data.columns)
    
    # Rename 'Year' to 'Date'
    if 'Year' in data.columns:
        data.rename(columns={'Year': 'Date'}, inplace=True)
    else:
        raise KeyError("The 'Year' column is not found in the data")
    
    # Convert 'Date' column to datetime
    data['Date'] = pd.to_datetime(data['Date'], format='%Y')
    
    # Drop the 'Annual' column if it exists
    if 'Annual' in data.columns:
        data.drop(columns=['Annual'], inplace=True)
    
    # Melt the dataframe to long format
    data = data.melt(id_vars='Date', var_name='Month', value_name='Value')
    
    # Combine 'Date' and 'Month' into a single datetime column
    month_str_to_num = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
        'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    }
    data['Month'] = data['Month'].map(month_str_to_num)
    data['Date'] = data.apply(lambda row: pd.to_datetime(f"{row['Date'].year}-{row['Month']}-01"), axis=1)
    
    # Drop the 'Month' column
    data.drop(columns=['Month'], inplace=True)
    
    # Sort the data by date
    data.sort_values(by='Date', inplace=True)
    
    return data

# Example usage
if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    
    default_path = r'C:\Users\91808\OneDrive\Desktop\DynamicInvestmentAllocation\data\nifty.csv'
    
    try:
        nifty_data = preprocess_data(default_path)
        print("Preprocessed Nifty Data:")
        print(nifty_data.head())
        
        # Filter data between 2000 and 2023
        nifty_data = nifty_data[nifty_data['Date'].dt.year.between(2000, 2023)]
        print("Filtered Nifty Data:")
        print(nifty_data.head())
        
    except FileNotFoundError as e:
        print(e)
    except KeyError as e:
        print(e)
