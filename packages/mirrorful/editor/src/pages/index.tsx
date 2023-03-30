import { Box, useDisclosure } from '@chakra-ui/react'
import { TTab } from '@mirrorful/core/lib/components/Dashboard'
import { TColorData } from '@mirrorful/core/lib/types'
import Head from 'next/head'
import { useState } from 'react'
import postStoreData from 'src/utils/postStoreData'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'
import { Sidebar } from '@mirrorful/core/src/components/Dashboard/Sidebar'
import { ColorPaletteSection } from '@mirrorful/core/lib/components/ColorPalette/ColorPaletteSection'

export default function Editor() {
  const { colors, typography, shadows, fileTypes, setColors } =
    useMirrorfulStore((state) => state)
  const handleUpdateColors = async (data: TColorData[]) => {
    setColors(data)
    await postStoreData({
      tokens: {
        typography,
        colorData: data,
        shadows,
      },
      files: fileTypes,
    })
  }
  return (
    <>
      <Head>
        <title>Mirrorful Editor</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Local editor for your design system"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ColorPaletteSection
          colors={colors}
          onUpdateColors={handleUpdateColors}
        ></ColorPaletteSection>
      </Layout>
      {/* <Dashboard
        fetchStoreData={async () => {
          const response = await fetch('/api/config')
          const data: TConfig = await response.json()

          return data
        }}
        postStoreData={async (data) => {
          await fetch('/api/export', {
            method: 'POST',
            body: JSON.stringify(data),
          })
        }}
      /> */}
    </>
  )
}

type props = { children: React.ReactNode }
export function Layout({ children }: props) {
  const platform = 'package'
  const [tab, setTab] = useState<TTab>('colors')
  const { colors, typography, shadows, fileTypes } = useMirrorfulStore(
    (state) => state
  )
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

  const handleExport = async () => {
    await postStoreData({
      tokens: { colorData: colors, typography, shadows },
      files: fileTypes,
    })

    onExportSuccessModalOpen()
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
          isDisabled={false}
        />
      </Box>
      <Box css={{ minWidth: '300px' }} />
      <Box
        css={{ backgroundColor: 'white', flexGrow: 1 }}
        padding={{
          base: '24px 48px',
          md: '36px 72px',
          lg: '48px 96px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
