import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorPage from './ErrorPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { loader } from './components/Playground'

const router = createBrowserRouter([
  {
    path: '/:orgId/:fileId',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: loader,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
