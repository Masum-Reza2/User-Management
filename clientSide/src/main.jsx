import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router'
import ControlRoom from './ControlRoom/ControlRoom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ControlRoom>
      <RouterProvider router={Router} />
    </ControlRoom>
  </React.StrictMode>,
)
