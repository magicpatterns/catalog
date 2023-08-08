import './input.css';
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
      className={cn('mirrorful' + '-input', {
        ['mirrorful' + '-input-variant-' + variant]: !!variant,
      })}
      style={style}
    >
      {leftIcon && (
        <div className={cn('mirrorful' + '-input-icon-container')}>
          <FontAwesomeIcon
            icon={leftIcon}
            className={'mirrorful' + '-input-icon'}
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
          'mirrorful' + '-input-input',
          {
            ['mirrorful' + '-input-error']: error,
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
          className={cn('mirrorful' + '-input-action-icon', {
            ['mirrorful' + '-input-action-icon-disabled']:
              disabled,
            ['mirrorful' + '-input-action-icon-clickable']:
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
          className={cn('mirrorful' + '-input-action-icon', {
            ['mirrorful' + '-input-action-icon-disabled']:
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
          className={cn('mirrorful' + '-input-error-icon', {
            ['mirrorful' + '-input-action-icon-disabled']:
              disabled,
          })}
        />
      )}
    </div>
  )
}
