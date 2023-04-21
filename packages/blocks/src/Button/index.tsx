import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { toCapitalize } from '../util/toCapitalize'
import { IButton, Variants } from './types'
import { Tokens } from '.mirrorful/theme'

export function Button(props: IButton) {
  const { colors, fontWeights } = Tokens

  const variantProps: Record<Variants, ChakraProps> = {
    save: {
      bgColor: colors['save-button'].background,
      _hover: { backgroundColor: colors['save-button']['bg hover'] },
      color: colors['save-button'].color,
    },
    default: {
      bgColor: colors['button-default'].background,
      _hover: { backgroundColor: colors['button-default']['bg hover'] },
    },
    delete: {
      bgColor: colors['delete-button'].background,
      _hover: { backgroundColor: colors['delete-button']['bg hover'] },
      color: colors['delete-button'].color,
    },
    'add-token': {
      border: '2px solid',
      borderColor: colors['add-new-token'].border,
      backgroundColor: 'transparent',
      color: colors['add-new-token'].color,
      _hover: {
        border: '2px solid',
        borderColor: colors['add-new-token']['border hover'],
        color: colors['add-new-token']['color hover'],
      },
    },
    'add-variant': {
      border: '1px solid',
      borderColor: colors['add-new-variant'].border,
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: colors['add-new-variant']['bg hover'],
      },
    },
    icon: {
      border: '1px solid',
      borderColor: colors['icon-button'].border,
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: colors['icon-button']['bg hover'],
      },
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3',
      fontWeight: fontWeights['semibold'],
    },
  }
  return (
    <ChakraProviderWrapper>
      <ChakraButton
        color={colors['default-color'].base}
        onClick={props.onClick}
        {...props}
        {...variantProps[props.variant ?? 'default']}
      >
        {props.icon ? props.icon : null}
        {toCapitalize(props.label)}
      </ChakraButton>
    </ChakraProviderWrapper>
  )
}
