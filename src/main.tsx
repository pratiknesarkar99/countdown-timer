import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './styles/base.css'
import './styles/header.css'
import './styles/form.css'
import './styles/card.css'
import './styles/countdown.css'
import './styles/utilities.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
