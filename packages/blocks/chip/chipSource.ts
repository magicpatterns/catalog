import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getChipSource = (authInfo: UseAuthInfoProps) => {
  return `import './chip.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React from 'react'

export function Chip({
  rightIcon,
  leftIcon,
  label,
  variant,
  className,
  style,
  ref,
}: {
  rightIcon?: IconDefinition
  leftIcon?: IconDefinition
  label?: string
  variant?: string
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      className={cn(
        '${getOrgName({ authInfo })}' + '-chip',
        {
          ['${getOrgName({
            authInfo,
          })}' + '-chip-variant-' + variant]: !!variant,
        },
        className
      )}
      style={style}
      ref={ref}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      {label && (
        <span
          className={cn({
            ['${getOrgName({ authInfo })}' + '-chip-right-icon']: !!rightIcon,
            ['${getOrgName({ authInfo })}' + '-chip-left-icon']: !!leftIcon,
          })}
        >
          {label}
        </span>
      )}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </div>
  )
}
`
}
