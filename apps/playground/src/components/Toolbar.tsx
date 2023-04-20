import { Box, Button, Stack, Text } from '@chakra-ui/react'
import TriggerDevLogo from '../assets/triggerdev_logo.png'
import { FiShare2, FiCloudLightning } from 'react-icons/fi'
import { MoonIcon } from '@chakra-ui/icons'

export function Toolbar() {
  return (
    <Box
      css={{
        width: '100%',
        height: '52px',
        padding: '12px 36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      borderBottomWidth={'1px'}
      borderColor={'divider'}
    >
      <Box css={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={TriggerDevLogo}
          style={{ height: '24px', marginRight: '16px' }}
        />
        <Text css={{ fontSize: '14px', fontWeight: 'bold' }} color="gray.700">
          Component Sandbox Powered by Mirrorful
        </Text>
      </Box>
      <Box>
        <Stack direction="row" spacing={4}>
          <Button variant="primary" size="compact" leftIcon={<FiShare2 />}>
            Share
          </Button>
          <Button
            variant="secondary"
            size="compact"
            leftIcon={<FiCloudLightning />}
          >
            Upgrade
          </Button>
          <Button variant="secondary" size="compact">
            <MoonIcon />
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
