/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ChangeEvent } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  Grid,
  styled,
  InputAdornment,
  IconButton,
  FormGroup,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TwoFactorAuthModal from "../components/TwoFactorAuthModal";

// Styled Components
const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  color: theme.palette.text.primary,
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 20,
  marginTop: 20,
  marginLeft: 20,
}));

const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "0.9rem",
  fontWeight: 900,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontSize: "0.8rem", // Adjust the font size here
    fontWeight: 500, // Optional: Adjust font weight
    color: theme.palette.primary.main,
  },
}));

const SidebarItem = styled(ListItem)<{ isSelected?: boolean }>(
  ({ theme, isSelected }) => ({
    borderRadius: theme.shape.borderRadius,
    marginBottom: isSelected ? theme.spacing(1) : 0,
    backgroundColor: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  })
);

const ContentArea = styled("div")({
  flexGrow: 1,
  padding: 24,
});

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
});

const FormSection = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: "0.8rem", // Adjust the font size here
  fontWeight: 400,
}));


const StyledTextField =  styled(TextField)({
    '& .MuiInputBase-input': {
      fontSize: '0.9rem',  // Adjust text size
      lineHeight: '0.9rem',   // Adjust line height
      height: '1em'
    },
});

const StyledSelect =  styled(Select)<typeof Select>({
    height: '3em',           // Adjust the height of the Select
    lineHeight: '2rem',
    fontSize: '0.9rem',
    '& .MuiInputBase-input': {
      fontSize: '0.9rem',  // Adjust text size
      lineHeight: '3rem',   // Adjust line height
    },
});
 
const FormGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.051)',
  borderRadius: 20,
  padding: 20,
}));

const FileUploadContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid rgba(255, 255, 255, 0.23)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
}));

const CancelButton = styled(Button)({
  marginRight: 16,
});

const Setting: React.FC = () => {
  const [orgName, setOrgName] = useState<string>("Lorem Ipsum");
  const [colorScheme, setColorScheme] = useState<string>("");
  const [settingType, setSettingType] = useState<string>("Organization");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [file, setFile] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setOrgName(event.target.value);
  };

  const handleColorSchemeChange = (event: SelectChangeEvent): void => {
    setColorScheme(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSave = (): void => {
    console.log("Saving changes:", { orgName, colorScheme, file });
    // Add API call to save changes
  };

  return (
    <PageContainer>
    <TwoFactorAuthModal
        open={open} 
        onClose={handleClose}
        userName="John Doe"
        orgName="Asbitech.ai"
      />
      {/* Sidebar */}
      <Sidebar>
        <List component="nav">
          <SidebarItem
            onClick={() => setSettingType("Organization")}
            isSelected={settingType === "Organization"}
          >
            <StyledListItemText primary="Organization Settings" />
          </SidebarItem>
          <SidebarItem
            onClick={() => setSettingType("Personal")}
            isSelected={settingType !== "Organization"}
          >
            <StyledListItemText primary="Personal Settings" />
          </SidebarItem>
        </List>
      </Sidebar>

      {/* Main Content */}
      <ContentArea>
        <HeaderContainer>
          <StyledTitleTypography variant="h5">
            {settingType === "Organization" ? "Organization Settings" : "Personal Settings"}
          </StyledTitleTypography>
          <div>
            <CancelButton variant="outlined">Cancel</CancelButton>
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </HeaderContainer>

        {settingType === "Organization" && (
          <FormGrid  container spacing={4} sx={{bgcolor: 'background.paper'}}>
            <Grid size={6}>
              <FormSection>
                <FormLabel variant="subtitle1">Organization Name</FormLabel>
                <StyledTextField
                  fullWidth
                  value={orgName}
                  onChange={handleNameChange}
                  variant="outlined"
                />
              </FormSection>

              <FormSection>
                <FormLabel variant="subtitle1">Color Scheme</FormLabel>
                <FormControl
                  fullWidth
                  variant="outlined"
                >
                  <StyledSelect
                    value={colorScheme}
                    displayEmpty
                    renderValue={
                      colorScheme !== "" ? undefined : () => "Select"
                    }
                  >
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                  </StyledSelect>
                </FormControl>
              </FormSection>
            </Grid>

            <Grid size={6}>
              <FormSection>
                <FormLabel variant="subtitle1">Upload Logo</FormLabel>
                <FileUploadContainer
                >
                  <input
                    accept="image/*"
                    style={{
                      display: "none",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    }}
                    id="logo-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="logo-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      sx={{
                        mr: 2,
                        color: "black",
                      }}
                    >
                      Choose File
                    </Button>
                  </label>
                  <Typography variant="body2">
                    {file ? file.name : "No File Chosen"}
                  </Typography>
                </FileUploadContainer>
              </FormSection>
            </Grid>
          </FormGrid>
        )}

        {settingType !== "Organization" && (
          <>
            <FormGrid container spacing={4} marginTop={2} sx={{bgcolor: 'background.paper'}}>
              <Grid size={6}>
                <FormSection>
                  <FormLabel variant="subtitle1">Full Name</FormLabel>
                  <StyledTextField
                    fullWidth
                    value={orgName}
                    onChange={handleNameChange}
                    variant="outlined"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
                  />
                </FormSection>

                <FormSection>
                  <FormLabel variant="subtitle1">Email Address</FormLabel>
                  <StyledTextField
                    fullWidth
                    value={orgName}
                    onChange={handleNameChange}
                    variant="outlined"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
                  />
                </FormSection>
              </Grid>

              <Grid size={6}>
                <FormSection>
                  <FormLabel variant="subtitle1">Phone Number</FormLabel>
                  <StyledTextField
                    fullWidth
                    value={orgName}
                    onChange={handleNameChange}
                    variant="outlined"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
                  />
                </FormSection>
              </Grid>
            </FormGrid>

            <HeaderContainer>
              <StyledTitleTypography variant="h5"  marginTop={2}>
                Security Settings
              </StyledTitleTypography>
            </HeaderContainer>

            <FormGrid container spacing={4} marginTop={0} sx={{bgcolor: 'background.paper'}}>
              <Grid size={8}>
                <FormSection>
                  <FormGroup>
                    <FormLabel variant="subtitle1">Password</FormLabel>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StyledTextField
                        fullWidth
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Button
                        variant="contained"
                        sx={{
                          width: 300,
                          ml: 2,
                        }}
                      >
                        Change Password
                      </Button>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleOpen}
                      sx={{
                        py: 1.5,
                        marginTop: 2,
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      Two Factor Authentication (2FA)
                    </Button>
                  </FormGroup>
                </FormSection>
              </Grid>
            </FormGrid>
          </>
        )}
      </ContentArea>
    </PageContainer>
  );
};

export default Setting;
