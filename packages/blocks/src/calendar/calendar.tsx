import './calendar.css';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { Calendar, DateObj, RenderProps, useDayzed } from 'dayzed'
import { createContext, useContext, useEffect, useState } from 'react'
import React from 'react'

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

type TCalendarSelectionType = 'single' | 'range'

type TCalendarContext = {
  selectedDates: Date[]
  selectionType: TCalendarSelectionType
  renderProps: RenderProps
  firstDate: Date | undefined
  setFirstDate: (arg0: Date | undefined) => void
  secondDate: Date | undefined
  setSecondDate: (arg0: Date | undefined) => void
  hoveringDate: Date | undefined
  setHoveringDate: (arg0: Date | undefined) => void
}

const CalendarContext = createContext<TCalendarContext>({
  selectedDates: [],
  selectionType: 'single',
  firstDate: undefined,
  renderProps: {
    calendars: [],
    getBackProps: () => {
      return {}
    },
    getForwardProps: () => {
      return {}
    },
    getDateProps: () => {
      return {}
    },
  },
  setFirstDate: () => {
    /* Do nothing */
  },
  secondDate: undefined,
  setSecondDate: () => {
    /* Do nothing */
  },
  hoveringDate: undefined,
  setHoveringDate: () => {
    /* Do nothing */
  },
})

const isInDateRange = (
  date: Date,
  dateA: Date | undefined,
  dateB: Date | undefined
) => {
  if (!dateA || !dateB) {
    return false
  }

  let minDate = dateA
  let maxDate = dateB
  if (minDate.getTime() > maxDate.getTime()) {
    minDate = dateB
    maxDate = dateA
  }

  return (
    date.getTime() > minDate.getTime() && date.getTime() < maxDate.getTime()
  )

  return
}

export function Calendar({
  variant = 'base',
  selectionType = 'single',
  selectedDates = [],
  onChangeDates,
  minDate,
  maxDate,
}: {
  variant?: string
  selectionType?: 'single' | 'range'
  selectedDates?: Date[]
  onChangeDates?: (arg0: Date[]) => void
  minDate?: Date
  maxDate?: Date
}) {
  const [firstDate, setFirstDate] = useState<Date | undefined>(selectedDates[0])
  const [secondDate, setSecondDate] = useState<Date | undefined>(
    selectedDates[1]
  )
  const [monthOffset, setMonthOffset] = useState<number>(0)
  const [hoveringDate, setHoveringDate] = useState<Date | undefined>()

  let numOfMonths = 1
  if (selectionType === 'range') {
    numOfMonths = 2
  }

  const renderProps = useDayzed({
    selected: selectedDates,
    onDateSelected: (sd) => {
      if (selectionType === 'range') {
        let newFirstValue: Date | undefined = firstDate
        let newSecondValue: Date | undefined = secondDate
        if (firstDate) {
          if (sd.date.getTime() === firstDate.getTime()) {
            newFirstValue = secondDate
            newSecondValue = undefined
          } else if (secondDate) {
            if (sd.date.getTime() === secondDate.getTime()) {
              newSecondValue = undefined
            } else {
              newSecondValue = sd.date
            }
          } else {
            newSecondValue = sd.date
          }
        } else {
          newFirstValue = sd.date
        }
        setFirstDate(newFirstValue)
        setSecondDate(newSecondValue)
        if (onChangeDates) {
          const newSelectedDates = []
          if (newFirstValue) newSelectedDates.push(newFirstValue)
          if (newSecondValue) newSelectedDates.push(newSecondValue)

          onChangeDates(newSelectedDates)
        }
      } else if (selectionType === 'single') {
        setFirstDate(sd.date)
        if (onChangeDates) {
          onChangeDates([sd.date])
        }
      }
    },
    offset: monthOffset,
    onOffsetChanged: (newOffset) => {
      setMonthOffset(newOffset)
    },
    showOutsideDays: true,
    monthsToDisplay: numOfMonths,
    minDate,
    maxDate,
  })

  const { calendars } = renderProps

  useEffect(() => {
    if (selectedDates.length === 0) {
      setFirstDate(undefined)
      setSecondDate(undefined)
    }
  }, [selectedDates])

  return (
    <CalendarContext.Provider
      value={{
        selectedDates,
        selectionType,
        firstDate,
        renderProps,
        setFirstDate,
        secondDate,
        setSecondDate,
        hoveringDate,
        setHoveringDate,
      }}
    >
      <div
        className={cn('mirrorful' + '-calendar', {
          ['mirrorful' + '-calendar-variant-' + 'variant']:
            variant.toLowerCase() !== 'base',
        })}
      >
        {calendars.map((calendar, index) => (
          <div
            key={calendar.month}
            className={cn('mirrorful' + '-calendar-container')}
          >
            <div
              key={calendar.month}
              className={cn('mirrorful' + '-calendar-header')}
            >
              {index === 0 && (
                <CalendarSelector direction="left" renderProps={renderProps} />
              )}
              {numOfMonths > 1 && index === calendars.length - 1 && <div />}
              <div
                className={cn(
                  'mirrorful' + '-calendar-header-text'
                )}
              >
                {MONTH_NAMES[calendar.month]} {calendar.year}
              </div>
              {index === calendars.length - 1 && (
                <CalendarSelector direction="right" renderProps={renderProps} />
              )}
              {numOfMonths > 1 && index === 0 && <div />}
            </div>
            <div className={cn('mirrorful' + '-calendar-body')}>
              <CalendarTable key={calendar.month} calendar={calendar} />
            </div>
          </div>
        ))}
      </div>
    </CalendarContext.Provider>
  )
}

