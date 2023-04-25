import { ChakraProps } from '@chakra-ui/react'
import { Styles } from '@ui/shared/types'

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
  styles?: Styles
  hover?: {
    backgroundColor: string
    color: string
  }
  icon?: React.ReactNode
  onClick?: () => void
  variants?: 'success' | 'error' | 'warning' | 'info'
}

export type IText = main
