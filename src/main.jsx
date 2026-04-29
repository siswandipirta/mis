import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 🔥 WAJIB

import './index.css'
import './App.css'
import App from './App.jsx'
import axios from 'axios'

// 🔐 GLOBAL TOKEN
const t = localStorage.getItem('token');
if (t) axios.defaults.headers.common.Authorization = `Bearer ${t}`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 🔥 INI YANG KURANG */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)