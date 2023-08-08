import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getPortalSource = (authInfo: UseAuthInfoProps) => {
  return `import './portal.css';
import React from 'react'
import { createPortal } from 'react-dom'

export function Portal({
  isOpen,
  children,
}: {
  isOpen: boolean
  children: React.ReactNode
}) {
  return <>{isOpen && createPortal(children, document.body)}</>
}
`
}
