import './index.css'

import React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
