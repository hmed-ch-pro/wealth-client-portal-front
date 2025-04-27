import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import PortalLayout from './layouts/PortalLayout.tsx'
import Setting from './pages/Setting.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortalLayout>
        <Setting></Setting>
    </PortalLayout>
  </StrictMode>,
)
