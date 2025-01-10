import React, { useState, useEffect } from 'react';
import DataTable from './components/table';
import { Card, Container, Typography, CircularProgress, Box } from '@mui/material';
import SummaryCard from './components/summaryCard';
import Graph from './components/graph';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (!darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const data = await response.json();
        setData(data);
        localStorage.setItem('cryptoData', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <main>
          <Container sx={{ position: 'relative' }}>
            <Typography variant="h4" textAlign="center">
              RaptorX Dashboard
            </Typography>
            <header className="dark_toggle">
              Light Mode
              <div id="toggle" onClick={() => setDarkMode(!darkMode)}>
                <div className={`toggle-inner ${darkMode ? '' : 'toggle-active'}`} />
              </div>
              Dark Mode
            </header>
            <Card className="custom_card">
              <DataTable data={data} />
            </Card>
            <Card className="custom_card">
              <Graph data={data} />
            </Card>
            <Card className="custom_card">
              <SummaryCard data={data} />
            </Card>
          </Container>
        </main>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
