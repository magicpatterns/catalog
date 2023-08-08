import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getModalSource = (authInfo: UseAuthInfoProps) => {
  return `import './modal.css';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { createContext, useContext, useRef } from 'react'
import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { Portal } from '../portal/portal'

type TModalContext = {
  onClose?: () => void
}

const ModalContext = createContext<TModalContext>({
  onClose: () => {
    /* Do nothing */
  },
})

export function Modal({
  children,
  isOpen = false,
  onClose,
  includeOverlay = true,
  className,
  style,
  ref,
}: {
  children: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
  includeOverlay?: boolean
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  return (
    <CSSTransition
      in={isOpen}
      classNames={'${getOrgName({ authInfo })}' + '-modal'}
      timeout={300}
      nodeRef={modalRef}
    >
      <Portal isOpen={isOpen}>
        <ModalContext.Provider value={{ onClose }}>
          <div
            className={cn('${getOrgName({ authInfo })}' + '-modal-container')}
            ref={ref}
            style={style}
          >
            {includeOverlay && (
              <div
                className={cn('${getOrgName({ authInfo })}' + '-modal-overlay')}
                onClick={() => {
                  if (onClose) {
                    onClose()
                  }
                }}
              />
            )}
            <div
              ref={modalRef}
              className={cn('${getOrgName({
                authInfo,
              })}' + '-modal', className)}
            >
              {children}
            </div>
          </div>
        </ModalContext.Provider>
      </Portal>
    </CSSTransition>
  )
}

export function ModalHeader({
  label,
  icon,
  className,
  style,
  ref,
}: {
  label: string
  icon?: IconDefinition
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  const { onClose } = useContext(ModalContext)

  return (
    <div
      className={cn('${getOrgName({ authInfo })}' + '-modal-header', className)}
      style={style}
      ref={ref}
    >
      <div className={cn('${getOrgName({
        authInfo,
      })}' + '-modal-header-label')}>
        <span>{label}</span>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={cn('${getOrgName({ authInfo })}' + '-modal-header-icon')}
          />
        )}
      </div>
      <FontAwesomeIcon
        onClick={() => {
          if (onClose) {
            onClose()
          }
        }}
        icon={faTimes}
        className={cn('${getOrgName({
          authInfo,
        })}' + '-modal-header-close-icon')}
      />
    </div>
  )
}

export function ModalBody({
  children,
  className,
  style,
  ref,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      className={cn('${getOrgName({ authInfo })}' + '-modal-body', className)}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  )
}

export function ModalFooter({
  children,
  className,
  style,
  ref,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      className={cn('${getOrgName({ authInfo })}' + '-modal-footer', className)}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  )
}
`
}
