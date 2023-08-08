import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getPaginationSource = (authInfo: UseAuthInfoProps) => {
  return `import './pagination.css';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React from 'react'

const MAX_NUMBERS_TO_SHOW = 5

export function Pagination({
  variant,
  controlDisplayType = 'text',
  pageDisplayType = 'numbers',
  activePage = 1,
  totalPages = 5,
  onChangeActivePage,
  className,
  style,
  ref,
}: {
  variant?: string
  controlDisplayType?: 'arrows' | 'text'
  pageDisplayType?: 'text' | 'numbers'
  activePage?: number
  totalPages?: number
  onChangeActivePage?: (page: number) => void
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  const numbersToShow = []
  const half = Math.floor(MAX_NUMBERS_TO_SHOW / 2)
  if (totalPages < MAX_NUMBERS_TO_SHOW) {
    for (let i = 1; i <= totalPages; i++) {
      numbersToShow.push(i)
    }
  } else if (activePage - half <= 0) {
    for (let i = 1; i <= MAX_NUMBERS_TO_SHOW; i++) {
      numbersToShow.push(i)
    }
  } else if (activePage + half > totalPages) {
    for (let i = totalPages - MAX_NUMBERS_TO_SHOW + 1; i <= totalPages; i++) {
      numbersToShow.push(i)
    }
  } else {
    for (let i = activePage - half; i <= activePage + half; i++) {
      numbersToShow.push(i)
    }
  }

  return (
    <div
      className={cn(
        '${getOrgName({ authInfo })}' + '-pagination',
        '${getOrgName({ authInfo })}' + '-pagination-variant-' + variant,
        className
      )}
      style={style}
      ref={ref}
    >
      <div
        className={cn(
          '${getOrgName({ authInfo })}' + '-pagination-controls',
          '${getOrgName({ authInfo })}' + '-pagination-controls-left',
          {
            ['${getOrgName({ authInfo })}' + '-pagination-controls-disabled']:
              activePage === 1,
          }
        )}
        onClick={() => {
          if (onChangeActivePage && activePage > 1) {
            onChangeActivePage(activePage - 1)
          }
        }}
      >
        {controlDisplayType === 'arrows' && (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={cn(
              '${getOrgName({ authInfo })}' + '-pagination-control-icon'
            )}
          />
        )}
        {controlDisplayType === 'text' && <div role="button">Prev</div>}
      </div>
      {pageDisplayType === 'text' && (
        <div
          className={cn(
            '${getOrgName({ authInfo })}' + '-pagination-pages-text-container'
          )}
        >
          <span
            className={cn(
              '${getOrgName({ authInfo })}' + '-pagination-pages-text-content'
            )}
          >
            {activePage}&nbsp;&nbsp;of&nbsp;&nbsp;{totalPages}
          </span>
        </div>
      )}
      {pageDisplayType === 'numbers' && (
        <div
          className={cn(
            '${getOrgName({
              authInfo,
            })}' + '-pagination-pages-numbers-container'
          )}
        >
          {numbersToShow.map((number) => (
            <div
              key={number}
              role="button"
              className={cn(
                '${getOrgName({
                  authInfo,
                })}' + '-pagination-pages-numbers-button',
                {
                  ['${getOrgName({ authInfo })}' +
                  '-pagination-pages-numbers-button-active']:
                    number === activePage,
                }
              )}
              onClick={() => {
                if (onChangeActivePage) {
                  onChangeActivePage(number)
                }
              }}
            >
              {number}
            </div>
          ))}
        </div>
      )}
      <div
        className={cn(
          '${getOrgName({ authInfo })}' + '-pagination-controls',
          '${getOrgName({ authInfo })}' + '-pagination-controls-right',
          {
            ['${getOrgName({ authInfo })}' + '-pagination-controls-disabled']:
              activePage === totalPages,
          }
        )}
        onClick={() => {
          if (onChangeActivePage && activePage < totalPages) {
            onChangeActivePage(activePage + 1)
          }
        }}
      >
        {controlDisplayType === 'arrows' && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={cn(
              '${getOrgName({ authInfo })}' + '-pagination-control-icon'
            )}
          />
        )}
        {controlDisplayType === 'text' && <div role="button">Next</div>}
      </div>
    </div>
  )
}
`
}
