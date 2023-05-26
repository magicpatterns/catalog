import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Icon, Text } from '@chakra-ui/react'
import { useAuthInfo, useRedirectFunctions } from '@propelauth/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

export function LoginAlert() {
  const { redirectToLoginPage } = useRedirectFunctions()
  const authInfo = useAuthInfo()

  const [isHovering, setIsHovering] = useState<boolean>(false)

  if (authInfo.isLoggedIn) {
    return null
  }

  return (
    <>
      <Box
        css={{
          position: 'sticky',
          top: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 24px',
          borderRadius: 8,
          fontSize: '16px',
          fontWeight: 500,
          zIndex: 2,
          color: `var(--text-color-primary)`,
          backgroundColor: `var(--color-background-accent)`,
          border: `1px solid var(--text-color-secondary)`,
          backdropFilter: 'blur(4px)',
          transition: 'all 200ms ease-in-out',
          cursor: 'pointer',
          maxWidth: '768px',
        }}
        _hover={{
          border: `1px solid var(--text-color-primary)`,
          backgroundColor: `var(--color-background-accent-hover)`,
        }}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          redirectToLoginPage()
        }}
      >
        <Icon
          as={FiAlertTriangle}
          css={{
            marginRight: '8px',
            color: `var(--color-error)`,
            height: '20px',
            width: '20px',
          }}
        />
        <Text>
          You are not logged in. Please login to save your project or access
          existing projects.
        </Text>
        <motion.div
          animate={{ x: isHovering ? 4 : 0 }}
          style={{ marginLeft: '16px' }}
        >
          <ArrowForwardIcon css={{ height: '20px', width: '20px' }} />
        </motion.div>
      </Box>
      <Box css={{ height: '64px' }} />
    </>
  )
}
