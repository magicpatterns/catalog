import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getBadgeSource = (authInfo: UseAuthInfoProps) => {
  return `import './badge.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  return (
    <div
      className={cn(
        '${getOrgName({ authInfo })}' + '-badge',
        {
          ['${getOrgName({
            authInfo,
          })}' + '-badge-variant-' + variant]: !!variant,
        },
        className
      )}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {label && (
        <span
          className={cn({
            ['${getOrgName({ authInfo })}' + '-badge-left-icon']: icon,
          })}
        >
          {label}
        </span>
      )}
    </div>
  )
}
`
}
