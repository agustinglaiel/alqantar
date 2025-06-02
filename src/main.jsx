import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import emailjs from '@emailjs/browser'; #TODO
// emailjs.init('your_user_id'); // Reemplaza con tu user_id de EmailJS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
