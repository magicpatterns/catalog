import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
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
  const authInfo = useAuthInfo()

  return (
    <div
      className={cn(
        getOrgName({ authInfo }) + '-chip',
        {
          [getOrgName({ authInfo }) + '-chip-variant-' + variant]: !!variant,
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
            [getOrgName({ authInfo }) + '-chip-right-icon']: !!rightIcon,
            [getOrgName({ authInfo }) + '-chip-left-icon']: !!leftIcon,
          })}
        >
          {label}
        </span>
      )}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </div>
  )
}
