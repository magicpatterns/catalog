import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
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
  const authInfo = useAuthInfo()

  return (
    <div
      className={cn(
        getOrgName({ authInfo }) + '-toggle',
        getOrgName({ authInfo }) + '-toggle-size-' + size,
        className
      )}
      style={style}
    >
      {label && (
        <span className={cn(getOrgName({ authInfo }) + '-switch-label')}>
          {label}
        </span>
      )}
      <label className={cn(getOrgName({ authInfo }) + '-switch')}>
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
          className={cn(getOrgName({ authInfo }) + '-toggle-slider', {
            [getOrgName({ authInfo }) + '-toggle-slider-disabled']: disabled,
          })}
        />
        {showIcons && (
          <>
            <span
              className={cn(getOrgName({ authInfo }) + '-switch-enabled-icon')}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className={cn(getOrgName({ authInfo }) + '-toggle-icon')}
              />
            </span>
            <span
              className={cn(getOrgName({ authInfo }) + '-switch-disabled-icon')}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={cn(getOrgName({ authInfo }) + '-toggle-icon')}
              />
            </span>
          </>
        )}
      </label>
    </div>
  )
}
