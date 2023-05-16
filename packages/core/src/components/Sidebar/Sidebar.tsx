import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Stack,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { VERSION } from '@core/utils/constants'
import {
  useAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
} from '@propelauth/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconType } from 'react-icons'
import {
  FiCloudLightning,
  FiFolder,
  FiGithub,
  FiLifeBuoy,
  FiLogin,
  FiLogOut,
  FiMoon,
  FiSun,
  FiTrash2,
  FiUnderline,
  FiUpload,
  FiUser,
} from 'react-icons/fi'
import { MdOutlineColorLens } from 'react-icons/md'
import { RiBookLine } from 'react-icons/ri'
import { RxComponent1, RxShadow } from 'react-icons/rx'
import { TbColorSwatch } from 'react-icons/tb'

import { TPlatform, TTab } from '../Layout'

function SidebarHeader({ label }: { label: string }) {
  return (
    <Text
      css={{
        whiteSpace: 'nowrap',
        fontWeight: 900,
        fontSize: '0.8rem',
        color: 'var(--text-color-secondary)',
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
        color: isActiveState
          ? 'var(--text-color-primary)'
          : 'var(--text-color-secondary)',
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
  const logoutFn = useLogoutFunction()
  const authInfo = useAuthInfo()
  const { colorMode, toggleColorMode } = useColorMode()
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions()

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
            backgroundColor: 'var(--background-color-primary)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            transition: '200ms',
            cursor: 'pointer',
          }}
          _hover={{
            backgroundColor: 'var(--background-color-secondary)',
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
          backgroundColor: 'var(--background-color-secondary)',
          transition: 'background-color 200ms',
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
              <>
                <img
                  src={
                    colorMode === 'dark'
                      ? '/mirrorful_logo_white.png'
                      : '/mirrorful_logo.png'
                  }
                  style={{ width: '150px' }}
                />
              </>
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
            header={<SidebarHeader label="PUBLISH" />}
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
            header={<SidebarHeader label="Account" />}
            isCollapsed={isCollapsed}
          >
            <SidebarLink
              key="sidebar-upgrade"
              label={'Upgrade'}
              icon={MdOutlineVerified}
              isDisabled={isDisabled}
              isCollapsed={isCollapsed}
              onSelect={() => {
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSc8qMWDSUTHMT8f6KNYBOuNItfxtSrvxqTmlIB8030Gtfx1yw/viewform',
                  '_blank'
                )
              }}
            />
            <SidebarLink
              key="sidebar-log-out"
              label={authInfo.isLoggedIn ? 'Log Out' : 'Log In'}
              icon={authInfo.isLoggedIn ? MdOutlineLogout : MdOutlineLogin}
              isDisabled={isDisabled}
              isCollapsed={isCollapsed}
              onSelect={() => {
                if (authInfo.isLoggedIn) {
                  logoutFn(true)
                } else {
                  redirectToLoginPage()
                }
              }}
            />
          </SidebarSection> */}

          <Box>
            <Box css={{ marginBottom: '24px' }}>
              {isCollapsed ? (
                <Icon
                  as={FiCloudLightning}
                  color="#805AD5"
                  _hover={{
                    color: '#553C9A',
                  }}
                  css={{
                    width: '1.2rem',
                    height: '1.2rem',
                    transition: 'color 200ms ease-in-out',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.open(
                      'https://docs.google.com/forms/d/e/1FAIpQLSc8qMWDSUTHMT8f6KNYBOuNItfxtSrvxqTmlIB8030Gtfx1yw/viewform',
                      '_blank'
                    )
                  }}
                />
              ) : (
                <Button
                  leftIcon={<Icon as={FiCloudLightning} />}
                  backgroundImage={`linear-gradient(to bottom right, #805AD5, #553C9A)`}
                  _hover={{
                    backgroundImage: `linear-gradient(to bottom right, #553C9A, #805AD5)`,
                  }}
                  _active={{
                    backgroundImage: `linear-gradient(to bottom right, #553C9A, #805AD5)`,
                  }}
                  color={`white`}
                  css={{
                    height: '36px',
                    fontSize: '16px',
                    padding: '0 24px',
                    lineHeight: 1.2,
                    width: '100%',
                  }}
                  onClick={() => {
                    window.open(
                      'https://docs.google.com/forms/d/e/1FAIpQLSc8qMWDSUTHMT8f6KNYBOuNItfxtSrvxqTmlIB8030Gtfx1yw/viewform',
                      '_blank'
                    )
                  }}
                >
                  Upgrade
                </Button>
              )}
            </Box>
            <Box
              css={{
                borderTop: '1px solid lightgray',
                marginBottom: '18px',
                marginTop: isCollapsed ? '18px' : '0px',
              }}
            />
            <Stack
              css={{ color: 'var(--text-color-secondary)' }}
              direction={isCollapsed ? 'column' : 'row'}
              flexWrap="wrap"
              justifyContent={'space-between'}
              spacing={isCollapsed ? 4 : 8}
            >
              <Icon
                as={RiBookLine}
                css={{
                  width: '1.2rem',
                  height: '1.2rem',
                  transition: 'color 200ms ease-in-out',
                }}
                _hover={{
                  color: 'var(--text-color-primary)',
                  cursor: 'pointer',
                }}
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
                _hover={{
                  color: 'var(--text-color-primary)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open(
                    'https://github.com/Mirrorful/mirrorful',
                    '_blank'
                  )
                }}
              />
              <Icon
                as={FiLifeBuoy}
                css={{
                  width: '1.2rem',
                  height: '1.2rem',
                  transition: 'color 200ms ease-in-out',
                }}
                _hover={{
                  color: 'var(--text-color-primary)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open('https://mirrorful.com/contact', '_blank')
                }}
              />
              {/* <Icon
                as={FiTrash2}
                css={{
                  width: '1.2rem',
                  height: '1.2rem',
                  transition: 'color 200ms ease-in-out',
                }}
                _hover={{
                  color: 'var(--text-color-primary)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  onDelete()
                }}
              /> */}
              {authInfo.isLoggedIn ? (
                <Icon
                  as={FiLogOut}
                  css={{
                    width: '1.2rem',
                    height: '1.2rem',
                    transition: 'color 200ms ease-in-out',
                  }}
                  _hover={{
                    color: 'var(--text-color-primary)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    logoutFn()
                  }}
                />
              ) : (
                <Icon
                  as={FiLogin}
                  css={{
                    width: '1.2rem',
                    height: '1.2rem',
                    transition: 'color 200ms ease-in-out',
                  }}
                  _hover={{
                    color: 'var(--text-color-primary)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    redirectToLoginPage()
                  }}
                />
              )}
            </Stack>

            <Flex
              mt="32px"
              flexDirection={isCollapsed ? 'column' : 'row'}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                css={{
                  display: 'flex',
                  color: 'var(--text-color-secondary)',
                  alignItems: 'center',
                }}
              >
                {!isCollapsed ? (
                  <>
                    <Icon
                      as={FiMoon}
                      css={{ width: '1.2rem', height: '1.2rem' }}
                    />
                    <Switch
                      colorScheme="gray"
                      css={{ margin: '0 8px' }}
                      isChecked={colorMode === 'light'}
                      onChange={() => {
                        toggleColorMode()
                      }}
                    />
                    <Icon
                      as={FiSun}
                      css={{ width: '1.2rem', height: '1.2rem' }}
                    />
                  </>
                ) : (
                  <Icon
                    as={colorMode === 'dark' ? FiMoon : FiSun}
                    css={{
                      width: '1.2rem',
                      height: '1.2rem',
                      cursor: 'pointer',
                      transition: '200ms',
                    }}
                    onClick={() => {
                      toggleColorMode()
                    }}
                    _hover={{
                      color: 'var(--text-color-primary)',
                    }}
                  />
                )}
              </Box>

              {/* <img
                onClick={() => redirectToAccountPage()}
                src={authInfo.user?.pictureUrl}
                style={{
                  marginTop: isCollapsed ? '10px' : '0px',
                  width: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              /> */}
            </Flex>

            {!isCollapsed && (
              <Text
                css={{ marginTop: '16px', cursor: 'default' }}
                fontWeight="bold"
                color="var(--text-color-secondary)"
                fontSize={'0.6rem'}
              >
                {platform === 'web' ? 'WEB' : 'PACKAGE'} BETA {VERSION}
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
