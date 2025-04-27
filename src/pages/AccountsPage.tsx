/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Typography, TextField, InputAdornment, 
  IconButton, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Grid, Box,
  Button,
  styled,
  alpha,
  Tabs,
  Tab,
  ButtonGroup,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ViewList as ViewListIcon, 
  ViewModule as ViewModuleIcon,
  FilterList as FilterListIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  DonutLarge as DonutLargeIcon,
  Savings as SavingsIcon,
  GridView,
  ViewList,
} from '@mui/icons-material';
import AccountCard from '../components/AccountCard';
import { generatePath, useNavigate } from 'react-router-dom';


// Define TypeScript interfaces
interface Account {
  id: number;
  name: string;
  number: string;
  type: "Checking" | "Savings" | "Brokerage" | "Retirement";
  currency: string;
  balance: number;
}


const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  color:  alpha(theme.palette.primary.main, 0.4),
  letterSpacing: "0%",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Typography
  fontFamily: "'Inter', sans-serif",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on",
  border: 'none',
}));


const StyledTableCellTypo = styled(Typography)(({ theme }) => ({
  // Typography
  fontFamily: "'Inter', sans-serif",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on",
}));


const StyledHeaderType = styled(Typography)(({ theme }) => ({

  // Typography
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '20px',
}));


const createStyledIcon = (IconComponent: any) => {
  return styled(IconComponent)(({ theme }) => ({
    width: '12px',
    height: '12px',
  }));
};


const StyledFilterButton = styled(Button)(({ theme }) => ({
  // Box sizing
  boxSizing: "border-box",

  // Flexbox layout
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",

 
  // Border and border-radius
  border: "0.5px solid", // White border
  borderRadius: "5px", // Rounded corners

  // Optional: Text style as per Figma
  fontFamily: "'Inter', sans-serif",
  fontWeight: 300,
  fontSize: "12px",
  lineHeight: "18px",
  fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on",
}));


