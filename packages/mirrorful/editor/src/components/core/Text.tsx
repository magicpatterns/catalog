import React from 'react'

export function Text({ children }: { children?: React.ReactNode }) {
  return <div style={{ fontSize: 18 }}>{children}</div>
}
