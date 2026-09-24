import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../assets/css/styles.css'
import './react.css'
import './inner.css'

document.documentElement.dataset.theme = 'rose'
document.documentElement.classList.add('has-js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
