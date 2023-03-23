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
  FiTarget,
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

function SidebarSection({
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

  const fontSize = '1.3rem'

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
          <Box>
            <SidebarHeader label="Primatives" />
            <Stack spacing={'24px'} css={{ marginTop: '24px' }}>
              <SidebarSection
                label="Colors"
                icon={FiAperture}
                isActive={activeTab === 'colors'}
                onSelect={() => onSelectTab('colors')}
              />
              <SidebarSection
                label="Typography"
                icon={FiUnderline}
                isActive={activeTab === 'typography'}
                onSelect={() => onSelectTab('typography')}
              />
              <SidebarSection
                label="Shadows"
                icon={FiLayers}
                isActive={activeTab === 'shadows'}
                onSelect={() => onSelectTab('shadows')}
              />
              <SidebarSection label="Spacing" icon={FiGrid} isComingSoon />
            </Stack>
          </Box>

          <Stack spacing={24}>
            <Stack>
              <SidebarHeader label="Export" />
              <SidebarSection
                label="Export Tokens"
                icon={FiFolder}
                onSelect={() => onExport()}
              />
              {platform === 'package' && (
                <SidebarSection
                  label="Settings"
                  icon={FiSettings}
                  onSelect={() => onOpenSettings()}
                />
              )}
            </Stack>
            <Stack>
              <SidebarHeader label="Resources" />
              <SidebarSection
                label="Documentation"
                icon={FiBookOpen}
                onSelect={() =>
                  window.open('https://mirrorful.com/docs', '_blank')
                }
              />
              <SidebarSection
                label="Github"
                icon={FiGithub}
                onSelect={() =>
                  window.open(
                    'https://github.com/Mirrorful/mirrorful',
                    '_blank'
                  )
                }
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
