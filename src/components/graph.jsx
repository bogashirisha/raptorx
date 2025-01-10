import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';

const Graph = ({ data }) => {
  return (
    <>
      {data && (
        <>
          <Box className="heading">Bar Graph</Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart
              xAxis={[{ scaleType: 'band', data: data?.map(item => item.name) }]}
              yAxis={[
                {
                  min: 0, 
                  max: 10000, 
                },
              ]}
              series={[
                {
                  data: data?.map(item => (item.current_price) / 2),
                },
              ]}
              width={700}
              height={300}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Graph;
