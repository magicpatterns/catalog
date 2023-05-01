import { Label } from './Label'
import { Button as ChakraButton } from '@chakra-ui/react'

export function Button({ label }: { label: string }) {
  return (
    <ChakraButton>
      <Label text={label} />
    </ChakraButton>
  )
}
