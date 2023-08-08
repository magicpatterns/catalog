import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getToggleSource = (authInfo: UseAuthInfoProps) => {
  return `import './toggle.css';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React from 'react'

export function Toggle({
  disabled = false,
  size = 'md',
  label,
  showIcons,
  isChecked,
  onChange,
  className,
  style,
  inputRef,
}: {
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  showIcons?: boolean
  isChecked?: boolean
  onChange?: (e: boolean) => void
  label?: string
  className?: string
  style?: React.CSSProperties
  inputRef?: React.RefObject<HTMLInputElement>
}) {
  return (
    <div
      className={cn(
        '${getOrgName({ authInfo })}' + '-toggle',
        '${getOrgName({ authInfo })}' + '-toggle-size-' + size,
        className
      )}
      style={style}
    >
      {label && (
        <span className={cn('${getOrgName({ authInfo })}' + '-switch-label')}>
          {label}
        </span>
      )}
      <label className={cn('${getOrgName({ authInfo })}' + '-switch')}>
        <input
          ref={inputRef}
          disabled={disabled}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.checked)
            }
          }}
        />
        <span
          className={cn('${getOrgName({ authInfo })}' + '-toggle-slider', {
            ['${getOrgName({
              authInfo,
            })}' + '-toggle-slider-disabled']: disabled,
          })}
        />
        {showIcons && (
          <>
            <span
              className={cn('${getOrgName({
                authInfo,
              })}' + '-switch-enabled-icon')}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className={cn('${getOrgName({ authInfo })}' + '-toggle-icon')}
              />
            </span>
            <span
              className={cn('${getOrgName({
                authInfo,
              })}' + '-switch-disabled-icon')}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={cn('${getOrgName({ authInfo })}' + '-toggle-icon')}
              />
            </span>
          </>
        )}
      </label>
    </div>
  )
}
`
}
