export type Variants =
  | 'save'
  | 'delete'
  | 'add-token'
  | 'add-variant'
  | 'icon'
  | 'default'

export interface button {
  label: string
  icon?: React.ReactNode
  variant?: Variants
  onClick?: () => void
}
