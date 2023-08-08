import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthInfo } from '@propelauth/react'
import { getOrgName } from '@web/context'
import cn from 'classnames'
import React, { useState } from 'react'

import { Checkbox } from '../checkbox/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../table/table'

export type TDataTableDataValue = string | number

export type TTDataTableColumn<T> = {
  title: string
  render: React.FC<{ data: T }>
  sortFunction?: (arg0: T, arg1: T) => number
  width?: 'nowrap'
}

export type TDataTableData = {
  id: string
  [key: string]: any
}

export type TDataTableSelectable =
  | {
      selectable?: false
      selectedIds?: string[]
      onChangeSelectedIds?: (arg0: string[]) => void
    }
  | {
      selectable: true
      selectedIds: string[]
      onChangeSelectedIds: (arg0: string[]) => void
    }

export type TDataTableProps<T> = {
  data: T[]
  columns: TTDataTableColumn<T>[]
} & TDataTableSelectable

export function DataTable<T extends TDataTableData>({
  className,
  data,
  columns,
  selectable,
  selectedIds,
  onChangeSelectedIds,
  paginate,
  isLoading,
  renderLoading,
}: {
  className?: string
  data: T[]
  columns: TTDataTableColumn<T>[]
  paginate?: {
    rowsPerPage: number
  }
  isLoading?: boolean
  renderLoading?: React.ReactNode
} & TDataTableSelectable) {
  const authInfo = useAuthInfo()

  const [sortedCol, setSortedCol] = useState<null | {
    direction: 'ascending' | 'descending'
    title: string
    sortFunc: (arg0: T, arg1: T) => number
  }>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  const sortedData = [...data]
  if (sortedCol) {
    sortedData.sort((a, b) => {
      if (sortedCol.sortFunc) {
        return sortedCol.sortFunc(a, b)
      }
      return 0
    })

    if (sortedCol.direction === 'descending') {
      sortedData.reverse()
    }
  }

  const sortedAndFilteredData = sortedData.slice(
    (pageNumber - 1) * (paginate?.rowsPerPage ?? 10000000),
    (pageNumber - 1) * (paginate?.rowsPerPage ?? 10000000) +
      (paginate?.rowsPerPage ?? 10000000)
  )

  const pageCount = Math.ceil(data.length / (paginate?.rowsPerPage ?? 1))

  return (
    <div
      className={cn(
        getOrgName({ authInfo }) + '-dataTable-container',
        className
      )}
    >
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHeaderCell>
                <Checkbox
                  disabled={isLoading}
                  isChecked={selectedIds.length === data.length}
                  onClick={() => {
                    if (selectedIds.length === data.length) {
                      onChangeSelectedIds([])
                    } else {
                      onChangeSelectedIds(data.map((d) => d.id))
                    }
                  }}
                />
              </TableHeaderCell>
            )}
            {columns.map((column) => (
              <TableHeaderCell
                key={column.title}
                isSortable={column.sortFunction !== undefined}
                sortDirection={
                  sortedCol?.title === column.title
                    ? sortedCol.direction
                    : undefined
                }
                onSort={(value) => {
                  if (value === undefined) {
                    setSortedCol(undefined)
                  } else if (column.sortFunction) {
                    setSortedCol({
                      direction: value,
                      title: column.title,
                      sortFunc: column.sortFunction,
                    })
                  }
                }}
              >
                {column.title}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        {!isLoading && (
          <TableBody>
            {sortedAndFilteredData.map((row, index) => (
              <TableRow key={index}>
                {selectable && (
                  <TableCell>
                    <Checkbox
                      isChecked={selectedIds.includes(row.id)}
                      onClick={() => {
                        if (selectedIds.includes(row.id)) {
                          onChangeSelectedIds(
                            selectedIds.filter((id) => id !== row.id)
                          )
                        } else {
                          onChangeSelectedIds([...selectedIds, row.id])
                        }
                      }}
                    />
                  </TableCell>
                )}
                {columns.map((c) => (
                  <TableCell key={c.title} width={c.width}>
                    {c.render({ data: row })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {isLoading && (
        <div
          className={cn([
            getOrgName({ authInfo }) + '-dataTable-footer-container',
            getOrgName({ authInfo }) + '-dataTable-footer-loading',
          ])}
        >
          <div
            className={getOrgName({ authInfo }) + '-dataTable-footer-loading'}
          >
            {renderLoading}
          </div>
        </div>
      )}
      {paginate && !isLoading && (
        <div
          className={cn([
            getOrgName({ authInfo }) + '-dataTable-footer-container',
            getOrgName({ authInfo }) + '-dataTable-footer-paginate',
          ])}
        >
          <div className={cn(getOrgName({ authInfo }) + '-dataTable-paginate')}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={getOrgName({ authInfo }) + '-dataTable-paginate-icon'}
              onClick={() => {
                if (pageNumber > 1) {
                  setPageNumber(pageNumber - 1)
                }
              }}
            />
            <div
              className={
                getOrgName({ authInfo }) + '-dataTable-paginate-context'
              }
            >
              <strong>{pageNumber}</strong> of <strong>{pageCount}</strong>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={getOrgName({ authInfo }) + '-dataTable-paginate-icon'}
              onClick={() => {
                if (pageNumber < pageCount) {
                  setPageNumber(pageNumber + 1)
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
