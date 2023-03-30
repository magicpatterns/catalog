import { CloseIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Icon, Stack, Text } from '@chakra-ui/react'
import { VERSION } from '@core/utils/constants'
import { Dispatch, useState } from 'react'
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
        fontSize: '0.9rem',
        color: 'gray',
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
  isDisabled,
}: {
  label: string
  icon: IconType
  isActive?: boolean
  onSelect?: () => void
  isComingSoon?: boolean
  isDisabled?: boolean
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const fontSize = '1rem'

  const isActiveState = !isDisabled && (isHovering || isActive)

  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        color: isActiveState ? 'black' : 'gray',
        cursor: isComingSoon ? 'initial' : 'pointer',
        transition: '200ms',
      }}
      onMouseOver={() => {
        if (!isComingSoon || isDisabled) {
          setIsHovering(true)
        }
      }}
      onMouseLeave={() => {
        if (!isComingSoon || isDisabled) {
          setIsHovering(false)
        }
      }}
      onClick={() => {
        if (!isComingSoon && !isDisabled && onSelect) {
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
      <Stack spacing={'12px'} marginTop={'12px'}>
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
  isDisabled,
  setIsSidebarOpen,
}: {
  platform: TPlatform
  activeTab: string
  onSelectTab: (tab: TTab) => void
  onOpenSettings: () => void
  onExport: () => void
  isDisabled?: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
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
        <Box css={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src="/mirrorful_logo.png" style={{ width: '150px' }} />
          <Button>
            <CloseIcon />
          </Button>
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
              isDisabled={isDisabled}
            />

            <SidebarLink
              key="sidebar-typography"
              label="Typography"
              icon={FiUnderline}
              isActive={activeTab === 'typography'}
              onSelect={() => onSelectTab('typography')}
              isDisabled={isDisabled}
            />

            <SidebarLink
              key="sidebar-shadows"
              label="Shadows"
              icon={FiLayers}
              isActive={activeTab === 'shadows'}
              onSelect={() => onSelectTab('shadows')}
              isDisabled={isDisabled}
            />
            <SidebarLink
              key="sidebar-spacing"
              label="Spacing"
              icon={FiGrid}
              isComingSoon
              isDisabled={isDisabled}
            />
          </SidebarSection>

          {/* <SidebarSection header={<SidebarHeader label="Themes" />}>
            <SidebarLink
              label="Theme Manager"
              icon={TbColorSwatch}
              onSelect={() => onSelectTab('theme_manager')}
            />
          </SidebarSection> */}

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
                isDisabled={isDisabled}
              />
            )}
          </SidebarSection>

          <Box>
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
                  window.open(
                    'https://github.com/Mirrorful/mirrorful',
                    '_blank'
                  )
                }
              />
            </SidebarSection>
            <Box css={{ marginTop: '32px' }}>
              <Text fontWeight="bold" color="gray.400" fontSize={'0.8rem'}>
                {platform === 'web' ? 'WEB' : 'PACKAGE'} BETA {VERSION}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
