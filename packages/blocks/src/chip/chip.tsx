import './chip.css';
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
        'mirrorful' + '-chip',
        {
          ['mirrorful' + '-chip-variant-' + variant]: !!variant,
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
            ['mirrorful' + '-chip-right-icon']: !!rightIcon,
            ['mirrorful' + '-chip-left-icon']: !!leftIcon,
          })}
        >
          {label}
        </span>
      )}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </div>
  )
}
