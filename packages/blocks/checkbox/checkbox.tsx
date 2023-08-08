import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
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
  const authInfo = useAuthInfo()

  return (
    <div
      className={cn(
        getOrgName({ authInfo }) + '-checkbox-container',
        getOrgName({ authInfo }) + '-checkbox-size-' + size
      )}
    >
      <label className={cn(getOrgName({ authInfo }) + '-checkbox-label')}>
        <input
          className={cn(
            getOrgName({ authInfo }) + '-checkbox-input',
            className
          )}
          type="checkbox"
          checked={isChecked}
          onChange={onClick}
          disabled={disabled}
          {...props}
        />
        <button
          className={getOrgName({ authInfo }) + '-checkbox'}
          role="checkbox"
          aria-checked={isChecked}
        >
          <FontAwesomeIcon
            icon={checkmark === 'check' ? faCheck : faMinus}
            className={getOrgName({ authInfo }) + '-checkmark'}
          />
        </button>
        <span className={cn(getOrgName({ authInfo }) + '-checkbox-label-text')}>
          {label}
        </span>
      </label>
      {icon && (
        <Icon
          type={icon}
          className={cn(getOrgName({ authInfo }) + '-checkbox-icon', {
            [getOrgName({ authInfo }) + '-checkbox-icon-primary']:
              iconColor === 'primary',
            [getOrgName({ authInfo }) + '-checkbox-icon-secondary']:
              iconColor === 'secondary',
          })}
        />
      )}
    </div>
  )
}