function CalendarTable({ calendar }: { calendar: Calendar }) {
  return (
    <>
      <div className={cn('mirrorful' + '-calendar-table')}>
        <div className={cn('mirrorful' + '-calendar-weekday-row')}>
          {WEEKDAY_NAMES.map((weekday) => (
            <div
              key={calendar.month + calendar.year + weekday}
              className={cn('mirrorful' + '-calendar-cell')}
            >
              {weekday}
            </div>
          ))}
        </div>
        {calendar.weeks.map((week, weekIndex) => (
          <div key={'week-' + weekIndex} style={{ display: 'table-row' }}>
            {week.map((dateObj, index) => {
              const key = calendar.month + calendar.year + weekIndex + index
              return (
                <CalendarCell key={key} dateObj={dateObj} calendar={calendar} />
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}

function CalendarSelector({
  direction,
  renderProps,
}: {
  direction: 'left' | 'right'
  renderProps: RenderProps
}) {
  const { calendars, getBackProps, getForwardProps } = renderProps

  return (
    <button
      className={cn('mirrorful' + '-calendar-header-icon-button')}
      {...(direction === 'left'
        ? getBackProps({ calendars })
        : getForwardProps({ calendars }))}
    >
      <FontAwesomeIcon
        className={cn('mirrorful' + '-calendar-header-icon')}
        icon={direction === 'left' ? faChevronLeft : faChevronRight}
      />
    </button>
  )
}

function CalendarCell({
  dateObj,
  calendar,
}: {
  dateObj: DateObj | ''
  calendar: Calendar
}) {
  const {
    selectedDates,
    renderProps,
    firstDate,
    secondDate,
    hoveringDate,
    setHoveringDate,
    selectionType,
  } = useContext(CalendarContext)
  const { getDateProps } = renderProps

  if (!dateObj) {
    return <div className={cn('mirrorful' + '-calendar-cell')} />
  }

  const { date, selected, selectable } = dateObj

  let isSelectedLeft = false
  let isSelectedRight = false

  if (firstDate && secondDate && selected) {
    const minTime = Math.min(firstDate.getTime(), secondDate.getTime())
    const maxTime = Math.max(firstDate.getTime(), secondDate.getTime())
    isSelectedLeft = minTime === date.getTime()
    isSelectedRight = maxTime === date.getTime()
  } else if (firstDate && secondDate === undefined && hoveringDate) {
    const minTime = Math.min(firstDate.getTime(), hoveringDate.getTime())
    const maxTime = Math.max(firstDate.getTime(), hoveringDate.getTime())
    isSelectedLeft = minTime === date.getTime()
    isSelectedRight = maxTime === date.getTime()
  }

  const isCellInRange =
    selectionType === 'range' &&
    (isInDateRange(date, firstDate, secondDate) ||
      (selectedDates.length === 1 &&
        isInDateRange(date, firstDate, hoveringDate)))

  return (
    <div
      className={cn('mirrorful' + '-calendar-cell', {
        ['mirrorful' + '-calendar-cell-disabled']:
          date.getMonth() !== calendar.month || !selectable,
        ['mirrorful' + '-calendar-cell-selected']: selected,
        ['mirrorful' + '-calendar-cell-in-range']: isCellInRange,
        ['mirrorful' + '-calendar-cell-selected-left']:
          isSelectedLeft && selectionType === 'range',
        ['mirrorful' + '-calendar-cell-selected-right']:
          isSelectedRight && selectionType === 'range',
      })}
      onMouseOver={() => {
        if (!hoveringDate) {
          setHoveringDate(date)
        } else {
          if (hoveringDate.getTime() !== date.getTime()) {
            setHoveringDate(date)
          }
        }
      }}
      onMouseLeave={() => {
        if (hoveringDate) {
          if (hoveringDate.getTime() === date.getTime()) {
            setHoveringDate(undefined)
          }
        }
      }}
      {...getDateProps({ dateObj })}
    >
      {selectable ? date.getDate() : 'X'}
    </div>
  )
}
