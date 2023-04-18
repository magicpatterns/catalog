import { ChakraProps } from '@chakra-ui/react'

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

interface main
  extends Pick<
    ChakraProps,
    | 'color'
    | 'bgColor'
    | 'textAlign'
    | 'textDecoration'
    | 'width'
    | 'wordBreak'
    | 'textOverflow'
    | 'overflowWrap'
    | 'maxWidth'
    | 'minWidth'
    | 'paddingInline'
    | 'paddingBlock'
    | 'marginInline'
    | 'marginBlock'
  > {
  label: string
  styles: Styles
  hover?: {
    backgroundColor: string
    color: string
  }
  icon?: React.ReactNode
  onClick?: () => void
  variants?: ''
}

export type IText = main
