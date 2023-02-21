export type TColorData = {
  name: string
  base: string
  hover?: string
  active?: string
  shades?: {
    '50': string
    '100': string
    '200': string
    '300': string
    '400': string
    '500': string
    '600': string
    '700': string
    '800': string
    '900': string
  }
  isPrimary: boolean
  isSecondary: boolean
}
