import { Box, useDisclosure } from '@chakra-ui/react'
import { ColorPaletteSection } from '@core/components/ColorPalette/ColorPaletteSection'
import { ExportSettingsModal } from '@core/components/ExportSettingsModal'
import { ExportSuccessModal } from '@core/components/ExportSuccessModal'
import { Onboarding } from '@core/components/Onboarding'
import { TypographySection } from '@core/components/Typography/TypographySection'
import {
  TColorData,
  TConfig,
  TExportFileType,
  TTypographyData,
} from '@core/types'
import { useEffect, useState } from 'react'

import { Sidebar } from './Sidebar'

export type TPlatform = 'package' | 'web'

export type TTab = 'colors' | 'typography'

export function Dashboard({
  fetchStoreData,
  postStoreData,
  platform = 'package',
}: {
  fetchStoreData: () => Promise<TConfig>
  postStoreData: (data: TConfig) => Promise<void>
  platform?: TPlatform
}) {
  const [tab, setTab] = useState<'colors' | 'typography'>('colors')
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
      const data = await fetchStoreData()

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
    await postStoreData({
      tokens: { colorData: colors, typography },
      files: fileTypes,
    })

    onExportSuccessModalOpen()
  }

  const handleUpdateColors = async (data: TColorData[]) => {
    setColors(data)
    await postStoreData({
      tokens: {
        typography,
        colorData: data,
      },
      files: fileTypes,
    })
  }

  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await postStoreData({
      tokens: { colorData: colors, typography: data },
      files: fileTypes,
    })
  }

  if (!shouldForceSkipOnboarding && showOnboarding) {
    return (
      <Onboarding
        postStoreData={postStoreData}
        onFinishOnboarding={() => {
          setShowOnboarding(false)
          setShouldForceSkipOnboarding(true)
        }}
        platform={platform}
      />
    )
  }

  return (
    <Box css={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Box css={{ width: '300px', position: 'fixed' }}>
        <Sidebar
          platform={platform}
          activeTab={tab}
          onSelectTab={(newTab: TTab) => setTab(newTab)}
          onOpenSettings={() => onExportSettingsModalOpen()}
          onExport={handleExport}
        />
      </Box>
      <Box css={{ minWidth: '300px' }} />
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
        platform={platform}
        primaryName={colors && colors[0] ? colors[0].name : 'primary'}
        isOpen={isExportSuccessModalOpen}
        onClose={onExportSuccessModalClose}
        tokens={{ colorData: colors, typography }}
      />
      {platform === 'package' && (
        <ExportSettingsModal
          isOpen={isExportSettingsModalOpen}
          onClose={onExportSettingsModalClose}
          fileTypes={fileTypes}
          onUpdateFileTypes={setFileTypes}
        />
      )}
    </Box>
  )
}
