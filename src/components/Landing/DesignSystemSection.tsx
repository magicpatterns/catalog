'use client'
import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes'
import GitHubButton from 'react-github-btn'

import { LIBRARY_LOGOS } from '@/types'

import { ArrowLink } from '../ArrowLink'
import { DefaultContainer } from '../DefaultContainer'

function DesignSystemCard({
  name,
  imgSrc,
  href,
}: {
  name: string
  imgSrc: string
  href: string
}) {
  return (
    <Card
      size={{
        initial: '1',
        md: '2',
      }}
      variant="surface"
    >
      <Flex gap="4" align="center" direction="column">
        <Flex justify="center" align="center" p="2">
          <Avatar size={'6'} src={imgSrc} radius="full" fallback={name[0]} />
        </Flex>

        <Box mt="2">
          <Text as="div" size="6" weight="bold" mb="1">
            {name}
          </Text>

          <ArrowLink href={href}>Explore Components</ArrowLink>
        </Box>
      </Flex>
    </Card>
  )
}

export function DesignSystemSection() {
  return (
    <DefaultContainer>
      <Flex
        gap="9"
        justify={'center'}
        align={'center'}
        direction={'row'}
        mt={{
          initial: '4',
          lg: '8',
        }}
      >
        <a
          href="https://www.producthunt.com/posts/patterns-5?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-patterns&#0045;5"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=412621&theme=light&period=daily"
            alt="Patterns - Find&#0032;the&#0032;perfect&#0032;component | Product Hunt"
            width="250"
            height="54"
          />
        </a>
        <a
          href="https://www.producthunt.com/posts/patterns-5?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-patterns&#0045;5"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=412621&theme=light&period=weekly&topic_id=44"
            alt="Patterns - Find&#0032;the&#0032;perfect&#0032;component | Product Hunt"
            width="250"
            height="54"
          />
        </a>
      </Flex>
      <Box
        mt={{
          initial: '4',
          lg: '8',
        }}
      >
        <Heading size="7">Browse by Design System</Heading>
        <Text size="4" color="gray" mt="4">
          Find sets of visually consistent components.
        </Text>
        <Flex mt="4" gap="4" wrap="wrap">
          <DesignSystemCard
            name="Chakra"
            imgSrc={LIBRARY_LOGOS['chakra']}
            href="/ds/chakra"
          />
          <DesignSystemCard
            name="Material"
            imgSrc={LIBRARY_LOGOS['mui']}
            href="/ds/mui"
          />
          <DesignSystemCard
            name="Radix Themes"
            imgSrc={LIBRARY_LOGOS['radix']}
            href="/ds/radix"
          />
          <DesignSystemCard
            name="shadcn"
            imgSrc={LIBRARY_LOGOS['shadcn']}
            href="/ds/shadcn"
          />
          <DesignSystemCard
            name="Mantine"
            imgSrc={LIBRARY_LOGOS['mantine']}
            href="/ds/mantine"
          />
          <DesignSystemCard
            name="Ant"
            imgSrc={LIBRARY_LOGOS['ant']}
            href="/ds/ant"
          />
          <DesignSystemCard
            name="Ariakit"
            imgSrc={LIBRARY_LOGOS['ariakit']}
            href="/ds/ariakit"
          />
          <DesignSystemCard
            name="Bootstrap"
            imgSrc={LIBRARY_LOGOS['bootstrap']}
            href="/ds/bootstrap"
          />
        </Flex>
      </Box>
    </DefaultContainer>
  )
}
