import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Flex,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  useColorMode,
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
  FiUnderline,
  FiUpload,
} from 'react-icons/fi'
import { MdOutlineColorLens } from 'react-icons/md'
import { RiBookLine } from 'react-icons/ri'
import { RxComponent1, RxShadow } from 'react-icons/rx'
import { SlSupport } from 'react-icons/sl'
import { TbColorSwatch } from 'react-icons/tb'

import { TPlatform, TTab } from '../Layout'

function SidebarHeader({ label }: { label: string }) {
  return (
    <Text
      css={{
        whiteSpace: 'nowrap',
        fontWeight: 900,
        fontSize: '0.8rem',
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

  const fontSize = '1rem'
  const iconSize = '1.2rem'

  const isActiveState = !isDisabled && (isHovering || isActive)

  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        color: isActiveState ? 'black' : 'gray',
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
      <Stack spacing={'12px'} marginTop={'2px'}>
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
  const { colorMode, toggleColorMode } = useColorMode()

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
          css={{
            width: '25px',
            height: '40px',
            border: '1px solid lightgray',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            transition: '200ms',
            cursor: 'pointer',
          }}
          _hover={{
            backgroundColor: '#F2F2F2',
          }}
          onClick={onToggleCollapsed}
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Box>
      </Box>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          padding: isCollapsed ? '36px 12px' : '36px 24px',
          height: '100%',
          width: '100%',
          backgroundColor: '#F2F2F2',
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
              icon={RxShadow}
              isActive={activeTab === '/shadows'}
              onSelect={() => onSelectTab('/shadows')}
              isDisabled={isDisabled}
              isCollapsed={isCollapsed}
            />
          </SidebarSection>

          <SidebarSection
            header={<SidebarHeader label="LIBRARY" />}
            isCollapsed={isCollapsed}
          >
            <SidebarLink
              key="themes"
              label="Themes"
              link="/themes"
              icon={TbColorSwatch}
              isActive={activeTab.includes('/themes')}
              onSelect={() => onSelectTab('/themes')}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              key="components"
              label="Components"
              link="/components"
              icon={RxComponent1}
              isActive={activeTab.includes('/components')}
              onSelect={() => onSelectTab('/components')}
              isCollapsed={isCollapsed}
            />
          </SidebarSection>

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

          {/* <SidebarSection
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
            </SidebarSection> */}

          <Stack
            css={{ color: 'gray' }}
            direction={isCollapsed ? 'column' : 'row'}
            flexWrap="wrap"
            spacing={isCollapsed ? 4 : 8}
          >
            <Icon
              as={RiBookLine}
              css={{
                width: '1.2rem',
                height: '1.2rem',
                transition: 'color 200ms ease-in-out',
              }}
              _hover={{ color: 'black', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://mirrorful.com/docs', '_blank')
              }}
            />
            <Icon
              as={FiGithub}
              css={{
                width: '1.2rem',
                height: '1.2rem',
                transition: 'color 200ms ease-in-out',
              }}
              _hover={{ color: 'black', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://github.com/Mirrorful/mirrorful', '_blank')
              }}
            />
            <Icon
              as={SlSupport}
              css={{
                width: '1.2rem',
                height: '1.2rem',
                transition: 'color 200ms ease-in-out',
              }}
              _hover={{ color: 'black', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://mirrorful.com/contact', '_blank')
              }}
            />
          </Stack>
          {/* <Box css={{ marginTop: '32px', height: '2rem' }}>
              {!isCollapsed && (
                <Flex>
                  <Text
                    fontWeight="bold"
                    color="gray.400"
                    fontSize={'0.8rem'}
                    onClick={toggleColorMode}
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
                </Flex>
              )}
            </Box> */}
        </Box>
      </Box>
    </Box>
  )
}
