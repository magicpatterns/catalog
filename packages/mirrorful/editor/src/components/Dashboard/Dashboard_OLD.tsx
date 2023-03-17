import {
  useDisclosure,
  Box,
  Button,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TColorData, TConfig, TExportFileType, TTypographyData } from 'types'
import { ColorPaletteSection } from './ColorPalette/ColorPaletteSection'
import { ExportSuccessModal } from './ExportSuccessModal'
import { Onboarding } from './Onboarding'
import posthog from 'posthog-js'
import { TypographySection } from './Typography/TypographySection'
import { SettingsIcon } from '@chakra-ui/icons'
import { ExportSettingsModal } from './ExportSettingsModal'

export function Dashboard() {
  const [shouldForceSkipOnboarding, setShouldForceSkipOnboarding] =
    useState<boolean>(false)

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)
  const [colors, setColors] = useState<TColorData[]>([])
  const [typography, setTypography] = useState<TTypographyData>({
    fontSizes: [],
  })
  const [fileTypes, setFileTypes] = useState<TExportFileType[]>([])

  const {
    isOpen: isExportSuccessModalOpen,
    onOpen: onExportSuccessModalOpen,
    onClose: onExportSuccessModalClose,
  } = useDisclosure()

  const {
    isOpen: isExportSettingsModalOpen,
    onOpen: onExportSettingsModalOpen,
    onClose: onExportSettingsModalClose,
  } = useDisclosure()

  useEffect(() => {
    const fetchStoredData = async () => {
      const response = await fetch('/api/config')
      const data: TConfig | Record<string, never> = await response.json()

      if (
        !Object.keys(data).length ||
        !data.tokens.colorData ||
        data.tokens.colorData.length === 0
      ) {
        setShowOnboarding(true)
        return
      }

      setColors(data.tokens.colorData ?? [])
      setTypography(data.tokens.typography)
      setFileTypes(data.files)
    }

    fetchStoredData()
  }, [showOnboarding])

  const handleExport = async () => {
    posthog.capture('EXPORT_CONFIG')

    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        tokens: { colorData: colors, typography },
        files: fileTypes,
      }),
    })

    onExportSuccessModalOpen()
  }

  const handleUpdateColors = async (data: TColorData[]) => {
    setColors(data)
    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        tokens: {
          typography,
          colorData: data,
        },
        files: fileTypes,
      }),
    })
  }

  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        tokens: { colorData: colors, typography: data },
        files: fileTypes,
      }),
    })
  }

  if (!shouldForceSkipOnboarding && showOnboarding) {
    return (
      <Onboarding
        onFinishOnboarding={() => {
          setShowOnboarding(false)
          setShouldForceSkipOnboarding(true)
        }}
      />
    )
  }

  return (
    <Box>
      <Box
        css={{
          position: 'fixed',
          width: '100vw',
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          zIndex: 5,
          height: '56px',
        }}
      >
        <Box
          css={{
            display: 'flex',
            padding: '8px 48px',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <img src="/mirrorful_logo.png" style={{ height: '39px' }} />
          </Box>
          <ButtonGroup isAttached>
            <Button colorScheme="blue" onClick={handleExport}>
              Export Config
            </Button>
            <IconButton
              onClick={onExportSettingsModalOpen}
              aria-label="Update export settings"
              icon={<SettingsIcon />}
            />
          </ButtonGroup>
          <Box />
        </Box>
        <Box
          css={{
            height: '1px',
            width: '100%',
            background: 'linear-gradient(to right, #F5F5F5, #3F3F3F, #F5F5F5)',
          }}
        />
      </Box>

      <Box
        padding={{
          base: '80px 48px 16px 48px',
        }}
      >
        <ColorPaletteSection
          colors={colors}
          onUpdateColors={handleUpdateColors}
        />
      </Box>
      <Box
        padding={{
          base: '80px 48px 16px 48px',
        }}
      >
        <TypographySection
          typography={typography}
          onUpdateTypography={handleUpdateTypography}
        />
      </Box>
      <Box css={{ marginBottom: '64px' }} />
      <ExportSettingsModal
        isOpen={isExportSettingsModalOpen}
        onClose={onExportSettingsModalClose}
        fileTypes={fileTypes}
        onUpdateFileTypes={setFileTypes}
      />
      <ExportSuccessModal
        primaryName={colors && colors[0] ? colors[0].name : 'primary'}
        isOpen={isExportSuccessModalOpen}
        onClose={onExportSuccessModalClose}
      />
    </Box>
  )
}
