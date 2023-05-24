'use client'

import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'

type TComponent = 'button'

export function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] =
    useState<TComponent>('button')

  return (
    <Box
      css={{
        display: 'grid',
        gridTemplateColumns: '250px auto',
        gridTemplateRows: '70px auto',
        gridColumnGap: '0px',
        gridRowGap: '0px',
        backgroundColor: 'blue',
        height: '100%',
      }}
    >
      {/* Header */}
      <Box css={{ gridArea: '1 / 1 / 2 / 6', backgroundColor: 'red' }}>
        <Stack
          direction="row"
          css={{ alignItems: 'center', padding: '0 24px', height: '100%' }}
          bgColor="var(--background-color-tertiary)"
        >
          <Box
            fontWeight="black"
            color="var(--text-color-primary)"
            fontSize="1.5rem"
            width="250px"
          >
            Components
          </Box>
          <Box>Edit Variants</Box>
        </Stack>
      </Box>
      {/* Sidebar */}
      <Box
        css={{ gridArea: '2 / 1 / 6 / 2', padding: '12px 24px' }}
        bgColor="var(--background-color-tertiary)"
      >
        <Heading
          fontWeight="bold"
          fontSize={'0.8rem'}
          color="var(--text-color-secondary)"
        >
          ATOMS
        </Heading>
        <Box
          css={{
            borderLeft: '1px solid gray',
            paddingLeft: '14px',
            marginTop: '8px',
          }}
          fontSize="1rem"
        >
          <Stack
            direction="column"
            spacing={1}
            color="var(--text-color-secondary)"
          >
            <Link
              fontWeight={500}
              _hover={{ color: 'var(--text-color-primary)' }}
            >
              Avatar
            </Link>
            <Link
              fontWeight={500}
              _hover={{ color: 'var(--text-color-primary)' }}
            >
              Badge
            </Link>
            <Link
              fontWeight={500}
              _hover={{ color: 'var(--text-color-primary)' }}
            >
              Button
            </Link>
          </Stack>
        </Box>
      </Box>
      {/* Body */}
      <Box
        css={{
          gridArea: '2 / 2 / 6 / 6',
          backgroundColor: 'var(--background-color-primary)',
        }}
      ></Box>
    </Box>
  )
}
