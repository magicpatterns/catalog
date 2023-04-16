export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Weights =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
export type Styles = `${Sizes}/${Weights}`

type main = {
  variants?: 'hover'
  label: string
  styles: Styles
  icon?: React.ReactNode
  onClick?: () => void
}

export type IText =
  | (main & { variants?: '' })
  | (main & {
      variants: 'hover'
      backgroundColor: string
      color: string
    })
