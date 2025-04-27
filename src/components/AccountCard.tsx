/* eslint-disable @typescript-eslint/no-unused-vars */

import { 
  Typography, Card, CardContent, Grid, Box,
  styled,
  Chip,
  LinearProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


interface Account {
  id: number;
  name: string;
  number: string;
  type: "Checking" | "Savings" | "Brokerage" | "Retirement";
  currency: string;
  balance: number;
}

interface AccountCardProps  {
    account: Account;
    onClick?: () => void;
}


const StyledCardH1 =  styled(Typography)(({ theme }) => ({
    fontFamily: 'Inter, sans-serif',
    marginBottom: 4,
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0%',
  }));

const StyledCardH2 =  styled(Typography)(({ theme }) => ({
    fontFamily: 'Inter, sans-serif',
    marginBottom: 4,
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0%',
  }));

const StyledCardValue =  styled(Typography)(({ theme }) => ({
    fontFamily: 'Inter, sans-serif',
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0%',
  }));

const StyledTypographyCardBalance = styled(Typography)(({ theme }) => ({
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
    letterSpacing: '0%',
  }));

  

const AccountCard: React.FC<AccountCardProps>  = ({account, onClick}) => {

      const getImgSource = (type: Account['type']) => {
        switch(type) {
          case "Checking": {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKfHzkQVEUhXiB7hq52BKJy_X1qcv2lRCBg&s";
          }
          case "Savings": {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKfHzkQVEUhXiB7hq52BKJy_X1qcv2lRCBg&s";
          }
          case "Brokerage": {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKfHzkQVEUhXiB7hq52BKJy_X1qcv2lRCBg&s";
          }
          case "Retirement": {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKfHzkQVEUhXiB7hq52BKJy_X1qcv2lRCBg&s";
          }
          default: {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKfHzkQVEUhXiB7hq52BKJy_X1qcv2lRCBg&s";
          }
        }
      };
      
      
     

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 5, position: 'relative'}} onClick={onClick}>
                    <CardContent >
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                            <Box>
                                <StyledCardH1>Total Balance</StyledCardH1>
                                <StyledTypographyCardBalance>  ${account.balance.toFixed(2)} <Chip 
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
                      sx={{ bgcolor: '#e8f5e9', borderRadius: '6px', padding: '2px', color: '#4caf50', height: 20, fontSize: '0.75rem' }}
                    /></StyledTypographyCardBalance>
                                
                            </Box>
                            <img
                                    src={getImgSource(account.type)}
                                    alt="Styled"
                                    style={{
                                    textAlign: "center",
                                    width: "30px", // scale the image
                                    height: "auto",
                                    opacity: 0.8, // 40% opacity
                                    transform: "scale(1.2)", // optional extra scale
                                    }}
                                />
                        </Box>
                        

                        <Grid  container spacing={2} mt={2}>
                            <Grid size={6}>
                                <StyledCardH2>Account Name</StyledCardH2>
                                <StyledCardValue>{account.name}</StyledCardValue>
                            </Grid>
                            <Grid size={6} sx={{ textAlign: 'right' }}>
                                <StyledCardH2>Account Number</StyledCardH2>
                                <StyledCardValue>{account.number}</StyledCardValue>
                            </Grid>
                            <Grid size={6}>
                                <StyledCardH2>Account Type</StyledCardH2>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <StyledCardValue>{account.type}</StyledCardValue>
                                </Box>
                            </Grid>
                            <Grid size={6} sx={{ textAlign: 'right' }}>
                                <StyledCardH2>Currency</StyledCardH2>
                                <StyledCardValue>{account.currency}</StyledCardValue>
                            </Grid>
                        </Grid>
                    </CardContent>
            </Card>
    )
}


export default AccountCard;