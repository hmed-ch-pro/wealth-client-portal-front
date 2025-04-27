import React, { useState, useEffect, useRef } from 'react';
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
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert,
  Snackbar,
  SelectChangeEvent
} from '@mui/material';

import {  
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemSecondaryAction,

} from '@mui/material';

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountBalance as BankIcon,
  CheckCircle as CheckCircleIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import GoogleIcon from '@mui/icons-material/Google';
import CloudIcon from '@mui/icons-material/Cloud';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


import { usePlaidLink } from 'react-plaid-link';


// In a real implementation, you would import Highcharts like this:
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import FinancialIntegrationModal from '../components/FinancialIntegrationModal';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GoogleDrivePicker from '../components/GoogleDrivePicker';

// Define interfaces for type safety
interface Account {
  name: string;
  type: string;
  subType: string;
  linkedDate: string;
  status: string;
  balance: string;
}

interface ChartDataPoint {
  month: string;
  value: number;
}

const FinancialIntegrationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Mock data for chart
  const chartData: ChartDataPoint[] = [
    { month: 'Jan', value: 175 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 320 },
    { month: 'Apr', value: 340 },
    { month: 'May', value: 360 },
    { month: 'Jun', value: 380 }
  ];
  
  // Mock data for accounts
  const accounts: Account[] = [
    { name: 'HSBC Bank', type: 'Depositor', subType: 'Savings', linkedDate: '09/04/2025', status: 'Active', balance: '$730,000' },
    { name: 'Investment BCA', type: 'Depositor', subType: 'money market', linkedDate: '03/04/2025', status: 'Active', balance: '$ 122,500' },
    { name: 'Investment ABC', type: 'Credit', subType: 'Paypal', linkedDate: '29/03/2025', status: 'Inactive', balance: '$ 11,975,500' },
    { name: 'Bank xyz', type: 'Investment', subType: '401k', linkedDate: '10/03/2025', status: 'Inactive', balance: '$ 9,945,000' },
    { name: 'Bank abc', type: 'Other', subType: 'Other', linkedDate: '18/02/2025', status: '', balance: '' }
  ];

  /*const { open, ready } = usePlaidLink({
    token: 'link-sandbox-c64a50ef-c209-4917-b2e1-c78c0c1dd503',
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      console.log(public_token, metadata);
    },
    onLoad: () => {
      // Find the Plaid iframe and its container once loaded
      const plaidLinkIframe = document.querySelector('iframe[id^="plaid-link-iframe"]');
      const plaidLinkOverlay = document.querySelector('div[id^="plaid-link-overlay"]');
      
      if (plaidLinkIframe) {
        (plaidLinkIframe as HTMLElement).style.zIndex = '2000';
        (plaidLinkIframe as HTMLElement).style.position = 'fixed';
        (plaidLinkIframe as HTMLElement).style.top = '50%';
        (plaidLinkIframe as HTMLElement).style.left = '50%';
        (plaidLinkIframe as HTMLElement).style.transform = 'translate(-50%, -50%)';
        (plaidLinkIframe as HTMLElement).style.height = '80%';
        (plaidLinkIframe as HTMLElement).style.width = '100%';
        (plaidLinkIframe as HTMLElement).style.maxWidth = '500px';
        (plaidLinkIframe as HTMLElement).style.borderRadius = '4px';
      }
      
      if (plaidLinkOverlay) {
        (plaidLinkOverlay as HTMLElement).style.backgroundColor = 'transparent';
        (plaidLinkOverlay as HTMLElement).style.pointerEvents = 'none';
      }
    }
  });*/

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue);
  };

  const handleCloseSnackbar = (): void => {
    setShowSuccessMessage(false);
  };
  
  const handleCategoryChange = (event: SelectChangeEvent): void => {
    setCategoryFilter(event.target.value as string);
  };
  
  const handleStatusChange = (event: SelectChangeEvent): void => {
    setStatusFilter(event.target.value as string);
  };

  const [amount, setAmount] = useState(875);
  const [displayValue, setDisplayValue] = useState(875);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousAmount = useRef(amount);

  // Random value change for demo purposes
  const changeAmount = () => {
    const newAmount = Math.floor(Math.random() * 500) + 800; // Random value between 800 and 1300
    setAmount(newAmount);
  };

  useEffect(() => {
    if (amount !== previousAmount.current) {
      setIsAnimating(true);
      
      // Store start and end values for animation
      const startValue = previousAmount.current;
      const endValue = amount;
      const duration = 1000; // 1 second animation
      const startTime = Date.now();
      
      const animateValue = () => {
        const now = Date.now();
        const elapsedTime = now - startTime;
        
        if (elapsedTime < duration) {
          // Calculate current value based on elapsed time
          const progress = elapsedTime / duration;
          const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
          setDisplayValue(currentValue);
          requestAnimationFrame(animateValue);
        } else {
          // Animation complete
          setDisplayValue(endValue);
          setIsAnimating(false);
          previousAmount.current = amount;
        }
      };
      
      requestAnimationFrame(animateValue);
    }
  }, [amount]);

  // Highcharts configuration options
  const chartOptions: any = {
    chart: {
      type: 'area',
      height: 220,
      style: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      }
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: chartData.map(item => item.month),
      labels: {
        style: {
          color: '#9E9E9E',
          fontSize: '12px'
        }
      },
      lineColor: '#e0e0e0',
      tickLength: 0
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function(): string {
          return this.value + 'M';
        },
        style: {
          color: '#9E9E9E',
          fontSize: '12px'
        }
      },
      gridLineColor: '#e0e0e0',
      gridLineDashStyle: 'dash'
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter: function(): string {
        return  '$' + this.y + 'M';
      }
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgba(76, 175, 80, 0.2)'],
            [1, 'rgba(76, 175, 80, 0.05)']
          ]
        },
        marker: {
          radius: 4,
          fillColor: '#4CAF50',
          lineWidth: 0,
          lineColor: null
        },
        lineWidth: 2,
        lineColor: '#4CAF50',
        states: {
          hover: {
            lineWidth: 2
          }
        },
        threshold: null
      }
    },
    series: [{
      name: 'Imported Assets',
      data: chartData.map(item => item.value)
    }]
  };

  // In a real implementation, you would use this to initialize Highcharts
  useEffect(() => {
    // This is where you would initialize Highcharts in a real implementation
     if (chartRef.current && window.Highcharts) {
       window.Highcharts.chart(chartRef.current, chartOptions);
     }
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePlaidSuccess = (publicToken: string, metadata: any) => {
    console.log('Success!', publicToken, metadata);
  };


  
  return (
    <Box sx={{ display: 'flex'}}>
      {/* Left Sidebar 
      <Box sx={{ width: 60, bgcolor: 'white', borderRight: '1px solid #e0e0e0', py: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          {Array(8).fill(0).map((_, index) => (
            <IconButton key={index} size="small">
              <MenuIcon fontSize="small" color={index === 0 ? 'primary' : 'action'} />
            </IconButton>
          ))}
        </Box>
      </Box>*/}

      <FinancialIntegrationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handlePlaidSuccess}
      />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Integration Settings</Typography>
            <Typography variant="body2" color="text.secondary">
              This section will allow you to integrate your client portal with third party systems.
            </Typography>
          </Box>
        </Box>

        {/* Tabs with Link Button aligned together */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            TabIndicatorProps={{ }}
          >
            <Tab label="Financial Accounts Integration" sx={{ 
              textTransform: 'none', 
              color: activeTab === 0 ? 'black' : 'text.secondary',
              '&.Mui-selected': { fontWeight: 500 }
            }} />
            <Tab label="Email Integration" sx={{ 
              textTransform: 'none',
              color: activeTab === 1 ? 'black' : 'text.secondary',
              '&.Mui-selected': { fontWeight: 500 }
            }} />
            <Tab label="Data Room Integration" sx={{ 
              textTransform: 'none',
              color: activeTab === 2 ? 'black' : 'text.secondary',
              '&.Mui-selected': { fontWeight: 500 }
            }} />
          </Tabs>
          <Button 
            variant="contained" 
            onClick={() => handleOpenModal()}
            sx={{ 
              cursor: 'pointer',
              '&:hover': { bgcolor: '#333' },
              textTransform: 'none',
              boxShadow: 'none'
            }}
          >
            Link a new account
          </Button>
        </Box>

        {/* Main Dashboard Content */}
        {activeTab == 0 && <Box>
          {/* Stats Row */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* Chart Card */}
            <Grid  size={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography  sx={{ fontWeight: 600 }}>Imported Assets</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '24px', mb: 2 }}>${displayValue}M <Chip 
                      label={
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          +13.8%
                          <TrendingUpIcon style={{ 
                            color: '#4caf50', 
                            fontSize: '0.875rem', 
                            marginLeft: '4px' 
                          }} />
                        </span>
                      } 
                      size="small" 
                      sx={{ bgcolor: '#e8f5e9', color: '#4caf50', height: 20, fontSize: '0.75rem' }}
                    /></Typography>
                  
                  
                  {/* This is where the Highcharts component would go */}
                  <Box 
                    ref={chartRef} 
                  >
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                    />
                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Stats Cards */}
            <Grid  size={6}>
              <Grid container spacing={1} sx={{ height: '100%' }}>
                <Grid  size={6}>
                  <Card sx={{ height: '100%', bgcolor: '#e3f2fd',  padding: '20px' }}>
                    <CardContent sx={{marginBottom: 0}}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography sx={{fontWeight: 600, fontSize: '20px'}}>No. Of Accounts Linked</Typography>
                        <BankIcon color="action" />
                      </Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>05</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid  size={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f3e5f5' , padding: '20px'}}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography sx={{fontWeight: 600, fontSize: '20px'}}>No. Of Active Linked Account</Typography>
                        <CheckCircleIcon color="action" />
                      </Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>03</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid  size={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f3e5f5', padding: '20px' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography sx={{fontWeight: 600, fontSize: '20px' }}>No. Of Transactions Imported</Typography>
                        <ReceiptIcon color="action" />
                      </Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>02</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid  size={6}>
                  <Card sx={{ height: '100%', bgcolor: '#e3f2fd', padding: '20px' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography sx={{fontWeight: 600, fontSize: '20px'}}>Last Imported Date</Typography>
                        <CalendarIcon color="action" />
                      </Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>03/04/2025</Typography>
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
                      value={categoryFilter}
                      label="Category"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="depositor">Depositor</MenuItem>
                      <MenuItem value="credit">Credit</MenuItem>
                      <MenuItem value="investment">Investment</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status-select"
                      value={statusFilter}
                      label="Status"
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
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
                        <TableCell sx={{ border: "none", }}>{account.name}</TableCell>
                        <TableCell sx={{ border: "none", }}>{account.type}</TableCell>
                        <TableCell sx={{ border: "none", }}>{account.subType}</TableCell>
                        <TableCell sx={{ border: "none", }}>{account.linkedDate}</TableCell>
                        <TableCell sx={{ border: "none", }}>
                          {account.status && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={changeAmount}>
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
                        <TableCell align="right" sx={{ border: "none", }}>{account.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>}
        {activeTab == 2 && <Box sx={{ bgcolor: 'background.default', height: '100vh', p: 3 }}>
        <Paper sx={{ bgcolor: 'background.paper', p: 2 }}>
          <Typography variant="h6" component="h1" sx={{ mb: 0.5 }}>
            Storage Services
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Connect to storage services you already use to make attaching files easy.
          </Typography>

          <List>
            {/* Google Drive */}
            <ListItem sx={{ py: 1, borderBottom: '1px solid', marginBottom: '2px' }}>
              <ListItemIcon>
                
                <GoogleIcon/>
              </ListItemIcon>
              <ListItemText primary="Google Drive" />
              <GoogleDrivePicker></GoogleDrivePicker>
            </ListItem>

            {/* OneDrive for Business */}
            <ListItem sx={{ py: 1, borderBottom: '1px solid' }}>
              <ListItemIcon>
                <CloudIcon/>
              </ListItemIcon>
              <ListItemText 
                primary="One Drive for Business" 
                secondary="Linked as Hamza.Benyoussef@invictus.ai"
                secondaryTypographyProps={{ color: 'text.secondary' }}
              />
                <Button 
                  variant="contained" 
                  onClick={() => handleOpenModal()}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#333' },
                    textTransform: 'none',
                    boxShadow: 'none'
                  }}
                >
                  Link account
                </Button>
            </ListItem>

            {/* Dropbox */}
            <ListItem sx={{ py: 1 }}>
              <ListItemIcon>
                <InsertDriveFileIcon/>
              </ListItemIcon>
              <ListItemText primary="Drop Box" />
                <Button 
                  variant="contained" 
                  onClick={() => handleOpenModal()}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#333' },
                    textTransform: 'none',
                    boxShadow: 'none'
                  }}
                >
                  Link account
                </Button>
            </ListItem>
          </List>
        </Paper>
      </Box>}
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
};

export default FinancialIntegrationDashboard;