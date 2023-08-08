import {
  faCheck,
  faCheckCircle,
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
import classNames from 'classnames'
import React from 'react'

import { Button } from '../button/button'

export function NotificationBanner({
  size = 'sm',
  buttonText,
  title,
  text,
  variant,
  visible,
  onClose,
  className,
  style,
}: {
  size?: 'sm' | 'lg' | 'xl'
  buttonText?: string
  title?: React.ReactNode
  text: string
  variant: string
  visible: boolean
  onClose?: () => void
  className?: string
  style?: React.CSSProperties
}) {
  const authInfo = useAuthInfo()

  let icon
  if (variant === 'success') {
    icon = <FontAwesomeIcon icon={faCheckCircle} />
  } else if (variant === 'error') {
    icon = <FontAwesomeIcon icon={faExclamationCircle} />
  } else {
    icon =
      size === 'sm' ? (
        <FontAwesomeIcon icon={faExclamationCircle} />
      ) : (
        <FontAwesomeIcon icon={faCheck} />
      )
  }

  if (!visible) return null

  if (size === 'sm') {
    return (
      <div
        className={classNames(
          getOrgName({ authInfo }) + '-notificationBanner',
          getOrgName({ authInfo }) + '-notificationBanner-variant-' + variant,
          getOrgName({ authInfo }) + '-notificationBanner-size-' + size,
          className
        )}
        style={style}
      >
        <div
          className={classNames(
            getOrgName({ authInfo }) + '-notificationBanner-content',
            getOrgName({ authInfo }) + '-notificationBanner-size-' + size
          )}
        >
          <div
            className={classNames(
              getOrgName({ authInfo }) + '-notificationBanner-row'
            )}
          >
            <div
              className={classNames(
                getOrgName({ authInfo }) + '-notificationBanner-icon'
              )}
            >
              {icon}
            </div>
            <div style={{ flexDirection: 'row', gap: '4px' }}>
              <div
                className={classNames(
                  getOrgName({ authInfo }) + '-notificationBanner-title'
                )}
              >
                {title}
              </div>
              <div
                className={classNames(
                  getOrgName({ authInfo }) + '-notificationBanner-text'
                )}
              >
                {text}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={classNames(
              getOrgName({ authInfo }) + '-notificationBanner-close-button'
            )}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={classNames(
          getOrgName({ authInfo }) + '-notificationBanner',
          getOrgName({ authInfo }) + '-notificationBanner-variant-' + variant,
          getOrgName({ authInfo }) + '-notificationBanner-size-' + size,
          className
        )}
        style={style}
      >
        <div
          className={classNames(
            getOrgName({ authInfo }) + '-notificationBanner-content',
            getOrgName({ authInfo }) + '-notificationBanner-size-' + size
          )}
        >
          <div
            className={classNames(
              getOrgName({ authInfo }) + '-notificationBanner-row'
            )}
          >
            <div
              className={classNames(
                getOrgName({ authInfo }) + '-notificationBanner-icon'
              )}
            >
              {icon}
            </div>
            <div
              className={classNames(
                getOrgName({ authInfo }) + '-notificationBanner-title'
              )}
            >
              {title}
            </div>
            <div
              className={classNames(
                getOrgName({ authInfo }) + '-notificationBanner-text'
              )}
            >
              {text}
            </div>
          </div>

          {buttonText && (
            <Button
              size="sm"
              onClick={onClose}
              label={buttonText}
              variant="base"
              rightIcon={faTimes}
            />
          )}
        </div>
      </div>
    )
  }
}
