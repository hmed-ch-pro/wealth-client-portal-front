import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  InputAdornment, 
  FormControl, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Avatar,
  styled
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  RadioButtonUnchecked as RadioButtonUncheckedIcon 
} from '@mui/icons-material';

import EditPhoneNumberStep from '../components/EditPhoneNumberStep';
import TwoFactorAuthMethodStep from '../components/TwoFactorAuthMethodStep';


const specialCharRegex = /[!@#$%^&*()_+.]/;
const uppercaseRegex = /[A-Z]/;
const numberRegex = /\d/;

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
    fontSize: '15px',
    lineHeight: '20px'
}))

const EmailTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: 'white', 
  color: 'rgba(4, 4, 4, 0.7)',
  '& .MuiInputBase-input': {
      color: 'black',
  },
  
  '& .MuiInputBase-input::placeholder': {
      color: 'rgba(0, 0, 0, 1)', // Change to any color you want
      opacity: 1, // Override Firefox's default opacity
          },
      // For older browsers
      '& .MuiInputBase-input::-webkit-input-placeholder': {
          color: 'rgba(0, 0, 0, 1)',
          opacity: 1,
      },
      '& .MuiInputBase-input::-moz-placeholder': {
          color: 'rgba(0, 0, 0, 1)',
          opacity: 1,
      },
}));


const PasswordTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: 'white', 
    color: 'rgba(4, 4, 4, 0.7)',
    '& .MuiInputBase-input': {
        color: 'black',
    },
    
    '& .MuiInputBase-input::placeholder': {
        color: 'rgba(0, 0, 0, 1)', // Change to any color you want
        opacity: 1, // Override Firefox's default opacity
            },
        // For older browsers
        '& .MuiInputBase-input::-webkit-input-placeholder': {
            color: 'rgba(0, 0, 0, 1)',
            opacity: 1,
        },
        '& .MuiInputBase-input::-moz-placeholder': {
            color: 'rgba(0, 0, 0, 1)',
            opacity: 1,
        },
}));

function OnboardingPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
    confirmation: false,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form values
    const [email, setEmail] = useState('John@company.com');
    const [canChangeEmail, setCanChangeEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedMethod, setSelectedMethod] = useState<string>('sms');
    const [countryCode, setCountryCode] = useState<string>('+1');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
    const codeInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  
    console.log("phoneNumber", phoneNumber);

  const steps = ['Email', 'Password', 'Security', 'Success'];

