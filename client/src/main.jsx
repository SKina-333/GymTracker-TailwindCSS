import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { RouterProvider } from 'react-router-dom'
import router from './routers/navRouter.jsx'

import('tailwindcss').Config

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
