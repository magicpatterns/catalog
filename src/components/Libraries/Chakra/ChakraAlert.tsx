import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraAlert() {
  return (
    <ChakraWrapper>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Alert!</AlertTitle>
        <AlertDescription>Error.</AlertDescription>
      </Alert>
    </ChakraWrapper>
  )
}

export const chakraAlertData: TComponentData = {
  name: 'Alert',
  library: 'chakra',
  component: <ChakraAlert />,
  tags: ['chakra', 'alert'],
  docsLink: 'https://chakra-ui.com/docs/components/alert/usage',
}
