import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { getOrgName } from '@web/context'

export const getTableSource = (authInfo: UseAuthInfoProps) => {
  return `import './table.css';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  faCaretDown,
  faCaretUp,
  faMinus,
  faPlus,
  faSort,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React, { createContext, useContext, useRef, useState } from 'react'

import { Checkbox } from '../checkbox/checkbox'

export type TTableAlignment = 'left' | 'center' | 'right'

export function Table({
  alignment,
  variant,
  children,
  className,
  ref,
  style,
  ...props
}: {
  alignment?: TTableAlignment
  variant?: string
  children?: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLTableElement>
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLTableElement>) {
  return (
    <table
      ref={ref}
      className={cn(
        '${getOrgName({ authInfo })}' + '-table',
        {
          ['${getOrgName({ authInfo })}' + '-table-alignment-' + alignment]:
            !!alignment,
        },
        '${getOrgName({ authInfo })}' + '-table-variant-' + variant,
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </table>
  )
}

export function TableHeader({
  alignment,
  children,
  className,
  ref,
  style,
  ...props
}: {
  alignment?: TTableAlignment
  children?: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLTableSectionElement>
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        '${getOrgName({ authInfo })}' + '-table-header',
        {
          ['${getOrgName({ authInfo })}' + '-table-alignment-' + alignment]:
            !!alignment,
        },
        className
      )}
      ref={ref}
      style={style}
      {...props}
    >
      {children}
    </thead>
  )
}

export function TableHeaderCell({
  alignment,
  isSortable,
  sortDirection,
  onSort,
  className,
  ref,
  style,
  children,
  ...props
}: {
  alignment?: TTableAlignment
  isSortable?: boolean
  sortDirection?: 'ascending' | 'descending'
  onSort?: (arg0: 'ascending' | 'descending' | undefined) => void
  className?: string
  ref?: React.Ref<HTMLTableCellElement>
  style?: React.CSSProperties
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLTableCellElement>) {
  let sortIcon = null
  if (isSortable) {
    sortIcon = faSort
    if (sortDirection === 'ascending') {
      sortIcon = faCaretUp
    } else if (sortDirection === 'descending') {
      sortIcon = faCaretDown
    }
  }

  const handleOnSort = () => {
    if (!isSortable || !onSort) {
      return
    }

    if (sortDirection === undefined) {
      onSort('ascending')
    } else if (sortDirection === 'ascending') {
      onSort('descending')
    } else if (sortDirection === 'descending') {
      onSort(undefined)
    }
  }

  return (
    <th
      ref={ref}
      className={cn(
        '${getOrgName({ authInfo })}' + '-table-cell',
        {
          ['${getOrgName({ authInfo })}' + '-table-alignment-' + alignment]:
            !!alignment,
        },
        className
      )}
      style={style}
      {...props}
    >
      <div className={cn('${getOrgName({
        authInfo,
      })}' + '-table-cell-content')}>
        {children}
        {sortIcon && (
          <FontAwesomeIcon
            icon={sortIcon}
            className={
              '${getOrgName({ authInfo })}' + '-table-header-cell-icon-sort'
            }
            onClick={handleOnSort}
          />
        )}
      </div>
    </th>
  )
}

export function TableBody({
  alignment,
  className,
  children,
  ref,
  style,
  ...props
}: {
  alignment?: TTableAlignment
  className?: string
  children?: React.ReactNode
  ref?: React.Ref<HTMLTableSectionElement>
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      ref={ref}
      className={cn(
        '${getOrgName({ authInfo })}' + '-table-body',
        {
          ['${getOrgName({ authInfo })}' + '-table-alignment-' + alignment]:
            !!alignment,
        },
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </tbody>
  )
}

export function TableRow({
  alignment,
  className,
  children,
  ref,
  style,
  ...props
}: {
  alignment?: TTableAlignment
  className?: string
  children?: React.ReactNode
  ref?: React.Ref<HTMLTableRowElement>
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      ref={ref}
      className={cn(
        '${getOrgName({ authInfo })}' + '-table-row',
        {
          ['${getOrgName({ authInfo })}' + '-table-alignment-' + alignment]:
            !!alignment,
        },
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </tr>
  )
}

type TTableExpandableRowContext = {
  isExpanded: boolean
  setIsExpanded?: (arg0: boolean) => void
}

const TableExpandableRowContext = createContext<TTableExpandableRowContext>({
  isExpanded: false,
  setIsExpanded: () => {
    /* Do nothing */
  },
})

export function TableExpandableRow({
  alignment,
  className,
  children,
  ref,
  style,
  initialExpanded = false,
  ...props
}: {
  alignment?: TTableAlignment
  className?: string
  children?: React.ReactNode
  ref?: React.Ref<HTMLTableRowElement>
  style?: React.CSSProperties
  initialExpanded?: boolean
} & React.HTMLAttributes<HTMLTableRowElement>) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  return (
    <tr
      ref={ref}
      className={cn(
        '${getOrgName({ authInfo })}' + '-table-row',
        {
          ['${getOrgName({ authInfo })}' + '-table-alignment-' + alignment]:
            !!alignment,
        },
        className
      )}
      style={style}
      {...props}
    >
      <td
        className={cn(
          '${getOrgName({ authInfo })}' + '-table-expandable-row-container'
        )}
        colSpan={100}
      >
        <TableExpandableRowContext.Provider
          value={{ isExpanded, setIsExpanded }}
        >
          <div
            className={cn(
              '${getOrgName({ authInfo })}' + '-table-expandable-row-content'
            )}
          >
            {children}
          </div>
        </TableExpandableRowContext.Provider>
      </td>
    </tr>
  )
}

function TableExpandableRowHeader({ children }: { children: React.ReactNode }) {
  const { isExpanded, setIsExpanded } = useContext(TableExpandableRowContext)

  return (
    <div
      className={cn('${getOrgName({
        authInfo,
      })}' + '-table-expandable-row-header')}
    >
      <div
        className={cn('${getOrgName({
          authInfo,
        })}' + '-table-expandable-row-icon')}
        onClick={() => {
          if (setIsExpanded) {
            setIsExpanded(!isExpanded)
          }
        }}
      >
        <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} />
      </div>
      {children}
    </div>
  )
}

function TableExpandableRowPanel({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useContext(TableExpandableRowContext)
  const internalRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={internalRef}
      className={cn(
        '${getOrgName({ authInfo })}' + '-table-expandable-row-panel-container'
      )}
      style={{
        maxHeight: isExpanded ? internalRef?.current?.scrollHeight : 0,
      }}
    >
      <div
        className={cn('${getOrgName({
          authInfo,
        })}' + '-table-expandable-row-panel')}
      >
        <div
          className={cn(
            '${getOrgName({ authInfo })}' + '-table-expandable-row-icon'
          )}
        />
        {children}
      </div>
    </div>
  )
}

TableExpandableRow.Header = TableExpandableRowHeader
TableExpandableRow.Panel = TableExpandableRowPanel

export function TableCell({
  alignment,
  children,
  leadingIcon,
  trailingIcon,
  separator,
  checkbox,
  className,
  ref,
  width,
  style,
  ...props
}: {
  alignment?: TTableAlignment
  children?: React.ReactNode
  leadingIcon?: IconDefinition
  trailingIcon?: IconDefinition
  separator?: boolean
  checkbox?: boolean
  className?: string
  ref?: React.Ref<HTMLTableCellElement>
  width?: 'nowrap'
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      ref={ref}
      className={cn(
        '${getOrgName({ authInfo })}' + '-table-cell',
        {
          ['${getOrgName({ authInfo })}' + '-table-alignment-' + alignment]:
            !!alignment,
          ['${getOrgName({ authInfo })}' + '-table-cell-width-nowrap']:
            width === 'nowrap',
        },
        className
      )}
      style={style}
      {...props}
    >
      <div className={'${getOrgName({ authInfo })}' + '-table-cell-content'}>
        {checkbox && (
          <div
            className={cn('${getOrgName({
              authInfo,
            })}' + '-table-cell-checkbox', {
              ['${getOrgName({
                authInfo,
              })}' + '-table-cell-checkbox-separator']:
                separator,
            })}
          >
            <Checkbox />
          </div>
        )}
        {leadingIcon && (
          <FontAwesomeIcon
            icon={leadingIcon}
            className={'${getOrgName({
              authInfo,
            })}' + '-table-cell-leading-icon'}
          />
        )}
        {children}
        {trailingIcon && (
          <FontAwesomeIcon
            icon={trailingIcon}
            className={'${getOrgName({
              authInfo,
            })}' + '-table-cell-trailing-icon'}
          />
        )}
      </div>
    </td>
  )
}

export function TableFooter({
  children,
  className,
  ref,
  style,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLTableSectionElement>
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn('${getOrgName({ authInfo })}' + '-table-footer', className)}
      style={style}
      ref={ref}
      {...props}
    >
      {children}
    </tfoot>
  )
}
`
}
