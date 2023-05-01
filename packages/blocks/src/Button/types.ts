import { ButtonProps, ChakraProps } from '@chakra-ui/react'

export type Variants =
  | 'save'
  | 'delete'
  | 'add-token'
  | 'add-variant'
  | 'icon'
  | 'default'

export interface IButton
  extends Partial<
    Pick<
      ChakraProps,
      | 'marginRight'
      | 'marginLeft'
      | 'marginTop'
      | 'marginBottom'
      | 'paddingInline'
      | 'paddingBlock'
    >
  > {
  label: string
  variant: Variants
  icon?: React.ReactNode
  type?: ButtonProps['type']
  onClick?: () => void
}
