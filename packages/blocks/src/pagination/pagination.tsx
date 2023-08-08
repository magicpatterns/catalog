import './pagination.css';
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
        'mirrorful' + '-pagination',
        'mirrorful' + '-pagination-variant-' + variant,
        className
      )}
      style={style}
      ref={ref}
    >
      <div
        className={cn(
          'mirrorful' + '-pagination-controls',
          'mirrorful' + '-pagination-controls-left',
          {
            ['mirrorful' + '-pagination-controls-disabled']:
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
              'mirrorful' + '-pagination-control-icon'
            )}
          />
        )}
        {controlDisplayType === 'text' && <div role="button">Prev</div>}
      </div>
      {pageDisplayType === 'text' && (
        <div
          className={cn(
            'mirrorful' + '-pagination-pages-text-container'
          )}
        >
          <span
            className={cn(
              'mirrorful' + '-pagination-pages-text-content'
            )}
          >
            {activePage}&nbsp;&nbsp;of&nbsp;&nbsp;{totalPages}
          </span>
        </div>
      )}
      {pageDisplayType === 'numbers' && (
        <div
          className={cn(
            'mirrorful' + '-pagination-pages-numbers-container'
          )}
        >
          {numbersToShow.map((number) => (
            <div
              key={number}
              role="button"
              className={cn(
                'mirrorful' + '-pagination-pages-numbers-button',
                {
                  ['mirrorful' +
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
          'mirrorful' + '-pagination-controls',
          'mirrorful' + '-pagination-controls-right',
          {
            ['mirrorful' + '-pagination-controls-disabled']:
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
              'mirrorful' + '-pagination-control-icon'
            )}
          />
        )}
        {controlDisplayType === 'text' && <div role="button">Next</div>}
      </div>
    </div>
  )
}
