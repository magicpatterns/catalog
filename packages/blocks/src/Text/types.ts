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

interface main extends ChakraProps {
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