useEffect(() => {
  setPasswordRequirements({
    length: password.length > 8 && password.length < 30,
    uppercase: uppercaseRegex.test(password),
    number: numberRegex.test(password),
    special: specialCharRegex.test(password),
    confirmation: password === confirmPassword
  });
}, [password, confirmPassword]);



  const handleNext = () => {
    if (activeStep === 2) {
      // Simulate saving security settings
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setActiveStep(activeStep + 1);
      }, 1500);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const handleResendOTP = (): void => {
    // In a real application, this would trigger an API call to resend the code
    
    // Clear the current verification code
    setVerificationCode(Array(6).fill(''));
    
    // Focus on the first input
    codeInputRefs.current[0]?.focus();
  };
  
  
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
    
  // Simulating the progress completion based on the step
  const getProgressValue = () => {
    return (activeStep + 1) * 100 / 6;
  };

  return (
      <Box 
        sx={{ 
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          //justifyContent: 'center',
        }}
      >
        <Box maxWidth="sm">
          <Typography 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 400, mb: 2, fontSize: '24px' }}
          >
            Welcome {'Ahmed'}, Register for
            <br />
            {'Asbitech'}'s Client Portal
          </Typography>
          
          <Box sx={{ 
            width: '100%', 
            height: 10, 
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: 5, 
            mb: 4 
          }}>
            <Box 
              sx={{ 
                width: `${getProgressValue()}%`, 
                height: '100%', 
                bgcolor: 'green', 
                borderRadius: 5 
              }} 
            />
          </Box>
          
          <Paper 
            elevation={3} 
            sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 2, 
              p: 4 
            }}
          >
            {activeStep === 0 && (
              <>
                <StepHeaderTypo
                  align="center" 
                  gutterBottom
                  >
                  Confirm or Change Your Username
                </StepHeaderTypo>
                <StepLabelTypo
                  align="center" 
                  gutterBottom
                >
                  Your email address will be your username for signing into your account.
                </StepLabelTypo>
                
                <FormControl fullWidth sx={{ mb: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Email</Typography>
                  <EmailTextField
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      readOnly: !canChangeEmail,
                    }}
                  />
                </FormControl>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Button 
                    variant="text" 
                    color="primary"
                    sx={{ textTransform: 'none' }}
                    onClick={() => setCanChangeEmail(!canChangeEmail)}
                  >
                    Change email
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <PrimaryButton 
                    onClick={handleNext}
                  >
                    Next
                  </PrimaryButton>
                </Box>
              </>
            )}
            
            {activeStep === 1 && (
              <>
                <StepHeaderTypo 
                    align="center" 
                    gutterBottom
                >
                  Create Your Password
                </StepHeaderTypo>
                <StepLabelTypo 
                  align="center" 
                  gutterBottom
                >
                  Enter your new password for username {email}, following guidelines below.
                </StepLabelTypo>
                
                <FormControl fullWidth sx={{ mb: 2}}>
                  <Typography sx={{fontWeight: 600, mb: 1, fontSize: '15px' }}>New Password</Typography>
                  <PasswordTextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            sx={{ textTransform: 'none', color: 'black', textDecoration: 'underline'}}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <Typography sx={{fontWeight: 600, mb: 1, fontSize: '15px' }}>Enter New Password Again</Typography>
                  <PasswordTextField
                    variant="outlined"
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            sx={{ textTransform: 'none', color: 'black', textDecoration: 'underline'}}
                          >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                
                <Typography sx={{fontWeight: 600, fontSize: '14px' }}>Password must contain:</Typography>
                <List dense sx={{ mb: 3 }}>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 26 }}>
                      {passwordRequirements.length ? 
                        <CheckCircleIcon  sx={{color: 'green' }} fontSize="small" /> : 
                        <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                      }
                    </ListItemIcon>
                    <ListItemText  primaryTypographyProps={{ 
                            fontSize: '0.8rem', // or any size you need
                        }}  primary="8 to 30 characters" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 26 }}>
                      {passwordRequirements.uppercase ? 
                        <CheckCircleIcon sx={{color: 'green' }} fontSize="small" /> : 
                        <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                      }
                    </ListItemIcon>
                    <ListItemText  primaryTypographyProps={{ 
                            fontSize: '0.8rem', // or any size you need
                        }} primary="Uppercase and lower case letters" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 26 }}>
                      {passwordRequirements.number ? 
                        <CheckCircleIcon sx={{color: 'green' }} fontSize="small" /> : 
                        <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                      }
                    </ListItemIcon>
                    <ListItemText  primaryTypographyProps={{ 
                            fontSize: '0.8rem', // or any size you need
                        }} primary="At least 1 number" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 26 }}>
                      {passwordRequirements.special ? 
                        <CheckCircleIcon sx={{color: 'green' }} fontSize="small" /> : 
                        <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                      }
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ 
                            fontSize: '0.8rem', // or any size you need
                        }} primary='At least 1 special characters \"!@#$%^&*()_+\"' />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 26 }}>
                      {password === confirmPassword ? 
                        <CheckCircleIcon sx={{color: 'green' }} fontSize="small" /> : 
                        <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                      }
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ 
                            fontSize: '0.8rem', // or any size you need
                        }} primary='Confirm password' />
                  </ListItem>
                </List>
                
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
            )}

            {activeStep === 3 && ( <TwoFactorAuthMethodStep onSelect={setSelectedMethod} handleNext={handleNext} 
                  handleBack={handleBack}></TwoFactorAuthMethodStep>)}
            
            {activeStep === 4 && (
              <>
                <StepHeaderTypo 
                    align="center" 
                    gutterBottom
                >
                    Enter confirmation code
                </StepHeaderTypo>
                <StepLabelTypo
                    align="center"
                    gutterBottom>
                    Enter the 6-digit code we sent to {selectedMethod === 'sms' ? `${countryCode}****${phoneNumber.slice(-2)}` : 'your email'}.
                </StepLabelTypo>
                <StepLabelTypo 
                    align="center"
                    gutterBottom>
                    It may take up to a minute for you to receive this code.
                </StepLabelTypo>
                
                <Box  sx={{ display: 'flex', justifyContent: 'space-between', m: 4 }}>
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
                            fontSize: '16px'
                        }
                        }}
                        sx={{
                        margin: 1,
                        width: '58px',
                       
                        borderRadius: 1,
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-root': {
                            color: 'black',
                            '& fieldset': {
                            color: 'black',
                            //borderColor: '#333',
                            borderRadius: 1,
                            },
                            '&:hover fieldset': {
                            //borderColor: '#555',
                            },
                            '&.Mui-focused fieldset': {
                            borderColor: '#333',

                            }
                        }
                        }}
                    />
                    ))}
                </Box>
                
                <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <Typography align="center" variant="body2" sx={{ mb: 1 }}>
                        Don't receive the OTP?
                    </Typography>
                    <Button 
                        
                        variant="text" 
                        onClick={handleResendOTP}
                        sx={{ 
                        p: 0, 
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
                </Box>
                
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
            )}

            {activeStep === 2 && (
              <EditPhoneNumberStep userPhone={{
                          countryCode,
                          phoneNumber
                      }} onChange={(item) => {setCountryCode(item.countryCode); setPhoneNumber(item.phoneNumber)} } handleNext={handleNext} handleBack={handleBack }></EditPhoneNumberStep>
            )}
            
            {activeStep === 5 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 64, 
                      height: 64 
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                </Box>
                
                <Typography 
                  variant="h5" 
                  component="h2" 
                  align="center" 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  Success!
                </Typography>
                
                <Typography 
                  variant="h6" 
                  align="center" 
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  Your Security Setting have been Saved
                </Typography>
                
                <Typography 
                  variant="body1" 
                  align="center" 
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Your security settings have been saved for user ID, password and for
                  receiving authentication codes to your mobile phone number.
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {}}
                    sx={{ 
                      minWidth: 180, 
                      borderRadius: 8, 
                      py: 1, 
                      textTransform: 'none',
                    }}
                  >
                    Continue to Login
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
  );
}

export default OnboardingPage;