import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
import cn from 'classnames'
import React from 'react'

export function Tabs({
  activeTabIndex,
  onChange,
  tabs,
  border = 'left',
  size = 'sm',
  className,
  style,
  ref,
}: {
  activeTabIndex: number
  onChange: (index: number) => void
  tabs: string[]
  border?: 'left' | 'bottom'
  size?: 'sm' | 'lg'
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  const authInfo = useAuthInfo()

  return (
    <div
      className={cn(
        getOrgName({ authInfo }) + '-tabs',
        getOrgName({ authInfo }) + '-tabs-' + border,
        getOrgName({ authInfo }) + '-tabs-' + size,
        className
      )}
      style={style}
      ref={ref}
    >
      {tabs.map((tab, index) => (
        <div
          key={tab}
          className={cn(getOrgName({ authInfo }) + '-tab', {
            [getOrgName({ authInfo }) + '-tab-active']:
              index === activeTabIndex,
          })}
          role="button"
          tabIndex={0}
          onClick={() => onChange(index)}
        >
          <span>{tab}</span>
        </div>
      ))}
    </div>
  )
}
