import { Grid, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useCopied } from 'src/hooks/useCopied'

export default function ServerEndedMessage() {
  const { copied: yarnCopied, setCopied: setYarnCopied } = useCopied()
  const { copied: npxCopied, setCopied: setNpxCopied } = useCopied()
  const { copied: pnpmCopied, setCopied: setPnpmCopied } = useCopied()

  return (
    <Grid placeContent={'center'} minHeight="100svh" backgroundColor="#F2F2F2">
      <Text css={{ textAlign: 'center', fontSize: '5rem' }}>
        Mirrorful Server is off!
      </Text>
      <Text css={{ textAlign: 'center', fontSize: '2rem', color: 'grey' }}>
        To start the server again, go to the terminal and type{' '}
        <Tooltip
          label="Copied to Clipboard"
          hasArrow
          isDisabled={!yarnCopied}
          isOpen={yarnCopied}
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
              navigator.clipboard.writeText('yarn run mirrorful').then(() => {
                setYarnCopied(true)
              })
            }
          >
            yarn run mirrorful
          </Text>
        </Tooltip>{' '}
        OR{' '}
        <Tooltip
          label="Copied to Clipboard"
          hasArrow
          isDisabled={!npxCopied}
          isOpen={npxCopied}
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
              navigator.clipboard.writeText('npx mirrorful').then(() => {
                setNpxCopied(true)
              })
            }
          >
            npx mirrorful
          </Text>
        </Tooltip>{' '}
        OR{' '}
        <Tooltip
          label="Copied to Clipboard"
          hasArrow
          isDisabled={!pnpmCopied}
          isOpen={pnpmCopied}
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
              navigator.clipboard.writeText('pnpm mirrorful').then(() => {
                setPnpmCopied(true)
              })
            }
          >
            pnpm mirrorful
          </Text>
        </Tooltip>
      </Text>
    </Grid>
  )
}
