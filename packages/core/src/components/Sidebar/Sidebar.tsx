import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  ColorModeScript,
  Flex,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { VERSION } from '@core/utils/constants'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { CgSpaceBetween } from 'react-icons/cg'
import {
  FiBookOpen,
  FiFolder,
  FiGithub,
  FiLayers,
  FiSettings,
  FiSun,
  FiUnderline,
  FiUpload,
} from 'react-icons/fi'
import { MdOutlineColorLens } from 'react-icons/md'

import { TPlatform, TTab } from '../Layout'
import theme, { darkTheme, lightTheme } from '../theme'

function SidebarHeader({ label }: { label: string }) {
  return (
    <Text
      css={{
        whiteSpace: 'nowrap',
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
  link,
  isActive,
  onSelect,
  isComingSoon,
  isDisabled,
  isCollapsed,
}: {
  label?: string
  icon: IconType
  link?: string
  isActive?: boolean
  onSelect?: () => void
  isComingSoon?: boolean
  isDisabled?: boolean
  isCollapsed?: boolean
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const fontSize = '1.1rem'
  const iconSize = '1.3rem'

  const isActiveState = !isDisabled && (isHovering || isActive)

  const activeState = useColorModeValue(
    lightTheme.links.colors.active,
    darkTheme.links.colors.active
  )
  const inactiveState = useColorModeValue(
    lightTheme.links.colors.inactive,
    darkTheme.links.colors.inactive
  )

  return (
    <Box
      color={isActiveState ? activeState : inactiveState}
      css={{
        display: 'flex',
        alignItems: 'center',
        cursor: isComingSoon ? 'initial' : 'pointer',
        transition: '200ms',
        height: '1.5rem',
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
      <Icon as={icon} css={{ height: iconSize, width: iconSize }} />
      {!isCollapsed && (
        <>
          {label && (
            <Text
              css={{
                fontWeight: 600,
                fontSize,
                marginLeft: '12px',
              }}
            >
              <Link
                href={link}
                style={{ textDecoration: 'none' }}
                onClick={(e) => e.preventDefault()}
              >
                {label}
              </Link>
            </Text>
          )}
          {isComingSoon && (
            <Badge css={{ marginLeft: '12px' }} colorScheme="blue">
              COMING SOON
            </Badge>
          )}
        </>
      )}
    </Box>
  )
}

export function SidebarSection({
  header,
  isCollapsed,
  children,
}: {
  header: React.ReactNode
  isCollapsed: boolean
  children: React.ReactNode
}) {
  return (
    <Box>
      <Box css={{ height: '2rem' }}>{!isCollapsed && header}</Box>
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
  onDelete,
  isDisabled,
  isCollapsed,
  onToggleCollapsed,
}: {
  platform: TPlatform
  activeTab: string
  onSelectTab: (tab: TTab) => void
  onOpenSettings: () => void
  onExport: () => void
  onDelete: () => void
  isDisabled?: boolean
  isCollapsed: boolean
  onToggleCollapsed: () => void
}) {
  const { toggleColorMode } = useColorMode()
  const backgroundColor = useColorModeValue(
    lightTheme.backgroundColors.secondary,
    darkTheme.backgroundColors.secondary
  )
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box
        css={{
          height: '100vh',
          width: '100%',
          display: 'flex',
        }}
      >
        <Box
          css={{
            position: 'absolute',
            height: '100%',
            right: -12,
            width: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            bg={backgroundColor}
            css={{
              width: '25px',
              height: '40px',
              border: '1px solid gray',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              transition: '200ms',
              cursor: 'pointer',
            }}
            _hover={{
              backgroundColor: backgroundColor,
            }}
            onClick={onToggleCollapsed}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Box>
        </Box>
        <Box
          bg={backgroundColor}
          css={{
            display: 'flex',
            flexDirection: 'column',
            padding: isCollapsed ? '36px 12px' : '36px 24px',
            height: '100%',
            width: '100%',
            // backgroundColor: 'green',
          }}
        >
          <Box
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '5rem',
            }}
          >
            <Box>
              {isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img src="/simple_logo.png" style={{ width: '150px' }} />
                </motion.div>
              ) : (
                <img src="/mirrorful_logo.png" style={{ width: '150px' }} />
              )}
            </Box>
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
            <SidebarSection
              header={<SidebarHeader label="Primitives" />}
              isCollapsed={isCollapsed}
            >
              <SidebarLink
                key="sidebar-colors"
                label="Colors"
                link="/colors"
                icon={MdOutlineColorLens}
                isActive={activeTab === '/colors'}
                onSelect={() => onSelectTab('/colors')}
                isDisabled={isDisabled}
                isCollapsed={isCollapsed}
              />

              <SidebarLink
                key="sidebar-typography"
                label="Typography"
                link="/typography"
                icon={FiUnderline}
                isActive={activeTab === '/typography'}
                onSelect={() => onSelectTab('/typography')}
                isDisabled={isDisabled}
                isCollapsed={isCollapsed}
              />

              <SidebarLink
                key="sidebar-shadows"
                label="Shadows"
                link="/shadows"
                icon={FiLayers}
                isActive={activeTab === '/shadows'}
                onSelect={() => onSelectTab('/shadows')}
                isDisabled={isDisabled}
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                key="sidebar-spacing"
                label="Spacing"
                link="/spacing"
                icon={CgSpaceBetween}
                isComingSoon
                isDisabled={isDisabled}
                isCollapsed={isCollapsed}
              />
            </SidebarSection>

            {/* <SidebarSection header={<SidebarHeader label="Themes" />}>
            <SidebarLink
              label="Theme Manager"
              icon={TbColorSwatch}
              onSelect={() => onSelectTab('theme_manager')}
            />
          </SidebarSection> */}

            <SidebarSection
              header={<SidebarHeader label="Export" />}
              isCollapsed={isCollapsed}
            >
              <SidebarLink
                label="Export Tokens"
                icon={FiUpload}
                onSelect={() => onExport()}
                isCollapsed={isCollapsed}
              />
              {platform === 'package' && (
                <SidebarLink
                  label="File Types"
                  icon={FiFolder}
                  onSelect={() => onOpenSettings()}
                  isDisabled={isDisabled}
                  isCollapsed={isCollapsed}
                />
              )}
            </SidebarSection>

            <Box>
              <SidebarSection
                header={<SidebarHeader label="Resources" />}
                isCollapsed={isCollapsed}
              >
                <SidebarLink
                  label="Documentation"
                  link="https://mirrorful.com/docs"
                  icon={FiBookOpen}
                  onSelect={() =>
                    window.open('https://mirrorful.com/docs', '_blank')
                  }
                  isCollapsed={isCollapsed}
                />
                <SidebarLink
                  label="Github"
                  link="https://github.com/Mirrorful/mirrorful"
                  icon={FiGithub}
                  onSelect={() =>
                    window.open(
                      'https://github.com/Mirrorful/mirrorful',
                      '_blank'
                    )
                  }
                  isCollapsed={isCollapsed}
                />
              </SidebarSection>
              <Box css={{ marginTop: '32px', height: '2rem' }}>
                {!isCollapsed && (
                  <Flex>
                    <Text
                      fontWeight="bold"
                      color="gray.400"
                      fontSize={'0.8rem'}
                    >
                      {platform === 'web' ? 'WEB' : 'PACKAGE'} BETA {VERSION}
                    </Text>
                    <Spacer />
                    {platform === 'web' && (
                      <SidebarLink
                        key="sidebar-delete"
                        icon={FiSettings}
                        onSelect={() => onDelete()}
                        isCollapsed={isCollapsed}
                        isDisabled={isDisabled}
                      />
                    )}
                    <Spacer />
                    <SidebarLink
                      key="sidebar-toggle-mode"
                      icon={FiSun}
                      onSelect={toggleColorMode}
                      isCollapsed={isCollapsed}
                      isDisabled={isDisabled}
                    />
                  </Flex>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
