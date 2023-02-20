import React from 'react'

export function Heading({ children }: { children?: React.ReactNode }) {
  return <div style={{ fontSize: 24 }}>{children}</div>
}
