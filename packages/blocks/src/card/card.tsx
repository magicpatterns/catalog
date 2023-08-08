import './card.css';
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
        'mirrorful' + '-card',
        {
          ['mirrorful' + '-card-clickable']: !!onClick,
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
    <div className={cn('mirrorful' + '-card-header', className)}>
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
    <div className={cn('mirrorful' + '-card-body', className)}>
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
    <div className={cn('mirrorful' + '-card-footer', className)}>
      {children}
    </div>
  )
}
