import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getCheckboxSource = (authInfo: UseAuthInfoProps) => {
  return `import './checkbox.css';
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
        '${getOrgName({ authInfo })}' + '-checkbox-container',
        '${getOrgName({ authInfo })}' + '-checkbox-size-' + size
      )}
    >
      <label className={cn('${getOrgName({ authInfo })}' + '-checkbox-label')}>
        <input
          className={cn(
            '${getOrgName({ authInfo })}' + '-checkbox-input',
            className
          )}
          type="checkbox"
          checked={isChecked}
          onChange={onClick}
          disabled={disabled}
          {...props}
        />
        <button
          className={'${getOrgName({ authInfo })}' + '-checkbox'}
          role="checkbox"
          aria-checked={isChecked}
        >
          <FontAwesomeIcon
            icon={checkmark === 'check' ? faCheck : faMinus}
            className={'${getOrgName({ authInfo })}' + '-checkmark'}
          />
        </button>
        <span className={cn('${getOrgName({
          authInfo,
        })}' + '-checkbox-label-text')}>
          {label}
        </span>
      </label>
      {icon && (
        <Icon
          type={icon}
          className={cn('${getOrgName({ authInfo })}' + '-checkbox-icon', {
            ['${getOrgName({ authInfo })}' + '-checkbox-icon-primary']:
              iconColor === 'primary',
            ['${getOrgName({ authInfo })}' + '-checkbox-icon-secondary']:
              iconColor === 'secondary',
          })}
        />
      )}
    </div>
  )
}
`
}
