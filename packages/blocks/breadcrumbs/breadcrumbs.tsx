import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
import cn from 'classnames'
import React from 'react'

export function Breadcrumbs({
  items,
  direction,
  className,
  style,
}: {
  items: { text: string; onClick?: () => void; index: number }[]
  direction: 'row' | 'column'
  className?: string
  style?: React.CSSProperties
}) {
  const authInfo = useAuthInfo()

  items.sort((a, b) => a.index - b.index)
  const lastIndex = items.length - 1
  return (
    <div
      className={cn({
        [getOrgName({ authInfo }) + '-breadcrumbs']: direction === 'row',
        [direction]: direction === 'row',
        className,
      })}
      style={style}
    >
      {items.map((item, i) => {
        return (
          <>
            <p
              className={cn({
                [getOrgName({ authInfo }) + '-breadcrumbs']:
                  direction === 'column',
                [direction]: direction === 'column',
              })}
              key={i}
              onClick={() => {
                if (item.onClick) {
                  item.onClick()
                }
              }}
            >
              <span
                className={cn({
                  'parent ': i !== lastIndex,
                  'current ': i === lastIndex,
                  [getOrgName({ authInfo }) + '-cursor-pointer']:
                    !!item.onClick,
                })}
              >
                {item.text}
              </span>
            </p>
            {direction === 'column' && i === lastIndex && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className={getOrgName({ authInfo }) + '-breadcrumb-icon'}
              />
            )}
            {direction === 'row' && i !== lastIndex && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className={
                  getOrgName({ authInfo }) + '-breadcrumb-icon icon-row-margin'
                }
              />
            )}
          </>
        )
      })}
    </div>
  )
}
