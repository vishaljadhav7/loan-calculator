import { useState, useEffect } from 'react';
import axios from 'axios';


interface ExchangeRateData {
  base_code: string;
  conversion_rates: Record<string, number>; 
}

interface UseExchangeRatesReturn {
  data: ExchangeRateData;
  loading: boolean;
  error: string;
}


const useExchangeRates = (baseCurrency = 'USD'): UseExchangeRatesReturn => {
  const [data, setData] = useState<ExchangeRateData>({
    base_code: '',
    conversion_rates: {}
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_REACT_API}/latest/${baseCurrency}`
        );
        
        if (response.status !== 200) {
          throw new Error('Error while fetching exchange rates!');
        }
        
        setData({
          base_code: response.data.base_code,
          conversion_rates: response.data.conversion_rates as Record<string, number>
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  return { data, loading, error };
};

export default useExchangeRates;