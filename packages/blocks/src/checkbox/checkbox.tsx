import './checkbox.css';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React, { ChangeEventHandler } from 'react'

import { Icon, IconType } from '../icon/icon'

export function Checkbox({
  onClick,
  isChecked,
  checkmark = 'check',
  label,
  size = 'md',
  icon,
  iconColor = 'primary',
  disabled,
  className,
  ...props
}: {
  onClick?: ChangeEventHandler<HTMLInputElement>
  isChecked?: boolean
  checkmark?: 'check' | 'minus'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  icon?: IconType
  iconColor?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>) {
  return (
    <div
      className={cn(
        'mirrorful' + '-checkbox-container',
        'mirrorful' + '-checkbox-size-' + size
      )}
    >
      <label className={cn('mirrorful' + '-checkbox-label')}>
        <input
          className={cn(
            'mirrorful' + '-checkbox-input',
            className
          )}
          type="checkbox"
          checked={isChecked}
          onChange={onClick}
          disabled={disabled}
          {...props}
        />
        <button
          className={'mirrorful' + '-checkbox'}
          role="checkbox"
          aria-checked={isChecked}
        >
          <FontAwesomeIcon
            icon={checkmark === 'check' ? faCheck : faMinus}
            className={'mirrorful' + '-checkmark'}
          />
        </button>
        <span className={cn('mirrorful' + '-checkbox-label-text')}>
          {label}
        </span>
      </label>
      {icon && (
        <Icon
          type={icon}
          className={cn('mirrorful' + '-checkbox-icon', {
            ['mirrorful' + '-checkbox-icon-primary']:
              iconColor === 'primary',
            ['mirrorful' + '-checkbox-icon-secondary']:
              iconColor === 'secondary',
          })}
        />
      )}
    </div>
  )
}
