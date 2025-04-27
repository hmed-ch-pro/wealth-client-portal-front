import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  IconButton, 
  Typography, 
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PhoneNumberSelectionModalProps {
  open: boolean;
  onClose: () => void;
}

type PhoneSelectionOption = 'existing' | 'add';

const PhoneNumberSelectionModal: React.FC<PhoneNumberSelectionModalProps> = ({ open, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<PhoneSelectionOption>('existing');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as PhoneSelectionOption);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <Box sx={{ position: 'relative' }}>
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
        
        <DialogTitle sx={{ pt: 3, pb: 1 }}>
          <Typography variant="h5" component="div" fontWeight="medium">
            Select or add a phone number
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Choose a mobile phone number already on your account or add a new number. 
            This is the number we'll send the login code to.
          </Typography>
          
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={selectedOption}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="existing" 
                control={<Radio />} 
                label="**** **** 90" 
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  p: 1,
                  mb: 1,
                  width: '100%'
                }} 
              />
              <FormControlLabel 
                value="add" 
                control={<Radio />} 
                label="Add phone number" 
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  p: 1,
                  width: '100%'
                }} 
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
          <Button 
            variant="outlined" 
            onClick={onClose}
            sx={{ minWidth: '100px' }}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={onClose}
            sx={{ minWidth: '100px' }}
          >
            Next
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default PhoneNumberSelectionModal;