import {
    Box,
    Typography,
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
  import AccountCard from '../components/AccountCard';
  import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
import { mockTransactions } from '../api/mockData';
  
  const transactionData = mockTransactions;
  
  
  
  export default function AccountTransactions() {
     
      
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
          <Box   display="flex" alignItems="center" p={2}>
            <Typography variant="h6" mr = {3} >Transactions</Typography>
            <Button variant="outlined" startIcon={<FilterListIcon />}>Filter</Button>
          </Box>
           <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Direction</TableCell>
                  <TableCell>Sender/Recipient</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ border: "none", }}>{item.date}</TableCell>
                    <TableCell sx={{ border: "none" }}>{item.quantity}</TableCell>
                    <TableCell sx={{ border: "none" }}>{item.amount}</TableCell>
                    <TableCell sx={{ border: "none" }}>{item.currency}</TableCell>
                    <TableCell sx={{ border: "none" }}>{item.direction}</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {item.senderRecipient}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>{item.description}</TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
              <TableFooter>
                  <TableRow >
                  <TableCell  colSpan={8} sx={{ p: 0, border: "none" }}>
  
                      <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={4}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      sx={{
                          border: "none",
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
  