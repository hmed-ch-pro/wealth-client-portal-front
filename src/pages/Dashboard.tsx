import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const Dashboard: React.FC = () => {
  const chartOptions1 = {
    title: { text: 'Total Net Worth & Evolution' },
    series: [{
      name: 'Assets',
      data: [300, 280, 250, 240, 220, 200, 180],
    }, {
      name: 'Liabilities',
      data: [100, 90, 80, 70, 60, 50, 40],
    }],
  };

  const chartOptions2 = {
    chart: { type: 'pie' },
    title: { text: 'Total Assets Breakdown' },
    series: [{
      name: 'Assets',
      data: [
        ['Private Equity', 28], ['Real Estate', 8], ['Private Debt', 12],
        ['Liquid Investment', 10], ['Equities', 7], ['Bonds', 7],
        ['Cash', 6], ['Commodities', 6], ['Alternate Investments', 8],
      ],
    }],
  };

  return (
    <Grid container spacing={3} padding={3} style={{ backgroundColor: '#121212', color: '#fff' }}>
      <Grid size={12}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
      </Grid>
      <Grid  size={6}>
        <Card style={{ backgroundColor: '#1e1e1e' }}>
          <CardContent>
            <HighchartsReact highcharts={Highcharts} options={chartOptions1} />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={6}>
        <Card style={{ backgroundColor: '#1e1e1e' }}>
          <CardContent>
            <HighchartsReact highcharts={Highcharts} options={chartOptions2} />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={12}>
        <Button variant="contained" style={{ backgroundColor: '#333', color: '#fff' }}>Back</Button>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
