import { TLineHeightVariant } from '@core/types'

export const getlineHeight = (lineHeight: TLineHeightVariant): string => {
  switch (lineHeight.unit) {
    case 'number':
      return `${lineHeight.value}`
    case 'percent':
      return `${lineHeight.value}%`
    case 'length':
      return `${lineHeight.value}${lineHeight.lengthUnit}`
  }
}