const StyledSearchTextField = styled(TextField)(({ theme }) => ({
  // Flexbox layout for inner elements
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 8px',
  background: alpha(theme.palette.primary.main, 0.1), // Semi-transparent background
  borderRadius: '5px',
  width: '325px',
  
  // Typography (as per Figma design)
  '& .MuiOutlinedInput-root': {
    width: '100%',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    padding: 0,
    lineHeight: '20px',
    fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on",
  },

  // Optional: Adjust the border of the input field (default is `outlined` style)
  '& fieldset': {
    border: 'none',
  },

  // Icon styling
  '& .MuiInputAdornment-root': {
    '& svg': {
      color: alpha(theme.palette.primary.main, 0.4)
    },
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const StyledTabTypo = styled(Typography)(({ theme }) => ({
    // Typography for sub-header/description
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    color: alpha(theme.palette.text.primary, 0.6),
  }));

  const StyledTab = styled(Tab)(({ theme }) => ({
    minWidth: 'auto',
    padding: '4px 10px',
    textTransform: 'none',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '14px',
  }));


const AccountsPage: React.FC = () => {
  // Sample data based on images provided
  const accounts: Account[] = [
    { id: 1, name: "John Doe", number: "*****56789", type: "Checking", currency: "USD", balance: 500.00 },
    { id: 2, name: "James Smith", number: "****12345", type: "Checking", currency: "USD", balance: 50.00 },
    { id: 3, name: "Michael Williams", number: "****67890", type: "Savings", currency: "USD", balance: 200.00 },
    { id: 4, name: "John Smith", number: "****12345", type: "Brokerage", currency: "USD", balance: 300.00 },
    { id: 5, name: "David Miller", number: "****23456", type: "Retirement", currency: "USD", balance: 30.00 }
  ];

  const [viewMode, setViewMode] = useState<"list" | "card">("card");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [tabValue, setTabValue] = useState<number>(1); // Default to 6M tab (index 1)
  const navigate = useNavigate();



  const filteredAccounts: Account[] = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.number.includes(searchTerm)
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getIconForAccountType = (type: Account['type']) => {
          switch(type) {
            case "Checking": {
              const StyledAccountBalanceIcon = createStyledIcon(AccountBalanceIcon);
              return <StyledAccountBalanceIcon />;
            }
            case "Savings": {
              const StyledSavingsIcon = createStyledIcon(SavingsIcon);
              return <StyledSavingsIcon />;
            }
            case "Brokerage": {
              const StyledTrendingUpIcon = createStyledIcon(TrendingUpIcon);
              return <StyledTrendingUpIcon />;
            }
            case "Retirement": {
              const StyledDonutLargeIcon = createStyledIcon(DonutLargeIcon);
              return <StyledDonutLargeIcon />;
            }
            default: {
              const StyledAccountBalanceIcon = createStyledIcon(AccountBalanceIcon);
              return <StyledAccountBalanceIcon />;
            }
          }
        };

  return (
      <Box sx={{ flexGrow: 1, padding: 3, minHeight: '100vh' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StyledHeaderType sx={{ cursor: 'pointer' }}>
                    Investment Accounts
                    </StyledHeaderType>
                </Box>      
                <Tabs
                    value={tabValue} 
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    >
                    <StyledTab label="1M" />
                    <StyledTab label="6M" />
                    <StyledTab label="YTD" />
                    <StyledTab label="1Y" />
                    <StyledTab label="5Y" />
                    <StyledTab label="Custom" />
                </Tabs>
            </Box>
        
        {/* Description line - only for investment accounts */}
          <StyledTabTypo>
            Placeholder for the descriptions
          </StyledTabTypo>
        
        
        {/* Search and view toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <StyledFilterButton>
            <FilterListIcon />
                Filter
          </StyledFilterButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    placeholder="Search by account name, type, number..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                    ),
                    }}
                    sx={{
                    '& .MuiOutlinedInput-root': {
                        width: '331px',
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        },
                        '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.24)',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '0px',
                        fontSize: '14px',
                        fontFamily: "'Inter', sans-serif",
                    },
                    }}
                />
</Box>
            
<Box sx={{ display: 'flex', alignItems: 'center' }}>
  {/* Search field would go here */}
  
  <Box sx={{ display: 'flex', marginLeft: 1 }}>
        <ButtonGroup variant="outlined">
                    <Button 
                      variant={viewMode === 'card' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('card')}
                    >
                      <GridView />
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('list')}
                    >
                      <ViewList  />
                    </Button>
        </ButtonGroup>
  </Box>
</Box>
          </Box>
        </Box>
      </Box>
        
        {/* List View */}
        {viewMode === "list" && (
          <TableContainer component={Paper} elevation={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCellHeader>Account Name</StyledTableCellHeader>
                  <StyledTableCellHeader>Account No.</StyledTableCellHeader>
                  <StyledTableCellHeader>Account Type</StyledTableCellHeader>
                  <StyledTableCellHeader>Currency</StyledTableCellHeader>
                  <StyledTableCellHeader align="right">Total Balance</StyledTableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id} hover style={{border: 'none'}}>
                    <StyledTableCell sx={{ border: "none" }}>{account.name}</StyledTableCell>
                    <StyledTableCell sx={{ border: "none" }}>{account.number}</StyledTableCell>
                    <StyledTableCell sx={{ border: "none" }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StyledTableCellTypo>{account.type}</StyledTableCellTypo>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell sx={{ border: "none" }}>{account.currency}</StyledTableCell>
                    <StyledTableCell align="right" sx={{ border: "none" }}>
                      <StyledTableCellTypo>
                        ${account.balance.toFixed(2)}
                      </StyledTableCellTypo>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
        {/* Card View */}
        {viewMode === "card" && (
          <Grid container spacing={9}>
            {filteredAccounts.map((account) => (
                <Grid size={4} key={account.id} sx={{ 
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <AccountCard account={account} onClick={() => navigate(generatePath('/accounts/:id/securities', { id: account.id.toString() }))}/>
                </Grid>
            ))}
          </Grid>
        )}
      </Box>
  );
};

export default AccountsPage;