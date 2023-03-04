import { Box, Center, Text, Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export function ColorVariantPlaceholder({ onClick }: { onClick: () => void }) {
  return (
    <Button
      css={{
        cursor: 'pointer',
        width: 110,
        height: 110,
        padding: '16px 0',
        borderRadius: 8,
        border: '1px dashed gray',
      }}
      onClick={onClick}
    >
      <Flex
        flexDirection={'column'}
        justifyContent="center"
        alignItems={'center'}
      >
        <AddIcon />
        <Text mt="3">Add new</Text>
        <Text>variant</Text>
      </Flex>
    </Button>
  )
}
