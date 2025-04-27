import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import Setting from '../pages/Setting';
import Dashboard from '../pages/Dashboard';
import OnboardingPage from '../pages/OnBoardingPage';
import FinancialIntegrationDashboard from '../pages/FinancialIntegrationDashboard';
import AccountsPage from '../pages/AccountsPage';
import InvestmentDashboard from '../pages/IlliquidAccountsPage';
import InvestmentAccountPage from '../pages/InvestmentAccountDetails';
import AccountTransactions from '../pages/AccountTransactions';

const NAVIGATION: Navigation = [
  
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon/>,
  },
];



const SuccessSlider = styled(ThemeSwitcher)(() => ({

  color: 'white',
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      color: `white`,
    },
    '&.Mui-active': {
      color: `white`,
    },
  },
}));


function ToolbarActionsSearch(mode: string, toggleMode: React.MouseEventHandler<HTMLButtonElement> | undefined) {
  return (
    <Stack direction="row">
      <IconButton color="inherit" onClick={toggleMode}>
              {mode === 'dark' ? < LightModeIcon/> : <BedtimeIcon /> }
      </IconButton>
      <SuccessSlider  />
    </Stack>  
  );
}

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK6lqZS493h8S9R6r6AddiJwevr15EG-XE5Q&s' alt="User Logo" sx={{ width: 40, height: 40, marginRight: 2 }} />

      <Typography variant="h6">Ahmed CHAOUCH</Typography>
    </Stack>
  );
}


function PortalLayout() {

  const router = useDemoRouter('/dashboard');
  const [mode, setMode] = React.useState<'light' | 'dark'>(localStorage.getItem('themeMode') as 'light' | 'dark' || 'light');
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = React.useMemo(() =>
    createTheme({
      typography: {
        fontSize: 14,  // 1rem = 16px
        allVariants: {
          margin: 0,  // Removes margin globally
        },
      },
      palette: {
        mode,
        secondary: {
          main: '#ffffff',
          light: '#141313',
          dark: '#ffffff'
        }, 
        primary: {
          main: mode === 'dark' ? '#ffffff' : '#1e1c1c',
          light: '#101010',
          dark: '#ffffff'
        },
        background: {
          default: mode === 'dark' ?  'rgba(28, 28, 28, 1)': 'rgba(247, 249, 251, 1)',
          paper: mode === 'dark' ?  'rgba(40, 40, 40, 1)': '#ffffff',

        },
      },
    }),
    [mode]
  );


  return (
        <AppProvider
          navigation={NAVIGATION}
          router={router}
          theme={theme}
        >
          <DashboardLayout sx={{
        '& .MuiAppBar-root': {
          backgroundColor: theme.palette.mode === 'dark' ?  'rgba(28, 28, 28, 1)': '#ffffff' , // Custom header background color
        },
        '& .MuiDrawer-paper': {
          backgroundColor: theme.palette.mode === 'dark' ?  'rgba(28, 28, 28, 1)': '#ffffff' , // Custom menu (sidebar) background color
        },
      }} slots={{
              appTitle: CustomAppTitle,
              toolbarActions: () => ToolbarActionsSearch(mode, toggleMode),
            }} defaultSidebarCollapsed>
              <Router>
                <Routes>
                  <Route path="/settings" element={<Setting />} />
                  <Route path="/illiquidAccounts" element={<InvestmentDashboard />} />
                  <Route path="/illiquidAccounts/:accountId/securities" element={<InvestmentDashboard />} />
                  <Route path="/illiquidAccounts/:accountId/securities/:securityId" element={<AccountTransactions />} />


                  <Route path="/accounts" element={<AccountsPage />} />
                  <Route path="/accounts/:accountId" element={<AccountsPage />} />
                  <Route path="/accounts/:accountId/securities/:securityId" element={<AccountTransactions />} />

                  <Route path="/accounts/:accountId/transactions" element={<AccountsPage />} />


                  <Route path="/accountPage" element={<InvestmentAccountPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/integration" element={<FinancialIntegrationDashboard />} />
                </Routes>
            </Router>
          </DashboardLayout>
        </AppProvider>
  );
}

export default PortalLayout;
