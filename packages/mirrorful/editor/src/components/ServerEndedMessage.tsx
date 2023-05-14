import { CopyIcon } from '@chakra-ui/icons'
import { Code, Grid, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useCopied } from 'src/hooks/useCopied'

export default function ServerEndedMessage() {
  return (
    <Grid placeContent={'center'} minHeight="100svh" padding="1rem">
      <Text css={{ textAlign: 'left', fontSize: '5rem' }}>
        Your{' '}
        <Text
          bgGradient="linear(to-b, hsla(6, 93%, 79%, 1), hsla(158, 67%, 64%, 1), hsla(197, 85%, 43%, 1))"
          bgClip="text"
          as="span"
        >
          Mirrorful{' '}
        </Text>
        Server is off.
      </Text>
      <Text
        css={{
          textAlign: 'left',
          fontSize: '2rem',
          color: 'grey',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        To start the server again, type in your terminal:{' '}
        <TerminalText text="yarn run mirrorful"></TerminalText>
        <TerminalText text="npx mirrorful"></TerminalText>
        <TerminalText text="pnpm mirrorful"></TerminalText>
      </Text>
    </Grid>
  )
}
function TerminalText({ text }: { text: string }) {
  const { copied, setCopied } = useCopied()
  return (
    <>
      <Code
        css={{
          padding: 10,
          marginInline: 4,
          borderRadius: 8,
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.5rem',
        }}
        variant="solid"
        colorScheme={'gray'}
      >
        {text}
        <Tooltip
          label="Copied to Clipboard"
          hasArrow
          isDisabled={!copied}
          isOpen={copied}
        >
          <CopyIcon
            css={{ cursor: 'pointer' }}
            onClick={() =>
              navigator.clipboard.writeText(text).then(() => {
                setCopied(true)
              })
            }
          />
        </Tooltip>
      </Code>
    </>
  )
}
