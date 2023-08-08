import './button.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React, { forwardRef } from 'react'

function ButtonImpl({
  variant = 'primary',
  size = 'md',
  label = '',
  rightIcon,
  leftIcon,
  disabled,
  isLoading,
  centerIcon,
  onClick,
  className,
  ref,
  ...props
}: {
  variant?: string
  size?: string
  label?: string | JSX.Element
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  rightIcon?: IconDefinition
  leftIcon?: IconDefinition
  disabled?: boolean
  isLoading?: boolean
  centerIcon?: IconDefinition
  className?: string
  ref?: React.Ref<HTMLButtonElement>
}) {
  if (isLoading) {
    if (rightIcon) {
      rightIcon = faSpinner
    }
    if (leftIcon) {
      leftIcon = faSpinner
    }
    if (centerIcon) {
      centerIcon = faSpinner
    }
  }

  let buttonContent = null
  if (centerIcon) {
    buttonContent = <FontAwesomeIcon icon={centerIcon} spin={isLoading} />
  } else {
    buttonContent = (
      <>
        {leftIcon && <FontAwesomeIcon icon={leftIcon} spin={isLoading} />}
        <span
          style={{ fontFamily: 'museo-sans, sans-serif' }}
          className={cn({
            'right-icon-spacing':
              !!rightIcon ||
              (isLoading && !rightIcon && !centerIcon && !leftIcon),
            'left-icon-spacing': !!leftIcon,
          })}
        >
          {label}
        </span>
        {isLoading && !rightIcon && !centerIcon && !leftIcon && (
          <FontAwesomeIcon icon={faSpinner} spin />
        )}
        {rightIcon && !isLoading && <FontAwesomeIcon icon={rightIcon} />}
      </>
    )
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'mirrorful' + '-button',
        'mirrorful' + '-button-variant-' + variant.toLowerCase(),
        'mirrorful' + '-button-size-' + size.toLowerCase(),
        className
      )}
      {...props}
    >
      {buttonContent}
    </button>
  )
}

export const Button = forwardRef(ButtonImpl)
