import { SetStateAction, useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  Grid, 
  IconButton, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Tabs, 
  Typography, 
  Avatar, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';

import {
  Menu as MenuIcon,
  AccountBalance as BankIcon,
  CheckCircle as CheckCircleIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const chartData = [100, 180, 240, 300, 320, 350]; // Sample chart data

export default function IntegrationPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);
  
  // Mock data
  const accounts = [
    { name: 'HSBC Bank', type: 'Depositor', subType: 'Savings', linkedDate: '09/04/2025', status: 'Active', balance: '$730,000' },
    { name: 'Investment BCA', type: 'Depositor', subType: 'money market', linkedDate: '03/04/2025', status: 'Active', balance: '$ 122,500' },
    { name: 'Investment ABC', type: 'Credit', subType: 'Paypal', linkedDate: '29/03/2025', status: 'Inactive', balance: '$ 11,975,500' },
    { name: 'Bank xyz', type: 'Investment', subType: '401k', linkedDate: '10/03/2025', status: 'Inactive', balance: '$ 9,945,000' },
    { name: 'Bank abc', type: 'Other', subType: 'Other', linkedDate: '18/02/2025', status: '', balance: '' }
  ];

  const handleTabChange = (_event: unknown, newValue: SetStateAction<number>) => {
    setActiveTab(newValue);
  };

  const handleCloseSnackbar = () => {
    setShowSuccessMessage(false);
  };

  // Simple chart component
  const SimpleChart = () => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 200, width: '100%', position: 'relative' }}>
        <Box sx={{ 
          position: 'absolute', 
          left: 0, 
          bottom: 0, 
          width: '100%', 
          height: '80%',
          background: 'linear-gradient(180deg, rgba(232, 245, 233, 0) 0%, rgba(200, 230, 201, 0.5) 100%)',
          borderRadius: '0 0 4px 4px',
          zIndex: 1
        }} />
        
        <Box sx={{ 
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 2
        }}>
          {chartData.map((value, index) => (
            <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: `${value}px`, 
                  background: 'none',
                  position: 'relative'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 2,
                    height: `${value}px`,
                    backgroundColor: '#4CAF50',
                    transform: 'translateX(-50%)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: -4,
                      width: 10,
                      height: 10,
                      backgroundColor: '#4CAF50',
                      borderRadius: '50%'
                    }
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ mt: 1, color: '#9E9E9E' }}>
                {['January', 'February', 'March', 'April', 'May', 'June'][index]}
              </Typography>
            </Box>
          ))}
        </Box>
        
        {/* Y-axis labels */}
        <Box sx={{ position: 'absolute', left: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {['400M', '300M', '200M', '100M', '0M'].map((label, index) => (
            <Typography key={index} variant="caption" sx={{ color: '#9E9E9E', fontSize: '0.7rem' }}>
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Box sx={{ width: 60, bgcolor: 'white', borderRight: '1px solid #e0e0e0', py: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          {Array(8).fill(0).map((_, index) => (
            <IconButton key={index} size="small">
              <MenuIcon fontSize="small" color={index === 0 ? 'primary' : 'action'} />
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Integration Settings</Typography>
            <Typography variant="body2" color="text.secondary">
              This section will allow you to integrate your client portal with third party systems.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}>
              Link a new account
            </Button>
            <Avatar sx={{ bgcolor: '#ec407a' }}>H</Avatar>
          </Box>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            indicatorColor="primary"
            TabIndicatorProps={{ sx: { backgroundColor: 'black' } }}
          >
            <Tab label="Financial Accounts Integration" sx={{ 
              textTransform: 'none', 
              color: activeTab === 0 ? 'black' : 'text.secondary',
              '&.Mui-selected': { color: 'black', fontWeight: 500 }
            }} />
            <Tab label="Email Integration" sx={{ 
              textTransform: 'none',
              color: activeTab === 1 ? 'black' : 'text.secondary',
              '&.Mui-selected': { color: 'black', fontWeight: 500 }
            }} />
            <Tab label="Data Room Integration" sx={{ 
              textTransform: 'none',
              color: activeTab === 2 ? 'black' : 'text.secondary',
              '&.Mui-selected': { color: 'black', fontWeight: 500 }
            }} />
          </Tabs>
        </Box>

        {/* Main Dashboard Content */}
        <Box>
          {/* Stats Row */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Chart Card */}
            <Grid size={7}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Imported Assets</Typography>
                    <Chip 
                      label="+13.8%" 
                      size="small" 
                      sx={{ bgcolor: '#e8f5e9', color: '#4caf50', height: 20, fontSize: '0.75rem' }}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>$875M</Typography>
                  <SimpleChart />
                </CardContent>
              </Card>
            </Grid>

            {/* Stats Cards */}
            <Grid size={5}>
              <Grid container spacing={3} sx={{ height: '100%' }}>
                <Grid size={6}>
                  <Card sx={{ height: '100%'}}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="subtitle2">No. Of Accounts Linked</Typography>
                        <BankIcon color="action" />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>05</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f3e5f5' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="subtitle2">No. Of Active Linked Account</Typography>
                        <CheckCircleIcon color="action" />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>03</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f3e5f5' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="subtitle2">No. Of Transactions Imported</Typography>
                        <ReceiptIcon color="action" />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>02</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={6}>
                  <Card sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="subtitle2">Last Imported Date</Typography>
                        <CalendarIcon color="action" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>03/04/2025</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Linked Accounts Table */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Linked Accounts</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category-select"
                      label="Category"
                      defaultValue="all"
                    >
                      <MenuItem value="all">All</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status-select"
                      label="Status"
                      defaultValue="all"
                    >
                      <MenuItem value="all">All</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Sub Type</TableCell>
                      <TableCell>Linked Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((account, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.type}</TableCell>
                        <TableCell>{account.subType}</TableCell>
                        <TableCell>{account.linkedDate}</TableCell>
                        <TableCell>
                          {account.status && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box 
                                sx={{ 
                                  width: 36, 
                                  height: 20, 
                                  bgcolor: account.status === 'Active' ? '#e8f5e9' : '#f5f5f5',
                                  borderRadius: 10,
                                  display: 'flex',
                                  alignItems: 'center',
                                  px: 0.5
                                }}
                              >
                                <Box 
                                  sx={{ 
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: '50%', 
                                    bgcolor: account.status === 'Active' ? '#4caf50' : '#bdbdbd',
                                    mr: 0.5
                                  }} 
                                />
                              </Box>
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {account.status}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell align="right">{account.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Success Message */}
      <Snackbar 
        open={showSuccessMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="success" 
          sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
          icon={<CheckCircleIcon fontSize="small" />}
          action={
            <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <Box>
            <Typography variant="subtitle2">Linked Successfully</Typography>
            <Typography variant="caption">Account has been successfully linked</Typography>
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  );
}