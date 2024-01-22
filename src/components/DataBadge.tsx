import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Badge, Box, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { useState } from 'react'

export function DataBadge({
  label,
  value,
  bgColor,
  accentColor,
  icon,
  href,
}: {
  label: string
  value: string
  bgColor: string
  accentColor: string
  icon: React.ReactNode
  href: string
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex
        style={{
          borderRadius: 'var(--radius-3)',
          overflow: 'hidden',
          transition: 'box-shadow 150ms ease-in-out',
          // boxShadow: isHovering ? 'var(--shadow-5)' : 'var(--shadow-1)',
        }}
        align="center"
      >
        <Flex
          style={{ backgroundColor: bgColor, color: 'white' }}
          px="3"
          py="1"
          align="center"
        >
          {icon}
          <Text size="2" weight="medium" ml="2" style={{ paddingTop: '2px' }}>
            {label}
          </Text>
        </Flex>
        <Flex
          style={{ backgroundColor: accentColor }}
          px="3"
          py="1"
          align="center"
        >
          <Text
            size="2"
            weight="medium"
            style={{ paddingTop: '2px', color: 'var(--' }}
          >
            {value}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}
