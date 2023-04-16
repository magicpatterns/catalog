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
  label: string
  styles: Styles
  icon?: React.ReactNode
  onClick?: () => void
}

export type IText =
  | main
  | {
      variants: 'hovers'
      label: main['label']
      styles: main['styles']
      icon?: main['icon']
      onClick?: main['onClick']
      backgroundColor: string
      color: string
    }
