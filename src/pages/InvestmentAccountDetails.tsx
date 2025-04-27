import {
  Box,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TableFooter,
  TableContainer,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountCard from '../components/AccountCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { generatePath, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const investmentData = [
  {
    logo: 'https://logo.clearbit.com/nvidia.com',
    name: 'Nvidia',
    description: 'Preference shares',
    quantity: '10,579',
    price: '$ 109',
    trend: '-3.8%',
    trendDirection: 'down',
    amount: '$ 1,150,000',
    date: '03/04/2025'
  },
  {
    logo: 'https://logo.clearbit.com/adobe.com',
    name: 'Adobe',
    description: 'Ordinary shares',
    quantity: '8,672',
    price: '$ 213',
    trend: '+13.8%',
    trendDirection: 'up',
    amount: '$ 1,850,000',
    date: '29/03/2025'
  },
  {
    logo: 'https://logo.clearbit.com/apple.com',
    name: 'Apple',
    description: 'Voting shares',
    quantity: '5,000',
    price: '$ 500',
    trend: '+6.2%',
    trendDirection: 'up',
    amount: '$ 2,500,000',
    date: '10/03/2025'
  },
  {
    logo: 'https://logo.clearbit.com/google.com',
    name: 'Google',
    description: 'Cumulative preference shares',
    quantity: '3,783',
    price: '$ 238',
    trend: '+6.9%',
    trendDirection: 'up',
    amount: '$ 900,000',
    date: '18/02/2025'
  }
];



export default function InvestmentAccountDetails() {
   
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        console.log(event);
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Typography variant="body2" 
                    mb={3} 
                    color="text.secondary"
                    onClick = {() => navigate('/accounts')} 
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer'
                    }}> <ArrowBackIosNewIcon fontSize='small'></ArrowBackIosNewIcon> Investment Accounts</Typography>
      <Typography variant="h5" fontWeight="bold">HSBC Bank Account</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Placeholder for the descriptions</Typography>

      <Box sx={{width: '25%', mb: 3}} >
        <AccountCard account={{ id: 1, name: "John Doe", number: "*****56789", type: "Checking", currency: "USD", balance: 500.00 }}></AccountCard>
      </Box>


      

      <Box component={Paper}>
        <Box   display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{width: '25%'}}>
          <Typography variant="h6">List of Investments</Typography>
          <Button variant="outlined" startIcon={<FilterListIcon />}>Filter</Button>
        </Box>
         <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Investment Logo</TableCell>
                <TableCell>Investment Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price Per Share</TableCell>
                <TableCell>Trends</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investmentData.map((item, index) => (
                <TableRow key={index} hover onClick = {() => navigate(generatePath('/accounts/:id/securities/:securityId', { id: item.name, securityId: item.name}))}>
                  <TableCell sx={{ border: "none", }}><Avatar src={item.logo} /></TableCell>
                  <TableCell sx={{ border: "none" }}>{item.name}</TableCell>
                  <TableCell sx={{ border: "none" }}>{item.description}</TableCell>
                  <TableCell sx={{ border: "none" }}>{item.quantity}</TableCell>
                  <TableCell sx={{ border: "none" }}>{item.price}</TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Chip
                      label={item.trend}
                      icon={item.trendDirection === 'up' ? <TrendingUpIcon fontSize="small" sx={{color: 'green'}} /> : <TrendingDownIcon fontSize="small" sx={{color: 'red'}} />}
                      sx={{
                        bgcolor: item.trendDirection === 'up' ? '#e6f4ea' : '#fbeaea',
                        color: item.trendDirection === 'up' ? 'green' : 'red',
                        fontWeight: 'bold',
                        '& .MuiChip-icon': {
                            color: 'inherit' // This will make the icon inherit the color from the Chip
                            }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>{item.amount}</TableCell>
                  <TableCell sx={{ border: "none" }}>{item.date}</TableCell>
                </TableRow>
              ))}
              
            </TableBody>
            <TableFooter>
                <TableRow >
                <TableCell colSpan={8} sx={{ p: 0 }}>

                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={4}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                    slotProps={{
                        select: {
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </TableCell>
                </TableRow>
                </TableFooter>
          </Table>
          </TableContainer>
      </Box>
    </Box>
  );
}
