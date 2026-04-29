import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// set global axios auth header if token present
const t = localStorage.getItem('token');
if (t) axios.defaults.headers.common.Authorization = `Bearer ${t}`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
