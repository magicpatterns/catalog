import {
  Box,
  Button,
  Stack,
  Text,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
} from '@chakra-ui/react'
import TriggerDevLogo from '../assets/triggerdev_logo.png'
import FabraLogo from '../assets/fabra_logo.png'
import { FiShare2, FiCloudLightning } from 'react-icons/fi'
import { TbPlanet, TbShare, TbCheck } from 'react-icons/tb'
import {
  MirrorfulApiClient,
  MirrorfulApiEnvironment,
} from '@mirrorful-fern/api-client'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { generateRandomId } from '../utils/generateId'
import { LIBRARY_CONTEXT } from '../utils/constants'

const TRIGGER_DEV_ORG_ID = '535f2ra'

let logoToUse = TriggerDevLogo
if (LIBRARY_CONTEXT === 'fabra') {
  logoToUse = FabraLogo
}

export function Toolbar({ code, onRun }: { code: string; onRun: () => void }) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const { fileId, orgId } = useParams()
  const navigate = useNavigate()
  const [copyText, setCopyText] = useState<'Copy' | 'Copied'>('Copy')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const URL = `${window.location.origin}/${orgId}/${fileId}`
  const permissionName = 'clipboard-read' as PermissionName

  useEffect(() => {
    let timer = setTimeout(() => {
      void getPermission()
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  async function onCopy() {
    const permissionStatus = await navigator.permissions.query({
      name: permissionName,
    })

    setIsFocused(true)

    if (permissionStatus.state === 'granted') {
      await navigator.clipboard.writeText(URL)

      setCopyText('Copied')
      setTimeout(() => {
        setCopyText('Copy')
        setIsFocused(false)
      }, 3000)
    } else if (permissionStatus.state === 'denied') {
      alert('Your clipboard permission is blocked, enable it to copy text.')
    }
  }

  async function getPermission() {
    const permissionStatus = await navigator.permissions.query({
      name: permissionName,
    })

    if (permissionStatus.state === 'prompt') {
      navigator.clipboard.writeText('')
    }
  }

  async function onShare() {
    const environment =
      process.env.NODE_ENV === 'production'
        ? MirrorfulApiEnvironment.Production
        : MirrorfulApiEnvironment.Development
    const client = new MirrorfulApiClient({
      environment,
    })

    const finalOrgId = orgId ? orgId : TRIGGER_DEV_ORG_ID
    const finalFileId = fileId ? fileId : generateRandomId()

    await client.registry.updateFile(finalOrgId, finalFileId, {
      code,
    })

    navigate(`/${finalOrgId}/${finalFileId}`)
  }

  return (
    <Box
      css={{
        width: '100%',
        height: '52px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      borderBottomWidth={'1px'}
      borderColor={'divider'}
    >
      <Box css={{ alignItems: 'center', display: 'flex' }}>
        <Image
          src={logoToUse}
          style={{
            height: isTabletOrMobile ? '20px' : '24px',
            marginRight: '16px',
          }}
        />
        {!isTabletOrMobile && (
          <Text css={{ fontSize: '14px', fontWeight: 'bold' }} color="gray.700">
            Component Sandbox by Mirrorful
          </Text>
        )}
      </Box>
      <Box>
        <Stack direction="row" spacing={4}>
          <Popover>
            <PopoverTrigger>
              <Button
                onClick={() => {
                  onShare()
                }}
                variant="primary"
                size="compact"
                leftIcon={<TbShare />}
              >
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent
              mx={3}
              p={'5px'}
              backgroundColor="bg"
              borderColor={'divider'}
            >
              <PopoverBody
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <Flex justifyContent={'flex-start'} alignItems="center">
                  <TbPlanet color="white" />
                  <Text ml="2" fontSize="14" fontWeight="bold" color="white">
                    Share your sandbox
                  </Text>
                  <PopoverCloseButton color="white" />
                </Flex>
                <InputGroup size="sm">
                  {/* <InputLeftAddon children="URL" /> */}
                  <Input
                    onFocus={() => {
                      setIsFocused(true)
                    }}
                    onBlur={() => {
                      setIsFocused(false)
                    }}
                    isReadOnly
                    size="sm"
                    borderColor={isFocused ? '#805AD5' : 'divider'}
                    _hover={{ borderColor: '#805AD5' }}
                    focusBorderColor={'#805AD5'}
                    value={URL}
                    color="white"
                    style={{ cursor: 'pointer', borderRadius: '5px' }}
                    onClick={async () => await onCopy()}
                  />
                </InputGroup>
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    disabled={copyText === 'Copied'}
                    variant="secondary"
                    size="compact"
                    css={{
                      minWidth: '135px', // no jumping when pressing copy
                    }}
                    onClick={async () => await onCopy()}
                  >
                    {copyText === 'Copied' && (
                      <>
                        <Text mr={2} color="playgroundTextHover">
                          Copied Link
                        </Text>
                        <TbCheck />
                      </>
                    )}
                    {copyText === 'Copy' && (
                      <Text color="white">Copy Link</Text>
                    )}
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {isTabletOrMobile && (
            <Button
              variant="secondary"
              size="compact"
              leftIcon={<FiCloudLightning />}
              onClick={onRun}
            >
              Run
            </Button>
          )}
          {/* <Button
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
          </Button> */}
          {/* <Button variant="secondary" size="compact">
            <MoonIcon />
          </Button> */}
        </Stack>
      </Box>
    </Box>
  )
}
