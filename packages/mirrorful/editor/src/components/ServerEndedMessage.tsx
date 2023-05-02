import { Grid, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCopied } from 'src/hooks/useCopied'

export default function ServerEndedMessage() {
  const { copied: yarnCopied, setCopied: setYarnCopied } = useCopied()

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
            as="span"
            onClick={() => copyText('npx mirrorful')}
          >
            npx mirrorful
          </Text>
        </Tooltip>{' '}
        OR{' '}
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
            as="span"
            onClick={() => copyText('pnpm mirrorful')}
          >
            pnpm mirrorful
          </Text>
        </Tooltip>
      </Text>
    </Grid>
  )
}
