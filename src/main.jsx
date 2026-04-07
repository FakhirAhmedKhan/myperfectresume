import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import './index.css'
import { Layout } from './index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LazyMotion features={domAnimation}>
        <Layout />
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>,
)

