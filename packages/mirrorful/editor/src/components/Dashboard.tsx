import { useDisclosure, Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TColorData } from 'types'
import { ColorPaletteSection } from './ColorPalette/ColorPaletteSection'
import { ExportSuccessModal } from './ExportSuccessModal'
import { Onboarding } from './Onboarding'
import posthog from 'posthog-js'

export function Dashboard() {
  const [shouldForceSkipOnboarding, setShouldForceSkipOnboarding] =
    useState<boolean>(false)

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)
  const [colors, setColors] = useState<TColorData[]>([])
  const {
    isOpen: isExportSuccessModalOpen,
    onOpen: onExportSuccessModalOpen,
    onClose: onExportSuccessModalClose,
  } = useDisclosure()

  useEffect(() => {
    const fetchStoredData = async () => {
      const response = await fetch('/api/store')
      const data = await response.json()
      if (!data || !data.colorData || data.colorData.length === 0) {
        setShowOnboarding(true)
      }
      setColors(data.colorData ?? [])
    }

    fetchStoredData()
  }, [showOnboarding])

  const handleExport = async () => {
    posthog.capture('EXPORT_CONFIG')

    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        colorData: colors,
      }),
    })

    onExportSuccessModalOpen()
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
        <ColorPaletteSection colors={colors} onUpdateColors={setColors} />
      </Box>
      <ExportSuccessModal
        isOpen={isExportSuccessModalOpen}
        onClose={onExportSuccessModalClose}
      />
    </Box>
  )
}
