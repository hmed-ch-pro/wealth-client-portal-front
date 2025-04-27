/* eslint-disable @typescript-eslint/no-unused-vars */

import { 
    Typography, Card, CardContent, Grid, Box,
    styled,
    Chip,
    LinearProgress,
  } from '@mui/material';
  import TrendingUpIcon from '@mui/icons-material/TrendingUp';
  
  
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
  
  interface AccountCardProps  {
      account: IlliquidAccount;
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
  
    
  
  const IlliquidAccountCard: React.FC<AccountCardProps>  = ({account}) => {
  
        const getImgSource = (type: IlliquidAccount['type']) => {
          switch(type) {
            case "Private Equity": {
              return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKfHzkQVEUhXiB7hq52BKJy_X1qcv2lRCBg&s";
            }
            default: {
              return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKfHzkQVEUhXiB7hq52BKJy_X1qcv2lRCBg&s";
            }
          }
        };
        
        
       
  
      return (
          <Card sx={{ borderRadius: 3, boxShadow: 5, position: 'relative', overflow: 'visible' }}>
                      <CardContent >
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                              <Box>
                                  <StyledCardH1>Total Value</StyledCardH1>
                                  <StyledTypographyCardBalance>  ${account.balance.toFixed(2)} <Chip 
                        label={
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            3X
                            <TrendingUpIcon style={{ 
                              color: '#4caf50', 
                              fontSize: '0.875rem', 
                              marginLeft: '4px' 
                            }} />
                          </span>
                        } 
                        size="small" 
                        sx={{ bgcolor: '#e8f5e9', borderRadius: '6px', padding: '2px', color: '#4caf50', height: 20, fontSize: '0.75rem' }}
                      /><Chip  sx={{ marginLeft: 2, bgcolor: 'rgba(97, 156, 240, 1)', color: 'white'}} label="Committed" size="small" color="primary" /></StyledTypographyCardBalance>
                                  
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
                          
  
                          <Grid  container spacing={2} mt={1}>
                              <Grid size={6}>
                                  <StyledCardH2>Name</StyledCardH2>
                                  <StyledCardValue>{account.name}</StyledCardValue>
                              </Grid>
                              <Grid size={6} sx={{ textAlign: 'right' }}>
                                  <StyledCardH2>Nav</StyledCardH2>
                                  <StyledCardValue>{account.nav}</StyledCardValue>
                              </Grid>
                              <Grid size={6}>
                                  <StyledCardH2>Type</StyledCardH2>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <StyledCardValue>{account.type}</StyledCardValue>
                                  </Box>
                              </Grid>
                              <Grid size={6} sx={{ textAlign: 'right' }}>
                                  <StyledCardH2>Distribution</StyledCardH2>
                                  <StyledCardValue>{account.distribution}</StyledCardValue>
                              </Grid>
                          </Grid>
  
                          <Box mb={0} mt={2}>
                            <StyledCardH2>Invested Amount</StyledCardH2>
                            <LinearProgress
                              variant="determinate" 
                              value={account.investedAmout/account.totalCommitment * 100}
                              sx={{ 
                                mt: 1, 
                                mb: 1, 
                                height: 4, 
                                borderRadius: 1,
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: 'rgb(46, 204, 113)'
                                }
                              }}
                            />
                            <Box display="flex" justifyContent="space-between">
                              <StyledCardValue>${account.investedAmout}M / ${account.totalCommitment}M <span style={{fontWeight: '600'}}>Total Commitments</span></StyledCardValue>
                            </Box>
                          </Box>
                      </CardContent>
              </Card>
      )
  }
  
  
  export default IlliquidAccountCard;