import { Avatar, Card, Flex, Inset, Text } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'

import { LIBRARY_LOGOS, TLibrary } from '@/types'

import { ArrowLink } from '../ArrowLink'

function LibraryAvatar({ library }: { library: TLibrary }) {
  return (
    <Avatar size="1" src={LIBRARY_LOGOS[library]} radius="full" fallback="T" />
  )
}

export function ExampleProjectCard({
  name,
  library,
  imgSrc,
  href,
}: {
  name: string
  library: TLibrary
  imgSrc: string
  href: string
}) {
  return (
    <Card size="2">
      <Inset side="top">
        <Flex
          justify="center"
          align="center"
          grow="1"
          style={{
            position: 'relative',
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <Image src={imgSrc} alt="Preview" fill objectFit="cover" />
        </Flex>
      </Inset>

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
            <LibraryAvatar library={library} />
          </Flex>
          <Flex justify="between">
            <ArrowLink href={href}>View Website</ArrowLink>
          </Flex>
        </Flex>
      </Inset>
    </Card>
  )
}
