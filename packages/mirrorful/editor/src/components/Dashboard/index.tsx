import { Box, useDisclosure } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { useState, useEffect } from 'react'
import { ColorPaletteSection } from 'components/ColorPalette/ColorPaletteSection'
import { TColorData, TTypographyData } from 'types'
import posthog from 'posthog-js'
import { Onboarding } from 'components/Onboarding'
import { ExportSuccessModal } from 'components/ExportSuccessModal'
import { TypographySection } from 'components/Typography/TypographySection'

export type TTab = 'colors' | 'typography'

export function Dashboard() {
  const [tab, setTab] = useState<'colors' | 'typography'>('colors')
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
      const data = await response.json()
      if (!data || !data.colorData || data.colorData.length === 0) {
        setShowOnboarding(true)
      }
      setColors(data.colorData ?? [])
      setTypography(data.typography)
    }

    fetchStoredData()
  }, [showOnboarding])

  const handleExport = async () => {
    posthog.capture('EXPORT_CONFIG')

    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        colorData: colors,
        typography,
      }),
    })

    onExportSuccessModalOpen()
  }

  const handleUpdateColors = async (data: TColorData[]) => {
    setColors(data)
    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        typography,
        colorData: data,
      }),
    })
  }

  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        colorData: colors,
        typography: data,
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
    <Box css={{ width: '100vw', minHeight: '100vh', display: 'flex' }}>
      <Box css={{ width: '300px' }}>
        <Sidebar
          activeTab={tab}
          onSelectTab={(newTab: TTab) => setTab(newTab)}
        />
      </Box>
      <Box
        css={{ flexGrow: 1, backgroundColor: 'white', padding: '64px 128px' }}
      >
        {tab === 'colors' && (
          <ColorPaletteSection
            colors={colors}
            onUpdateColors={handleUpdateColors}
          />
        )}
        {tab === 'typography' && (
          <TypographySection
            typography={typography}
            onUpdateTypography={handleUpdateTypography}
          />
        )}
      </Box>
      <ExportSuccessModal
        primaryName={colors && colors[0] ? colors[0].name : 'primary'}
        isOpen={isExportSuccessModalOpen}
        onClose={onExportSuccessModalClose}
      />
    </Box>
  )
}
