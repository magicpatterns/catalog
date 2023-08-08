import './datepicker.css';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import React from 'react'

import { Calendar } from '../calendar/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover'

const PRESETS = [
  'All Time',
  'Last 10 Minutes',
  'Last Hour',
  'Yesterday',
  'Last 7 Days',
  'Last 30 Days',
  'This Month',
  'Last Month',
]

function defaultFormatDateFunction(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = String(date.getFullYear())

  return month + '/' + day + '/' + year
}

function DatePickerRangeButton({
  isSelected,
  value,
  onClick,
}: {
  isSelected: boolean
  value: string
  onClick: () => void
}) {
  return (
    <button
      className={cn('mirrorful' + '-datePicker-range-button', {
        ['mirrorful' + '-datePicker-range-button-selected']:
          isSelected,
      })}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export function DatePicker({
  showLeftIcon,
  placeholder = 'Pick a date',
  value,
  onChangeValue,
  presets = PRESETS,
  selectionType = 'single',
  formatDate = defaultFormatDateFunction,
  className,
  style,
  buttonRef,
}: {
  placeholder?: string
  value: string | Date[] | undefined
  onChangeValue: (value: string | Date[] | undefined) => void
  showLeftIcon?: boolean
  presets?: string[]
  selectionType?: 'single' | 'range'
  formatDate?: (date: Date) => string
  className?: string
  style?: React.CSSProperties
  buttonRef?: React.Ref<HTMLButtonElement>
}) {
  const renderValue = () => {
    if (Array.isArray(value) && value.length > 0) {
      let renderString = ''
      if (value.length === 1) {
        renderString = formatDate(value[0])

        if (selectionType === 'range') {
          renderString += ' - '
        }
      } else if (value.length === 2) {
        const minDate =
          value[0].getTime() > value[1].getTime() ? value[1] : value[0]
        const maxDate =
          value[0].getTime() > value[1].getTime() ? value[0] : value[1]

        renderString += formatDate(minDate) + ' - ' + formatDate(maxDate)
      }

      return renderString
    }

    if (typeof value === 'string') {
      return value
    }

    return placeholder
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button
          className={cn(
            'mirrorful' + '-datePicker-button',
            className
          )}
          style={style}
          ref={buttonRef}
        >
          {showLeftIcon && (
            <FontAwesomeIcon
              icon={faCalendar}
              className={cn(
                'mirrorful' + '-datePicker-button-icon'
              )}
            />
          )}
          <span
            className={cn('mirrorful' + '-datePicker-button-text')}
          >
            {renderValue()}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className={cn('mirrorful' + '-datePicker-content')}>
          {presets.length > 0 && selectionType === 'range' && (
            <div
              className={cn(
                'mirrorful' + '-datePicker-content-presets'
              )}
            >
              {presets.map((preset) => (
                <DatePickerRangeButton
                  key={preset}
                  isSelected={preset === value}
                  value={preset}
                  onClick={() => {
                    onChangeValue(preset)
                  }}
                />
              ))}
            </div>
          )}
          <div
            className={cn(
              'mirrorful' + '-datePicker-content-calendar'
            )}
          >
            <Calendar
              selectedDates={Array.isArray(value) ? value : []}
              onChangeDates={(dates) => {
                if (dates.length === 0) {
                  onChangeValue(undefined)
                } else {
                  onChangeValue(dates)
                }
              }}
              selectionType={selectionType}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
