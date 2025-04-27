/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { usePlaidLink } from 'react-plaid-link';

// Types
interface PlaidLinkModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (publicToken: string, metadata: any) => void;
}

type AccountCategory = 
  | 'Depository' 
  | 'Credit' 
  | 'Investment' 
  | 'Cryptocurrency' 
  | 'Houses & Car' 
  | 'Other';

// Custom styled components to match the design
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    maxWidth: 620,
    width: '100%',
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  }
}));

const CategoryCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(2.5),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.grey[50],
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  boxShadow: 'none',
  border: `1px solid ${theme.palette.grey[200]}`,
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  '& svg': {
    fontSize: 30,
    color: theme.palette.grey[700],
  }
}));

const StepIndicator = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  height: 6,
  borderRadius: 3,
  flex: 1,
  backgroundColor: active ? '#4CAF50' : theme.palette.grey[300],
  margin: '0 2px',
}));

const CategoryTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.2,
});

const CategoryDescription = styled(Typography)({
  fontSize: '0.85rem',
  color: '#666',
});

// Main component
const FinancialIntegrationModal: React.FC<PlaidLinkModalProps> = ({ open, onClose, onSuccess }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<AccountCategory | null>(null);
  const [linkToken, setLinkToken] = useState<string | null>(null);

  // This would be called after selecting a category to get the Plaid Link token
  const fetchLinkToken = async (category: AccountCategory) => {
    try {
        
        console.log("fetchToken", category);

        setLinkToken("link-sandbox-812ffff3-ab1b-432a-924d-7c54e9faf500")

    } catch (error) {
      console.error('Error fetching link token:', error);
    }
  };

  const { open: openPlaidLink } = usePlaidLink({
    token: linkToken || '',
    onSuccess: (public_token, metadata) => {
      onSuccess(public_token, metadata);
      resetState();
      onClose();
    },
    onExit: () => {
      resetState();
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
          (plaidLinkIframe as HTMLElement).style.maxHeight = '640px';
          (plaidLinkIframe as HTMLElement).style.maxWidth = '360px';
          (plaidLinkIframe as HTMLElement).style.borderRadius = '4px';
        }
        
        if (plaidLinkOverlay) {
          (plaidLinkOverlay as HTMLElement).style.backgroundColor = 'transparent';
          (plaidLinkOverlay as HTMLElement).style.pointerEvents = 'none';
        }
      }
    
    // Important style configurations to make it fit within modal
    
  });

  React.useEffect(() => {
    if (linkToken != null) {
        console.log(linkToken);
        openPlaidLink();
    }
  }, [linkToken, openPlaidLink]);

  const resetState = () => {
    setActiveStep(0);
    setSelectedCategory(null);
    setLinkToken(null);
  };

  const handleCategorySelect = (category: AccountCategory) => {
    setSelectedCategory(category);
    fetchLinkToken(category);
  };

  // Open Plaid Link when token is available
  React.useEffect(() => {
    if (linkToken && activeStep === 1) {
      openPlaidLink();
    }
  }, [linkToken, activeStep, openPlaidLink]);

  const categories = [
    {
      id: 'Depository',
      title: 'Depository',
      description: 'Depository Accounts (Cash Holding)',
      icon: <AccountBalanceIcon />,
    },
    {
      id: 'Credit',
      title: 'Credit',
      description: 'Credit card or Revolving Credit',
      icon: <CreditCardIcon />,
    },
    {
      id: 'Investment',
      title: 'Investment',
      description: 'Investment/Brokerage accounts',
      icon: <ShowChartIcon />,
    },
    {
      id: 'Cryptocurrency',
      title: 'Cryptocurrency',
      description: 'Invest in digital currencies',
      icon: <CurrencyBitcoinIcon />,
    },
    {
      id: 'Houses & Car',
      title: 'Houses & Car',
      description: 'Lorem Ipsum',
      icon: <HomeIcon />,
    },
    {
      id: 'Other',
      title: 'Other',
      description: 'Other',
      icon: <MoreHorizIcon />,
    },
  ];

  const steps = ['Select Category', 'Connect Account', 'Verify', 'Complete'];

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="plaid-link-dialog-title"
    >
      <Box position="relative">
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {/* Title */}
        <DialogTitle sx={{ textAlign: 'center', pt: 3, pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Link New Account
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" fontSize="0.8rem">
            Select Category
          </Typography>
        </DialogTitle>
        
        {/* Step indicator */}
        <Box sx={{ display: 'flex', px: 6, py: 2, gap: 1 }}>
          {steps.map((_, index) => (
            <StepIndicator key={index} active={index === activeStep} />
          ))}
        </Box>
        
        <DialogContent sx={{ px: 3, py: 2 }}>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            {categories.map((category) => (
              <Grid size={6} key={category.id}>
                <CategoryCard onClick={() => handleCategorySelect(category.id as AccountCategory)}>
                  <Box>
                    <CategoryTitle variant="subtitle1">
                      {category.title}
                    </CategoryTitle>
                    <CategoryDescription variant="body2">
                      {category.description}
                    </CategoryDescription>
                  </Box>
                  <IconContainer>
                    {category.icon}
                  </IconContainer>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Box>
    </StyledDialog>
  );
};

export default FinancialIntegrationModal;