import { Avatar, Box, Card, Flex, Inset, Text } from '@radix-ui/themes'
import React from 'react'

import { LIBRARY_LOGOS, TLibrary } from '@/types'

import { ArrowLink } from './ArrowLink'
import { ShadcnWrapper } from './Libraries/ShadCn/ShadcnWrapper'

function LibraryAvatar({ library }: { library: TLibrary }) {
  return (
    <Avatar size="1" src={LIBRARY_LOGOS[library]} radius="full" fallback="T" />
  )
}

function LibraryFrame({
  library,
  children,
}: {
  library?: TLibrary
  children: React.ReactNode
}) {
  if (library === 'shadcn') {
    return <ShadcnWrapper>{children}</ShadcnWrapper>
  }

  return children
}

export function ComponentCard({
  name,
  library,
  children,
  docsLink,
}: {
  name: string
  library?: TLibrary
  docsLink?: string
  children: React.ReactNode
}) {
  return (
    <Card size="2" style={{ minWidth: '250px' }}>
      <Flex p="6" justify="center" align="center" grow="1">
        <LibraryFrame library={library}>{children}</LibraryFrame>
      </Flex>
      <Inset side="bottom">
        <Flex
          px="4"
          py="2"
          justify="between"
          direction="column"
          style={{ backgroundColor: 'var(--gray-3)' }}
        >
          <Flex justify="between">
            <Text size="4" weight="bold">
              {name}
            </Text>
            {library && <LibraryAvatar library={library} />}
          </Flex>

          {docsLink && (
            <Flex justify="between">
              <ArrowLink href={docsLink ?? ''}>View Docs</ArrowLink>
            </Flex>
          )}
        </Flex>
      </Inset>
    </Card>
  )
}
