import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
import cn from 'classnames'
import React from 'react'

export function Badge({
  icon,
  label,
  variant,
  className,
}: {
  icon?: IconDefinition
  label?: string
  variant?: string
  className?: string
}) {
  const authInfo = useAuthInfo()

  return (
    <div
      className={cn(
        getOrgName({ authInfo }) + '-badge',
        {
          [getOrgName({ authInfo }) + '-badge-variant-' + variant]: !!variant,
        },
        className
      )}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {label && (
        <span
          className={cn({
            [getOrgName({ authInfo }) + '-badge-left-icon']: icon,
          })}
        >
          {label}
        </span>
      )}
    </div>
  )
}
