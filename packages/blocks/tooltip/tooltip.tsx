import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
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
  const authInfo = useAuthInfo()

  let content = <div />
  if (size === 'sm') {
    content = (
      <div className={cn(getOrgName({ authInfo }) + '-tooltip-body')}>
        {body}
      </div>
    )
  } else if (size === 'md') {
    content = (
      <>
        <div className={cn(getOrgName({ authInfo }) + '-tooltip-header')}>
          {header}
        </div>
        <div className={cn(getOrgName({ authInfo }) + '-tooltip-body')}>
          {body}
        </div>
      </>
    )
  } else if (size === 'lg') {
    content = (
      <>
        <div className={cn(getOrgName({ authInfo }) + '-tooltip-header')}>
          {header}
        </div>
        <div className={cn(getOrgName({ authInfo }) + '-tooltip-body')}>
          {body}
        </div>
        {(primaryAction || secondaryAction) && (
          <div
            className={cn(
              getOrgName({ authInfo }) + '-tooltip-actions',
              getOrgName({ authInfo }) + '-tooltip-actions-' + actions
            )}
          >
            {primaryAction && (
              <Button
                variant="default"
                size="sm"
                label={primaryAction.label}
                onClick={primaryAction.onClick}
                className={getOrgName({ authInfo }) + '-tooltip-primary-action'}
              />
            )}
            {secondaryAction && (
              <Button
                variant="text"
                size="sm"
                label={secondaryAction.label}
                onClick={secondaryAction.onClick}
                className={
                  getOrgName({ authInfo }) + '-tooltip-secondary-action'
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
        getOrgName({ authInfo }) + '-tooltip',
        getOrgName({ authInfo }) + '-tooltip-' + size,
        getOrgName({ authInfo }) + '-tooltip-' + placement
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
  const authInfo = useAuthInfo()
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <div
      className={cn(getOrgName({ authInfo }) + '-tooltip-wrapper', className)}
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
