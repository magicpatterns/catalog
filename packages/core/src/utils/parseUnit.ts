import { TUnits } from '@core/types'

export const parseUnit = (
  value: string
): {
  rawValue: number
  unit: TUnits
} => {
  if (value.endsWith('px')) {
    return {
      rawValue: Number(value.replace('px', '')),
      unit: 'px',
    }
  }

  if (value.endsWith('rem')) {
    return {
      rawValue: Number(value.replace('rem', '')),
      unit: 'rem',
    }
  }

  if (value.endsWith('em')) {
    return {
      rawValue: Number(value.replace('em', '')),
      unit: 'em',
    }
  }

  if (value.endsWith('%')) {
    return {
      rawValue: Number(value.replace('%', '')),
      unit: '%',
    }
  }

  return {
    rawValue: Number(value),
    unit: 'number',
  }
}
