/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import useDrivePicker from 'react-google-drive-picker';

const GOOGLE_CLIENT_ID = '917711321503-2e3nuldj20qnsmtirv8blql3mv5b08ur.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'AIzaSyDnY7A-gLtXymYLFg8iriA2Ctwtk5rWGNU';
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file';

type PickerResponse = {
  action: string;
  docs: Array<{
    id: string;
    name: string;
    mimeType: string;
    [key: string]: unknown;
  }>;
};

declare global {
  interface Window {
    google: any;
    gapi: any;
    googleSDKLoaded: () => void;
  }
}

function GoogleDrivePicker() {
  const [openPicker] = useDrivePicker();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [client, setClient] = useState<any>(null);

  // Initialize the gapi client
  const initializeGapiClient = useCallback(async () => {
    await window.gapi.client.init({
      apiKey: GOOGLE_API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    });
    setGapiInited(true);
  }, []);

  

  // Load the gapi client
  useEffect(() => {
    // Load the Google API client library
    const loadGapiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client', initializeGapiClient);
      };
      document.body.appendChild(script);
    };

    loadGapiScript();
  }, [initializeGapiClient]);


  useEffect(() => {
    if (accessToken) {
        openFolderPicker();
    }
  }, [accessToken]);

  // Load the Google Identity Services SDK
  useEffect(() => {
    // Load the Google Identity Services SDK
    const loadGsiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response: any) => {
            // This callback won't be used for our OAuth flow, 
            // but is required for initialization
            console.log("Google ID initialized", response);
          }
        });

        const googleClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: SCOPES,
          callback: (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              setAccessToken(tokenResponse.access_token);
              console.log('Access Token:', tokenResponse.access_token);
            }
          },
        });

        setClient(googleClient);
        setGisInited(true);
      };
      document.body.appendChild(script);
    };

    loadGsiScript();
  }, []);

  const authenticate = () => {
    if (!client) {
      console.error('Google Identity Services not initialized');
      return;
    }
    
    client.requestAccessToken();
  };

  const openFolderPicker = () => {
    if (!accessToken) {
      console.error('No access token. Please sign in first.');
      return;
    }

    openPicker({
      clientId: GOOGLE_CLIENT_ID,
      developerKey: GOOGLE_API_KEY,
      viewId: 'FOLDERS',
      token: accessToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      setIncludeFolders: true,
      setSelectFolderEnabled: true,
      multiselect: false,
      callbackFunction: (data: PickerResponse) => {
        if (data.action === 'picked') {
          const folder = data.docs[0];
          console.log('Folder Picked!');
          console.log('Folder ID:', folder.id);
          console.log('Folder Name:', folder.name);

          // Example: send to your backend
          // axios.post('/api/link-folder', { folderId: folder.id, accessToken });
        } else {
          console.log('Picker closed or cancelled');
        }
      },
    });
  };

  return (
    <Button
        variant="contained" 
        onClick={() => authenticate()}
        disabled={!gisInited}
        sx={{ 
        cursor: 'pointer',
        '&:hover': { bgcolor: '#333' },
        textTransform: 'none',
        boxShadow: 'none'
        }}
    >
        Link account
    </Button>

  );
}

export default GoogleDrivePicker;