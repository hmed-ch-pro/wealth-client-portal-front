/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  styled,

} from '@mui/material';

import MessageIcon from '@mui/icons-material/Message';
import EmailIcon from '@mui/icons-material/Email';
import BlockIcon from '@mui/icons-material/Block';

interface TwoFactorAuthModalProps {
  onSelect: (securityMetod: SecurityMethod) => void;
  handleNext: () => void;
  handleBack: () => void;
}

type SecurityMethod = 'app' | 'sms' | 'email';


const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'white':'black', 
  color: theme.palette.mode === 'dark'? 'black':'white',
  borderColor: theme.palette.mode === 'dark'? 'black':'white',
  maxWidth: '10rem',
  width: '100%',
  margin: '0 10%',
  borderRadius: 8, 
  padding: theme.spacing(1, 0),
  textTransform: 'none',
}));


const SecondaryButton =  styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'black':'white', 
  color: theme.palette.mode === 'dark'? 'white':'black',
  border: 'solid 1px',
  borderColor: 'black',
  maxWidth: '10rem',
  width: '100%',
  margin: '0 10%',
  borderRadius: 8, 
  padding: theme.spacing(1, 0),
  textTransform: 'none',
}));



const StepHeaderTypo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  marginBottom: '1em',
  fontSize: '20px',
  lineHeight: '20px'
}))

const StepLabelTypo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  marginBottom: '2em',
  fontSize: '15px',
  lineHeight: '20px'
}))

const TwoFactorAuthMethodStep: React.FC<TwoFactorAuthModalProps> = ({ 
    onSelect,
    handleBack,
    handleNext
}) => {
  const [selectedMethod, setSelectedMethod] = useState<SecurityMethod>('sms');
  
  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value as SecurityMethod);
    onSelect(event.target.value as SecurityMethod)
  };
  


  return (
    <>
    <StepHeaderTypo align='center' sx={{ mb: 2, fontWeight: 'bold' }}>
        Setup Your 2 Factor of Authentication
    </StepHeaderTypo>
    <StepLabelTypo align='center'  sx={{ mb: 4 }}>
        To complete your Security Settings, choose your authentication method.
    </StepLabelTypo>
    
    <StepLabelTypo align='center'  sx={{ mb: 2, fontWeight: 600 }}>
        Select your preferred authentication method
    </StepLabelTypo>
    
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <RadioGroup
        aria-label="security-method"
        name="security-method"
        value={selectedMethod}
        onChange={handleMethodChange}
      >                
        <Box 
          sx={{ 
            border: '1px solid #333', 
            borderRadius: 1,
            mb: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              <MessageIcon sx={{marginRight: 1, fontSize: 17}}></MessageIcon>
                Text Message
              <Box component="span" sx={{ ml: 2, color: '#4caf50', fontSize: '0.8rem' }}>
                Recommended
              </Box>
            </Typography>
            <Typography variant="body2">
              We'll send a code to the number you choose.
            </Typography>
          </Box>
          <FormControlLabel 
            value="sms" 
            control={<Radio />} 
            label="" 
            sx={{ m: 0 }}
          />
        </Box>


        <Box 
          sx={{ 
            border: '1px solid #333', 
            borderRadius: 1,
            mb: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              <EmailIcon sx={{marginRight: 1, fontSize: 17}}></EmailIcon>
              Email
            </Typography>
            <Typography variant="body2">
                We'll send a code to your email.
            </Typography>
          </Box>
          <FormControlLabel 
            value="email" 
            control={<Radio />} 
            label="" 
            sx={{ m: 0 }}
          />
        </Box>
        
        <Box 
          sx={{ 
            border: '1px solid #333', 
            borderRadius: 1,
            mb: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              <BlockIcon sx={{marginRight: 1, fontSize: 17}}></BlockIcon>
              Skip Second Factor Authentication
            </Typography>
            <Typography variant="body2">
              You can always setup Second Factor Authentication Later
            </Typography>
          </Box>
          <FormControlLabel 
            value="skip" 
            control={<Radio />} 
            label="" 
            sx={{ m: 0 }}
          />
        </Box>

        
      </RadioGroup>
    </FormControl>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <SecondaryButton 
              onClick={handleBack}
          >
              Previous
          </SecondaryButton>
          <PrimaryButton  
              onClick={handleNext}
          >
              Next
          </PrimaryButton>
      </Box>
  </>
  );
};

export default TwoFactorAuthMethodStep;