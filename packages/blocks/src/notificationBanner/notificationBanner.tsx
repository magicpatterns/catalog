import './notificationbanner.css';
import {
  faCheck,
  faCheckCircle,
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
          'mirrorful' + '-notificationBanner',
          'mirrorful' + '-notificationBanner-variant-' + variant,
          'mirrorful' + '-notificationBanner-size-' + size,
          className
        )}
        style={style}
      >
        <div
          className={classNames(
            'mirrorful' + '-notificationBanner-content',
            'mirrorful' + '-notificationBanner-size-' + size
          )}
        >
          <div
            className={classNames(
              'mirrorful' + '-notificationBanner-row'
            )}
          >
            <div
              className={classNames(
                'mirrorful' + '-notificationBanner-icon'
              )}
            >
              {icon}
            </div>
            <div style={{ flexDirection: 'row', gap: '4px' }}>
              <div
                className={classNames(
                  'mirrorful' + '-notificationBanner-title'
                )}
              >
                {title}
              </div>
              <div
                className={classNames(
                  'mirrorful' + '-notificationBanner-text'
                )}
              >
                {text}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={classNames(
              'mirrorful' + '-notificationBanner-close-button'
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
          'mirrorful' + '-notificationBanner',
          'mirrorful' + '-notificationBanner-variant-' + variant,
          'mirrorful' + '-notificationBanner-size-' + size,
          className
        )}
        style={style}
      >
        <div
          className={classNames(
            'mirrorful' + '-notificationBanner-content',
            'mirrorful' + '-notificationBanner-size-' + size
          )}
        >
          <div
            className={classNames(
              'mirrorful' + '-notificationBanner-row'
            )}
          >
            <div
              className={classNames(
                'mirrorful' + '-notificationBanner-icon'
              )}
            >
              {icon}
            </div>
            <div
              className={classNames(
                'mirrorful' + '-notificationBanner-title'
              )}
            >
              {title}
            </div>
            <div
              className={classNames(
                'mirrorful' + '-notificationBanner-text'
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
