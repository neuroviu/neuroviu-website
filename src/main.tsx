import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import './styles.css'
const redirect = sessionStorage.getItem('redirect'); if (redirect) { sessionStorage.removeItem('redirect'); history.replaceState(null, '', redirect); }
createRoot(document.getElementById('root')!).render(<React.StrictMode><RouterProvider router={getRouter()} /></React.StrictMode>)
