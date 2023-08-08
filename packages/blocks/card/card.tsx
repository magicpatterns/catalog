import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
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
  const authInfo = useAuthInfo()

  return (
    <div
      className={cn(
        getOrgName({ authInfo }) + '-card',
        {
          [getOrgName({ authInfo }) + '-card-clickable']: !!onClick,
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
  const authInfo = useAuthInfo()

  return (
    <div className={cn(getOrgName({ authInfo }) + '-card-header', className)}>
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
  const authInfo = useAuthInfo()

  return (
    <div className={cn(getOrgName({ authInfo }) + '-card-body', className)}>
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
  const authInfo = useAuthInfo()

  return (
    <div className={cn(getOrgName({ authInfo }) + '-card-footer', className)}>
      {children}
    </div>
  )
}
