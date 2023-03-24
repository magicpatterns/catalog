import { Badge, Box, Icon, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { IconType } from 'react-icons'
import {
  FiAperture,
  FiBookOpen,
  FiFolder,
  FiGithub,
  FiGrid,
  FiLayers,
  FiSettings,
  FiUnderline,
} from 'react-icons/fi'

import { TPlatform, TTab } from '.'

function SidebarHeader({ label }: { label: string }) {
  return (
    <Text
      css={{
        fontWeight: 900,
        fontSize: '1rem',
        color: 'gray',
        marginBottom: '10px',
      }}
    >
      {label.toUpperCase()}
    </Text>
  )
}

function SidebarLink({
  label,
  icon,
  isActive,
  onSelect,
  isComingSoon,
}: {
  label: string
  icon: IconType
  isActive?: boolean
  onSelect?: () => void
  isComingSoon?: boolean
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const fontSize = '1.2rem'

  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        color: isHovering || isActive ? 'black' : 'gray',
        cursor: isComingSoon ? 'initial' : 'pointer',
        transition: '200ms',
      }}
      onMouseOver={() => {
        if (!isComingSoon) {
          setIsHovering(true)
        }
      }}
      onMouseLeave={() => {
        if (!isComingSoon) {
          setIsHovering(false)
        }
      }}
      onClick={() => {
        if (!isComingSoon && onSelect) {
          onSelect()
        }
      }}
    >
      <Icon as={icon} css={{ height: fontSize, width: fontSize }} />
      <Text
        css={{
          fontWeight: 600,
          fontSize,
          marginLeft: '12px',
        }}
      >
        {label}
      </Text>
      {isComingSoon && (
        <Badge css={{ marginLeft: '12px' }} colorScheme="blue">
          COMING SOON
        </Badge>
      )}
    </Box>
  )
}

export function SidebarSection({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Box>
      {header}
      <Stack spacing={'12px'} marginTop={'16px'}>
        {children}
      </Stack>
    </Box>
  )
}

export function Sidebar({
  platform,
  activeTab,
  onSelectTab,
  onOpenSettings,
  onExport,
}: {
  platform: TPlatform
  activeTab: string
  onSelectTab: (tab: TTab) => void
  onOpenSettings: () => void
  onExport: () => void
}) {
  return (
    <Box
      css={{
        height: '100vh',
        width: '100%',
        display: 'flex',
      }}
    >
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          padding: '36px 24px',
          height: '100%',
          width: '100%',
          backgroundColor: '#F2F2F2',
        }}
      >
        <Box>
          <img src="/mirrorful_logo.png" style={{ width: '150px' }} />
        </Box>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            marginTop: '20%',
          }}
        >
          <SidebarSection header={<SidebarHeader label="Primitives" />}>
            <SidebarLink
              key="sidebar-colors"
              label="Colors"
              icon={FiAperture}
              isActive={activeTab === 'colors'}
              onSelect={() => onSelectTab('colors')}
            />

            <SidebarLink
              key="sidebar-typography"
              label="Typography"
              icon={FiUnderline}
              isActive={activeTab === 'typography'}
              onSelect={() => onSelectTab('typography')}
            />

            <SidebarLink
              key="sidebar-shadows"
              label="Shadows"
              icon={FiLayers}
              isActive={activeTab === 'shadows'}
              onSelect={() => onSelectTab('shadows')}
            />
            <SidebarLink
              key="sidebar-spacing"
              label="Spacing"
              icon={FiGrid}
              isComingSoon
            />
          </SidebarSection>

          <SidebarSection header={<SidebarHeader label="Export" />}>
            <SidebarLink
              label="Export Tokens"
              icon={FiFolder}
              onSelect={() => onExport()}
            />
            {platform === 'package' && (
              <SidebarLink
                label="Settings"
                icon={FiSettings}
                onSelect={() => onOpenSettings()}
              />
            )}
          </SidebarSection>

          <SidebarSection header={<SidebarHeader label="Resources" />}>
            <SidebarLink
              label="Documentation"
              icon={FiBookOpen}
              onSelect={() =>
                window.open('https://mirrorful.com/docs', '_blank')
              }
            />
            <SidebarLink
              label="Github"
              icon={FiGithub}
              onSelect={() =>
                window.open('https://github.com/Mirrorful/mirrorful', '_blank')
              }
            />
          </SidebarSection>
        </Box>
      </Box>
    </Box>
  )
}
