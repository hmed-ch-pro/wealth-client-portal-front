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
import IlliquidAccountCard from '../components/IlliquidAccountCard';


// Define TypeScript interfaces
interface IlliquidAccount {
  id: number;
  name: string;
  type: "Real Estate" | "Private Equity";
  currency: string;
  balance: number;
  investedAmout: number;
  totalCommitment: number;
  nav : string;
  distribution: string;
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


const IlliquidAccountsPage: React.FC = () => {
  // Sample data based on images provided
  const accounts: IlliquidAccount[] = [
    {
      id: 1, name: "John Doe", nav: "$395M", type: "Real Estate", currency: "USD", balance: 500.00,
      investedAmout: 20,
      totalCommitment: 100,
      distribution: '$180M'
    },
    {
      id: 2, name: "James Smith", nav: "$12M", type: "Real Estate", currency: "USD", balance: 50.00,
      investedAmout: 30,
      totalCommitment: 100,
      distribution: '$180M'
    },
    {
      id: 3, name: "Michael Williams", nav: "$399M", type: "Private Equity", currency: "USD", balance: 200.00,
      investedAmout: 60,
      totalCommitment: 200,
      distribution: '$180M'
    },
    {
      id: 4, name: "John Smith", nav: "$399M", type: "Private Equity", currency: "USD", balance: 300.00,
      investedAmout: 90,
      totalCommitment: 100,
      distribution: '$180M'
    },
    {
      id: 5, name: "David Miller", nav: "$199M", type: "Private Equity", currency: "USD", balance: 30.00,
      investedAmout: 10,
      totalCommitment: 120,
      distribution: '$180M'
    }
  ];

  const [viewMode, setViewMode] = useState<"list" | "card">("card");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [tabValue, setTabValue] = useState<number>(1); // Default to 6M tab (index 1)

  const filteredAccounts: IlliquidAccount[] = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.nav.includes(searchTerm)
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };



  return (
      <Box sx={{ flexGrow: 1, padding: 3, minHeight: '100vh' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StyledHeaderType sx={{ cursor: 'pointer' }}>
                    Illiquid Investments
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
                  <StyledTableCellHeader>Name</StyledTableCellHeader>
                  <StyledTableCellHeader>Nav.</StyledTableCellHeader>
                  <StyledTableCellHeader>Account Type</StyledTableCellHeader>
                  <StyledTableCellHeader>Distribution</StyledTableCellHeader>
                  <StyledTableCellHeader align="right">Total Balance</StyledTableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id} hover style={{border: 'none'}}>
                    <StyledTableCell sx={{ border: "none" }}>{account.name}</StyledTableCell>
                    <StyledTableCell sx={{ border: "none" }}>{account.nav}</StyledTableCell>
                    <StyledTableCell sx={{ border: "none" }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StyledTableCellTypo>{account.type}</StyledTableCellTypo>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell sx={{ border: "none" }}>{account.distribution}</StyledTableCell>
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
                    justifyContent: 'center'
                  }}>
                    <IlliquidAccountCard account={account}/>
                </Grid>
            ))}
          </Grid>
        )}
      </Box>
  );
};

export default IlliquidAccountsPage;