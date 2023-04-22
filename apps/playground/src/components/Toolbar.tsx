import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import TriggerDevLogo from '../assets/triggerdev_logo.png'
import { FiShare2, FiCloudLightning } from 'react-icons/fi'
import { MoonIcon } from '@chakra-ui/icons'
import {
  MirrorfulApiClient,
  MirrorfulApiEnvironment,
} from '@mirrorful-fern/api-client'
import { useNavigate, useParams } from 'react-router-dom'

export function Toolbar({ code }: { code: string }) {
  const { fileId, orgId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  async function onShare() {
    const environment =
      process.env.NODE_ENV === 'production'
        ? MirrorfulApiEnvironment.Production
        : MirrorfulApiEnvironment.Development
    const client = new MirrorfulApiClient({
      environment,
    })

    const finalOrgId = orgId ? orgId : '535f2ra'
    const finalFileId = fileId
      ? fileId
      : Math.floor(100000 + Math.random() * 900000).toString()

    await client.registry.updateFile(finalOrgId, finalFileId, {
      code,
    })

    navigate(`/${finalOrgId}/${finalFileId}`)
    navigator.clipboard.writeText(
      `${window.location.origin}/${finalOrgId}/${finalFileId}`
    )
    toast({
      title: 'Link copied.',
      description: "We've saved your changes.",
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

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
          Component Sandbox by Mirrorful
        </Text>
      </Box>
      <Box>
        <Stack direction="row" spacing={4}>
          <Button
            onClick={() => {
              onShare()
            }}
            variant="primary"
            size="compact"
            leftIcon={<FiShare2 />}
          >
            Share
          </Button>
          <Button
            variant="secondary"
            size="compact"
            leftIcon={<FiCloudLightning />}
            onClick={() => {
              //@ts-ignore
              window
                .open('https://buy.stripe.com/14k7sJaldbRVexGdQU', '_blank')
                .focus()
            }}
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
