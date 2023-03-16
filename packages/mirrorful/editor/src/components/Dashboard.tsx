import { useDisclosure, Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TColorData, TConfig, TTypographyData } from 'types'
import { ColorPaletteSection } from './ColorPalette/ColorPaletteSection'
import { ExportSuccessModal } from './ExportSuccessModal'
import { Onboarding } from './Onboarding'
import posthog from 'posthog-js'
import { TypographySection } from './Typography/TypographySection'

export function Dashboard() {
  const [shouldForceSkipOnboarding, setShouldForceSkipOnboarding] =
    useState<boolean>(false)

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)
  const [colors, setColors] = useState<TColorData[]>([])
  const [typography, setTypography] = useState<TTypographyData>({
    fontSizes: [],
  })

  const {
    isOpen: isExportSuccessModalOpen,
    onOpen: onExportSuccessModalOpen,
    onClose: onExportSuccessModalClose,
  } = useDisclosure()

  useEffect(() => {
    const fetchStoredData = async () => {
      const response = await fetch('/api/config')
      const data: TConfig | undefined = await response.json()

      if (
        !data ||
        !data.tokens.colorData ||
        data.tokens.colorData.length === 0
      ) {
        setShowOnboarding(true)
        return
      }

      setColors(data.tokens.colorData ?? [])
      setTypography(data.tokens.typography)
    }

    fetchStoredData()
  }, [showOnboarding])

  const handleExport = async () => {
    posthog.capture('EXPORT_CONFIG')

    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        tokens: { colorData: colors, typography },
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
      }),
    })
  }

  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        tokens: { colorData: colors, typography: data },
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
          <Button colorScheme="blue" onClick={handleExport}>
            Export Config
          </Button>
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
      <ExportSuccessModal
        primaryName={colors && colors[0] ? colors[0].name : 'primary'}
        isOpen={isExportSuccessModalOpen}
        onClose={onExportSuccessModalClose}
      />
    </Box>
  )
}
