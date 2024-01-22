'use client'

import {
  BarChartIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Tabs,
  Text,
} from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { LIBRARY_LOGOS, TLibrary, TShowcaseData } from '@/types'

import { DataBadge } from '../DataBadge'
import { ExampleProjectCard } from './ExampleProjectCard'
import { NewShowcaseCta } from './NewShowcaseCta'

type TDesignSystemMetadata = {
  name: string
  library: TLibrary
  websiteLink: string
  lastRelease: string
  githubStarCount: string
  githubLink: string
  npmDownloadCount: string
  npmLink: string
}

export function DesignSystemPageLayout({
  metadata,
  componentRender,
  showcaseData,
}: {
  metadata: TDesignSystemMetadata
  componentRender: React.ReactNode
  showcaseData: TShowcaseData[]
}) {
  const router = useRouter()
  const pathname = usePathname()

  const defaultTab =
    typeof window !== 'undefined'
      ? window.location.hash.replace('#', '') || 'components'
      : 'components'

  return (
    <>
      <Box>
        <Flex gap="2">
          <Badge color="green">DESIGN SYSTEM</Badge>
          <Badge color="blue">REACT</Badge>
        </Flex>
        <Flex
          align={{
            initial: 'start',
            md: 'center',
          }}
          direction={{
            initial: 'column',
            md: 'row',
          }}
          mt="4"
        >
          <Avatar
            size="5"
            src={LIBRARY_LOGOS[metadata.library]}
            radius="full"
            fallback="T"
            mr="3"
          />
          <Flex direction="column">
            <Heading size="8" mt={{ initial: '4', md: '0' }}>
              {metadata.name}
            </Heading>
            <Link
              href={metadata.websiteLink}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              className="gray-hoverable"
            >
              <Text mr="2">Visit Website</Text>
              <ExternalLinkIcon />
            </Link>
          </Flex>
        </Flex>
        {/* <Text as="div" size="5" color="gray" mt="4">
            {description}
          </Text> */}
        <Flex
          mt="5"
          gap="4"
          direction={{ initial: 'column', sm: 'column', md: 'row' }}
          align="start"
        >
          <DataBadge
            label="Latest Release"
            value={metadata.lastRelease}
            bgColor="var(--blue-11)"
            accentColor="var(--blue-5)"
            icon={<CalendarIcon />}
            href={metadata.websiteLink}
          />
          <DataBadge
            label="Github Stars"
            value={metadata.githubStarCount}
            bgColor="var(--slate-12)"
            accentColor="var(--slate-5)"
            icon={<GitHubLogoIcon />}
            href={metadata.githubLink}
          />
          <DataBadge
            label="Weekly Downloads"
            value={metadata.npmDownloadCount}
            bgColor="var(--red-11)"
            accentColor="var(--red-5)"
            icon={<BarChartIcon />}
            href={metadata.npmLink}
          />
        </Flex>
      </Box>
      <Tabs.Root
        defaultValue={defaultTab}
        mt="6"
        onValueChange={(tab) => {
          router.replace(`${pathname}#${tab}`)
        }}
      >
        <Tabs.List size="2">
          <Tabs.Trigger value="components">Components</Tabs.Trigger>
          <Tabs.Trigger value="showcase">Showcase</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="5" pb="2">
          <Tabs.Content value="components">{componentRender}</Tabs.Content>

          <Tabs.Content value="showcase">
            <Grid
              justify="between"
              columns={{
                initial: '1',
                md: '2',
              }}
              gap="6"
              style={{ justifyContent: 'space-around' }}
            >
              {showcaseData.map((data) => (
                <ExampleProjectCard
                  key={data.name}
                  name={data.name}
                  library={data.library}
                  imgSrc={data.previewSrc}
                  href={data.siteLink}
                />
              ))}
            </Grid>
            {showcaseData.length === 0 && (
              <Text size="4" style={{ color: 'var(--gray-11)' }}>
                No example products... yet.
              </Text>
            )}
            <Flex justify="center" py="4" mt="5">
              <NewShowcaseCta libraryName={metadata.name} />
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </>
  )
}
