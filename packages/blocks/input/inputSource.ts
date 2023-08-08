import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getInputSource = (authInfo: UseAuthInfoProps) => {
  return `import './input.css';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { faExclamationCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React, { CSSProperties } from 'react'

export function Input({
  variant = 'primary',
  value,
  onChange,
  className,
  clearable,
  error,
  disabled,
  leftIcon,
  rightIcon,
  onClickRightIcon,
  placeholder,
  ref,
  style,
  ...props
}: {
  variant?: string
  value?: string
  onChange?: (e: string) => void
  className?: string
  leftIcon?: IconDefinition
  rightIcon?: IconDefinition
  onClickRightIcon?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void
  clearable?: boolean
  placeholder?: string
  error?: boolean
  disabled?: boolean
  ref?: React.Ref<HTMLInputElement>
  style?: CSSProperties
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div
      className={cn('${getOrgName({ authInfo })}' + '-input', {
        ['${getOrgName({
          authInfo,
        })}' + '-input-variant-' + variant]: !!variant,
      })}
      style={style}
    >
      {leftIcon && (
        <div className={cn('${getOrgName({
          authInfo,
        })}' + '-input-icon-container')}>
          <FontAwesomeIcon
            icon={leftIcon}
            className={'${getOrgName({ authInfo })}' + '-input-icon'}
          />
        </div>
      )}
      <input
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e.currentTarget.value)
          }
        }}
        className={cn(
          '${getOrgName({ authInfo })}' + '-input-input',
          {
            ['${getOrgName({ authInfo })}' + '-input-error']: error,
          },
          className
        )}
        disabled={disabled}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      {rightIcon && (
        <FontAwesomeIcon
          icon={rightIcon}
          className={cn('${getOrgName({ authInfo })}' + '-input-action-icon', {
            ['${getOrgName({ authInfo })}' + '-input-action-icon-disabled']:
              disabled,
            ['${getOrgName({ authInfo })}' + '-input-action-icon-clickable']:
              onClickRightIcon,
          })}
          onClick={(e) => {
            if (onClickRightIcon) {
              onClickRightIcon(e)
            }
          }}
        />
      )}
      {clearable && !error && !rightIcon && (
        <FontAwesomeIcon
          icon={faXmark}
          className={cn('${getOrgName({ authInfo })}' + '-input-action-icon', {
            ['${getOrgName({ authInfo })}' + '-input-action-icon-disabled']:
              disabled,
          })}
          onClick={() => {
            if (onChange) {
              onChange('')
            }
          }}
        />
      )}
      {error && !rightIcon && (
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className={cn('${getOrgName({ authInfo })}' + '-input-error-icon', {
            ['${getOrgName({ authInfo })}' + '-input-action-icon-disabled']:
              disabled,
          })}
        />
      )}
    </div>
  )
}
`
}
