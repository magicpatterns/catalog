export type Variants =
  | 'save'
  | 'delete'
  | 'add-token'
  | 'add-variant'
  | 'icon'
  | 'default'

export interface IButton {
  label: string
  variant: Variants
  icon?: React.ReactNode
  onClick?: () => void
}
