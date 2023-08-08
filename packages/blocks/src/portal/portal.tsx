import './portal.css';
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
