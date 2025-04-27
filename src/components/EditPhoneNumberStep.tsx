import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  FormControl,
  MenuItem,
  TextField,
  Select,
  SelectChangeEvent,
  styled,
  Box

} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { color } from 'highcharts';


interface TwoFactorAuthModalProps {
  userPhone: {countryCode: string, phoneNumber: string},
  onChange: (userPhone: {countryCode: string, phoneNumber: string}) => void;
  handleNext: () => void;
  handleBack: () => void;
}

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
    '&.Mui-disabled': {
        color: theme.palette.mode === 'dark'? 'black':'white',
        backgroundColor: 'grey'
    },
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

const InputTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: 'white', 
    color: 'rgba(4, 4, 4, 0.7)',
    '& .MuiInputBase-input': {
        color: 'black',
    },
    
    '& .MuiInputBase-input::placeholder': {
        color: 'rgba(0, 0, 0, 1)', // Change to any color you want
            },
        // For older browsers
        '& .MuiInputBase-input::-webkit-input-placeholder': {
            color: 'rgba(0, 0, 0, 1)',
        },
        '& .MuiInputBase-input::-moz-placeholder': {
            color: 'rgba(0, 0, 0, 1)',
        },
}));

function isValidPhoneNumber(phone: string): boolean {
    const onlyDigits = /^\d+$/;
    return phone === '' || (onlyDigits.test(phone) && phone.length <= 20);
  }

const EditPhoneNumberStep: React.FC<TwoFactorAuthModalProps> = ({ 
    userPhone,
    onChange,
    handleBack,
    handleNext
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(userPhone.phoneNumber);
  const [countryCode, setContryCode] = useState<string>(userPhone.countryCode);



  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidPhoneNumber(event.target.value as string)) return;
    setPhoneNumber(event.target.value as string);
    onChange({...userPhone, phoneNumber: event.target.value as string});
  };
  
  const handleCountryChange = (event: SelectChangeEvent) => {
    setContryCode(event.target.value as string);
    onChange({...userPhone, countryCode: event.target.value as string});
  };


  return (
    <>
                <StepHeaderTypo 
                  align="center" 
                  gutterBottom
              >
                  Enter your Mobile Phone Number
              </StepHeaderTypo>
              <StepLabelTypo
                  align="center"
                  gutterBottom>
                  Enter your mobile number to receive authentication codes for Second Factor Authentication. 
              </StepLabelTypo>
                
                
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <Select
                    value={countryCode}
                    onChange={handleCountryChange}
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      backgroundColor: 'white',
                      width: '20%',
                      color: 'black',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'black',
                      }
                    }}
                    renderValue={(selected) => (
                      <Typography>{selected}</Typography>
                    )}
                  >
                    <MenuItem value="+1">USA (+1)</MenuItem>
                    <MenuItem value="+44">UK (+44)</MenuItem>
                    <MenuItem value="+91">India (+91)</MenuItem>
                    <MenuItem value="+216">TN (+216)</MenuItem>
                    <MenuItem value="+86">China (+86)</MenuItem>
                    <MenuItem value="+971">UAE (+971)</MenuItem>

                  </Select>
                </FormControl>
                
                <Typography sx={{fontWeight: 600, mb: 1, fontSize: '15px' }}>
                  Phone Number
                </Typography>
                <InputTextField
                  fullWidth
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter Phone Number"
                  sx={{
                    mb: 3,
                  }}
                />
                
                <StepLabelTypo>
                  This phone number will be enabled for two-factor authentication and log in. We may also use the
                  number added here to help protect our community.
                </StepLabelTypo>
                
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <SecondaryButton 
                    onClick={handleBack}
                >
                    Previous
                </SecondaryButton>
                <PrimaryButton  
                    disabled={phoneNumber == null || phoneNumber === ''}
                    onClick={handleNext}
                >
                    Next
                </PrimaryButton>
            </Box>
            </>
  );
};

export default EditPhoneNumberStep;