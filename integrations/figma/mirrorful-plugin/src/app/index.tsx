import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './components/App'

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('react-page')
  const root = createRoot(container)
  root.render(<App />)
})
