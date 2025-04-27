import React, { useState, useRef } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TwoFactorAuthMethodStep from './TwoFactorAuthMethodStep';
import EditPhoneNumberStep from './EditPhoneNumberStep';

interface TwoFactorAuthModalProps {
  open: boolean;
  onClose: () => void;
  userName?: string;
  orgName?: string;
}

type SecurityMethod = 'app' | 'sms' | 'email';

const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({ 
  open, 
  onClose, 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedMethod, setSelectedMethod] = useState<SecurityMethod>('app');
  const [countryCode, setCountryCode] = useState<string>('+1');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Move to next input if value is entered
      if (value !== '' && index < 5) {
        codeInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    // Move to previous input on backspace if current input is empty
    if (event.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = (): void => {
    if (currentStep === 2 && selectedMethod === 'sms') {
      // Show phone number input screen
      setCurrentStep(4);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = (): void => {
    if (currentStep === 4) {
      // Go back to method selection from phone input
      setCurrentStep(2);
    } else if (currentStep === 3) {
      // Go back to method selection or phone input based on method
      setCurrentStep(selectedMethod === 'sms' ? 4 : 2);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResendOTP = (): void => {
    // In a real application, this would trigger an API call to resend the code
    console.log('Resending OTP');
    
    // Clear the current verification code
    setVerificationCode(Array(6).fill(''));
    
    // Focus on the first input
    codeInputRefs.current[0]?.focus();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#1e1e1e',
    color: 'white',
    borderRadius: 2,
    p: 4,
    outline: 'none',
  };

  const buttonStyle = {
    textTransform: 'none',
    py: 1.5,
    borderRadius: 1,
  };

  const renderStep = () => {
    switch (currentStep) {  
      case 1: // Choose Method
        return (
          <TwoFactorAuthMethodStep onSelect={setSelectedMethod} handleNext={handleNext} handleBack={handleBack} ></TwoFactorAuthMethodStep>
        );

      case 2: // Enter Verification Code
        return (
          <>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Enter confirmation code
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Enter the 6-digit code we sent to {selectedMethod === 'sms' ? `+${countryCode}******${phoneNumber.slice(-2)}` : 'your email'}.
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: '#aaa' }}>
              It may take up to a minute for you to receive this code.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (codeInputRefs.current[index] = el)}
                  variant="outlined"
                  value={verificationCode[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputProps={{
                    maxLength: 1,
                    style: { 
                      textAlign: 'center',
                      padding: '14px',
                      color: 'white',
                      fontSize: '16px'
                    }
                  }}
                  sx={{
                    width: '58px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#333',
                        borderRadius: 1,
                      },
                      '&:hover fieldset': {
                        borderColor: '#555',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      }
                    }
                  }}
                />
              ))}
            </Box>
            
            <Typography variant="body2" sx={{ mb: 1 }}>
              Don't receive the OTP?
            </Typography>
            <Button 
              variant="text" 
              onClick={handleResendOTP}
              sx={{ 
                p: 0, 
                mb: 6, 
                textTransform: 'none',
                color: '#90caf9',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Resend OTP
            </Button>
            
            <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                onClick={handleBack}
                sx={{ 
                  ...buttonStyle,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                  },
                  flex: 1
                }}
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNext}
                disabled={verificationCode.some(digit => digit === '')}
                sx={{ 
                  ...buttonStyle,
                  bgcolor: 'white',
                  color: 'black',
                  '&:hover': {
                    bgcolor: '#e0e0e0',
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#555',
                    color: '#aaa'
                  },
                  flex: 1
                }}
              >
                Next
              </Button>
            </Stack>
          </>
        );

      case 3: // Add Phone Number
        return (
          <EditPhoneNumberStep userPhone={{
            countryCode,
            phoneNumber
          }} onChange={({countryCode, phoneNumber}) => {
              setCountryCode(countryCode);
              setPhoneNumber(phoneNumber);

          }} handleNext={handleNext} handleBack={handleBack}></EditPhoneNumberStep>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="two-factor-auth-modal"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>

        {renderStep()}
      </Box>
    </Modal>
  );
};

export default TwoFactorAuthModal;