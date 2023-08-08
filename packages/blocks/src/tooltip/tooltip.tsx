import './tooltip.css';
import cn from 'classnames'
import React, { useState } from 'react'

import { Button } from '../button/button'

function TooltipBody({
  size,
  header,
  body,
  placement,
  primaryAction,
  secondaryAction,
  actions = 'center',
}: {
  size: 'sm' | 'md' | 'lg'
  header?: string
  body: string
  placement: 'left' | 'right' | 'top' | 'bottom'
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  actions?: 'left' | 'center' | 'right'
}) {
  let content = <div />
  if (size === 'sm') {
    content = (
      <div className={cn('mirrorful' + '-tooltip-body')}>
        {body}
      </div>
    )
  } else if (size === 'md') {
    content = (
      <>
        <div className={cn('mirrorful' + '-tooltip-header')}>
          {header}
        </div>
        <div className={cn('mirrorful' + '-tooltip-body')}>
          {body}
        </div>
      </>
    )
  } else if (size === 'lg') {
    content = (
      <>
        <div className={cn('mirrorful' + '-tooltip-header')}>
          {header}
        </div>
        <div className={cn('mirrorful' + '-tooltip-body')}>
          {body}
        </div>
        {(primaryAction || secondaryAction) && (
          <div
            className={cn(
              'mirrorful' + '-tooltip-actions',
              'mirrorful' + '-tooltip-actions-' + actions
            )}
          >
            {primaryAction && (
              <Button
                variant="default"
                size="sm"
                label={primaryAction.label}
                onClick={primaryAction.onClick}
                className={'mirrorful' + '-tooltip-primary-action'}
              />
            )}
            {secondaryAction && (
              <Button
                variant="text"
                size="sm"
                label={secondaryAction.label}
                onClick={secondaryAction.onClick}
                className={
                  'mirrorful' + '-tooltip-secondary-action'
                }
              />
            )}
          </div>
        )}
      </>
    )
  }

  return (
    <div
      className={cn(
        'mirrorful' + '-tooltip',
        'mirrorful' + '-tooltip-' + size,
        'mirrorful' + '-tooltip-' + placement
      )}
    >
      {content}
    </div>
  )
}

export function Tooltip({
  size = 'sm',
  header,
  body,
  placement = 'bottom',
  children,
  primaryAction,
  secondaryAction,
  actions,
  className,
  style,
  ref,
}: {
  size?: 'sm' | 'md' | 'lg'
  header?: string
  body: string
  placement?: 'left' | 'right' | 'top' | 'bottom'
  children: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  actions?: 'left' | 'center' | 'right'
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <div
      className={cn('mirrorful' + '-tooltip-wrapper', className)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={style}
      ref={ref}
    >
      {children}
      {showTooltip && (
        <TooltipBody
          size={size}
          header={header}
          body={body}
          placement={placement}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          actions={actions}
        />
      )}
    </div>
  )
}
