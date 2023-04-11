export const parseUnit = (
  value: string
): {
  rawValue: number
  unit: 'px' | 'em' | 'rem'
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

  return {
    rawValue: Number(value),
    unit: 'px',
  }
}
