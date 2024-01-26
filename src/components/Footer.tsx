'use client'

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { Box, Flex, IconButton, Separator, Text } from '@radix-ui/themes'

import { SlackIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { AppContainer } from './Ai/AppContainer'
import GitHubButton from 'react-github-btn'

const FooterColumnHeader = ({ text }: { text: string }) => {
  return (
    <Text size="3" style={{ color: 'var(--gray-10)' }}>
      {text}
    </Text>
  )
}

const DOCS_LINK_ROOT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://www.magicpatterns.com/docs'
const FooterLink = ({
  docsTitle,
  word,
  linkOverride,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  docsTitle?: string
  word: string
  linkOverride?: string
  onMouseEnter?: any
  onMouseLeave?: any
  onClick?: any
}) => {
  if (onClick) {
    return (
      <div
        onClick={onClick}
        style={{ textDecoration: 'none', color: 'initial' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Text size="2" className={'gray-hoverable'} color="gray">
          {word}
        </Text>
      </div>
    )
  }
  return (
    <Link
      href={linkOverride ? linkOverride : `${DOCS_LINK_ROOT}${docsTitle}`}
      style={{ textDecoration: 'none', color: 'initial' }}
      target="_blank"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Text size="2" className={'gray-hoverable'} color="gray">
        {word}
      </Text>
    </Link>
  )
}

function FooterNavItems() {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToTop = () => {
    if (pathname === '/') {
      // Make sure this code runs on the client side only
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    } else {
      router.push('/')
    }
  }
  return (
    <>
      {/* Company */}
      <Flex align="start" direction={'column'} gap={'1'}>
        <FooterColumnHeader text="Company" />
        <FooterLink
          linkOverride="https://www.magicpatterns.com/"
          word="Magic Patterns AI"
        />
        <FooterLink
          docsTitle="#"
          linkOverride="https://www.magicpatterns.com/docs/documentation/get-started/introduction"
          word="Product Docs"
        />
        <FooterLink
          docsTitle="#"
          linkOverride="https://cal.com/adanilowicz/generating-custom-ui-with-patterns"
          word="Learn More"
        />
      </Flex>
      {/* Legal */}
      <Flex align="start" direction={'column'} gap={'1'}>
        <FooterColumnHeader text="Legal" />

        <FooterLink docsTitle="/documentation/legal/terms" word="Terms" />
        <FooterLink
          docsTitle="/documentation/legal/privacy"
          word="Privacy Policy"
        />
      </Flex>
    </>
  )
}

function SystemStatus({ parentIsHovered }: { parentIsHovered?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <div
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.open(
            'https://magicpatterns.statuspage.io/',
            '_blank',
            'noopener,noreferrer'
          )
        }
      }}
      style={{
        cursor: 'pointer',
        marginTop: '2px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#2fcc66',
        filter:
          isHovered || parentIsHovered ? 'drop-shadow(0 0 2px #2fcc66)' : '',
        boxShadow: isHovered || parentIsHovered ? '0 0 2px #2fcc66' : '',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}

export function Footer() {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <Box mb="6" mt="9">
      <AppContainer style={{ flexGrow: 1 }}>
        <Box style={{ flexGrow: 1 }}>
          <Separator size="4" />
          <Flex justify="between" direction={{ initial: 'column', sm: 'row' }}>
            <Flex direction="column">
              <Flex
                py="2"
                align="center"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/')}
              >
                <img
                  src="/patterns_logo_gs.svg"
                  style={{
                    height: 'var(--font-size-3)',
                    marginRight: '8px',
                    marginTop: '3px',
                  }}
                />
                <Text
                  size="5"
                  weight="light"
                  style={{ color: 'var(--gray-9)' }}
                >
                  magic patterns
                </Text>
              </Flex>
              <Flex
                align={'center'}
                gap="2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <SystemStatus parentIsHovered={isHovered} />
                <Link
                  href={'https://magicpatterns.statuspage.io/'}
                  style={{ textDecoration: 'none', color: 'initial' }}
                  target="_blank"
                >
                  <Text size="2" className={'gray-hoverable'} color="gray">
                    All Systems Operational
                  </Text>
                </Link>
              </Flex>
              <Flex mt="4" gap="6">
                <Link href="https://twitter.com/magicpatterns" target="_blank">
                  <IconButton
                    variant="ghost"
                    color="cyan"
                    style={{ cursor: 'pointer' }}
                  >
                    <TwitterLogoIcon height="20" width="20" />
                  </IconButton>
                </Link>

                <Link
                  href="https://github.com/magicpatterns/mirrorful"
                  target="_blank"
                >
                  <IconButton
                    variant="ghost"
                    color="gray"
                    style={{ cursor: 'pointer' }}
                  >
                    <GitHubLogoIcon height="20" width="20" />
                  </IconButton>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/magicpatterns"
                  target="_blank"
                >
                  <IconButton
                    variant="ghost"
                    color="indigo"
                    style={{ cursor: 'pointer' }}
                  >
                    <LinkedInLogoIcon height="20" width="20" />
                  </IconButton>
                </Link>

                <Link
                  href="https://join.slack.com/t/magic-patterns/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA"
                  target="_blank"
                >
                  <IconButton
                    variant="ghost"
                    color="indigo"
                    style={{ cursor: 'pointer' }}
                  >
                    <SlackIcon height="20" width="20" />
                  </IconButton>
                </Link>
              </Flex>
            </Flex>
            <Flex
              pt="2"
              align="start"
              gap={{ initial: '5', sm: '9' }}
              direction={{ initial: 'column', sm: 'row' }}
            >
              <FooterNavItems />
            </Flex>
          </Flex>
          <Flex justify="center" mt="2">
            <Flex direction={'column'} align={'center'} gap="2">
              <GitHubButton
                data-size="large"
                data-show-count={true}
                href="https://github.com/magicpatterns/catalog"
              >
                Star
              </GitHubButton>
              <Text size="2" style={{ color: 'var(--gray-8)' }}>
                © North Park Labs 2024
              </Text>
            </Flex>
          </Flex>
        </Box>
      </AppContainer>
    </Box>
  )
}
