import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
    <App />
    </SnackbarProvider>
  </StrictMode>,
)
