import { Box, Heading, Stack, Text, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { FiGrid, FiUnderline, FiAperture } from 'react-icons/fi'
import { TTab } from '.'

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
}: {
  label: string
  icon: IconType
  isActive?: boolean
  onSelect?: () => void
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const fontSize = '1.3rem'

  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        color: isHovering || isActive ? 'black' : 'gray',
        cursor: 'pointer',
        transition: '200ms',
      }}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        if (onSelect) {
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
    </Box>
  )
}

export function Sidebar({
  activeTab,
  onSelectTab,
}: {
  activeTab: string
  onSelectTab: (tab: TTab) => void
}) {
  return (
    <Box
      css={{
        height: '100vh',
        width: '300px',
      }}
    >
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          padding: '36px 24px',
          height: '100%',
          width: '300px',
          position: 'fixed',
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
            marginTop: '50%',
          }}
        >
          <Box>
            <SidebarHeader label="Tokens" />
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
              <SidebarSection label="Spacing" icon={FiGrid} />
            </Stack>
          </Box>

          <Stack>
            <SidebarHeader label="Resources" />
            <SidebarSection label="Documentation" icon={FiGrid} />
            <SidebarSection label="Github" icon={FiGrid} />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
