import { Grid, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useCopied } from 'src/hooks/useCopied'

export default function ServerEndedMessage() {
  return (
    <Grid placeContent={'center'} minHeight="100svh" backgroundColor="#F2F2F2">
      <Text css={{ textAlign: 'center', fontSize: '5rem' }}>
        Mirrorful Server is off!
      </Text>
      <Text css={{ textAlign: 'center', fontSize: '2rem', color: 'grey' }}>
        To start the server again, go to the terminal and type{' '}
        <TerminalText text="yarn run mirrorful"></TerminalText> OR{' '}
        <TerminalText text="npx mirrorful"></TerminalText> OR{' '}
        <TerminalText text="pnpm mirrorful"></TerminalText>
      </Text>
    </Grid>
  )
}
function TerminalText({ text }: { text: string }) {
  const { copied, setCopied } = useCopied()
  return (
    <Tooltip
      label="Copied to Clipboard"
      hasArrow
      isDisabled={!copied}
      isOpen={copied}
    >
      <Text
        css={{
          textAlign: 'center',
          color: '#ED8936',
          backgroundColor: '#121212',
          paddingInline: 4,
          paddingBlock: 2,
          marginInline: 4,
          borderRadius: 8,
        }}
        _hover={{ cursor: 'pointer' }}
        as="span"
        onClick={() =>
          navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
          })
        }
      >
        {text}
      </Text>
    </Tooltip>
  )
}
