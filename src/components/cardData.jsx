import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useColumnsFromBackend = () => {
  const [columns, setColumns] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const savedColumns = localStorage.getItem('columns');
      if (savedColumns) {
        setColumns(JSON.parse(savedColumns));
      } else {
        try {
          const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'); 
          const data = await response.json();
          
          const initialColumns = {
            [uuidv4()]: {
              title: 'Location 1',
              items: data.slice(0, Math.ceil(data.length / 2)), 
            },
            [uuidv4()]: {
              title: 'Location 2',
              items: data.slice(Math.ceil(data.length / 2)), 
            },
          };

          setColumns(initialColumns);

          localStorage.setItem('columns', JSON.stringify(initialColumns));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  return columns;
};
