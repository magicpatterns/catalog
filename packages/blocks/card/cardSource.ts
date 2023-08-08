import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getCardSource = (authInfo: UseAuthInfoProps) => {
  return `import './card.css';
import cn from 'classnames'
import React from 'react'

export function Card({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {
  return (
    <div
      className={cn(
        '${getOrgName({ authInfo })}' + '-card',
        {
          ['${getOrgName({ authInfo })}' + '-card-clickable']: !!onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('${getOrgName({
      authInfo,
    })}' + '-card-header', className)}>
      {children}
    </div>
  )
}

export function CardBody({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('${getOrgName({
      authInfo,
    })}' + '-card-body', className)}>
      {children}
    </div>
  )
}

export function CardFooter({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('${getOrgName({
      authInfo,
    })}' + '-card-footer', className)}>
      {children}
    </div>
  )
}
`
}
