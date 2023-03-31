import { Box, Spinner, useDisclosure } from '@chakra-ui/react'
import { TTab } from '@mirrorful/core/lib/components/Dashboard'
import { defaultShadows, TColorData } from '@mirrorful/core/lib/types'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import postStoreData from 'src/utils/postStoreData'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'
import { Sidebar } from '@mirrorful/core/lib/components/Dashboard/Sidebar'
import { ExportSuccessModal } from '@mirrorful/core/lib/components/ExportSuccessModal'
import { ExportSettingsModal } from '@mirrorful/core/lib/components/ExportSettingsModal'
import { ColorPaletteSection } from '@mirrorful/core/lib/components/ColorPalette/ColorPaletteSection'
import { useRouter } from 'next/router'
import fetchStoreData from 'src/utils/fetchStoreData'
import { AnimatePresence, motion } from 'framer-motion'

export default function Editor() {
  const [isLoading, setIsLoading] = useState(true)
  const {
    colors,
    typography,
    shadows,
    fileTypes,
    setColors,
    setTypography,
    setShadows,
    setFileTypes,
  } = useMirrorfulStore((state) => state)

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

  useEffect(() => {
    const fetchStoredData = async () => {
      const data = await fetchStoreData()
      if (
        !Object.keys(data).length ||
        !data.tokens.colorData ||
        data.tokens.colorData.length === 0
      ) {
        //  setIsLoading(false)
        //  setShowOnboarding(true)
        return
      }
      setColors(data.tokens.colorData ?? [])
      setTypography(data.tokens.typography)
      setShadows(data.tokens.shadows ?? defaultShadows)
      setFileTypes(data.files)
    }
    fetchStoredData()
  }, [])
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
      <Layout isLoading={isLoading}>
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

type props = { children: React.ReactNode; isLoading?: boolean }
export function Layout({ children, isLoading = false }: props) {
  const platform = 'package'
  const router = useRouter()
  const [tab, setTab] = useState<TTab>(
    router.pathname === '/'
      ? 'colors'
      : (router.pathname.replace('/', '') as TTab)
  )
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { colors, typography, shadows, fileTypes, setFileTypes } =
    useMirrorfulStore((state) => state)
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
      <motion.div
        animate={{
          width: isSidebarCollapsed ? '50px' : '300px',
          position: 'fixed',
        }}
      >
        <Sidebar
          platform={platform}
          activeTab={tab}
          onSelectTab={(newTab: TTab) => router.push(newTab)}
          onOpenSettings={() => onExportSettingsModalOpen()}
          onExport={handleExport}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapsed={() => setIsSidebarCollapsed((prev) => !prev)}
        />
      </motion.div>
      <motion.div
        animate={{
          minWidth: isSidebarCollapsed ? ' 150px' : '300px',
        }}
      />
      <Box
        css={{ backgroundColor: 'white', flexGrow: 1 }}
        padding={{
          base: '24px 48px',
          md: '36px 72px',
          lg: '48px 96px',
        }}
      >
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner size="xl" color="blue.500" borderWidth="3px" />
            </motion.div>
          ) : (
            <>{children}</>
          )}
        </AnimatePresence>
      </Box>
      <ExportSuccessModal
        platform={platform}
        primaryName={colors && colors[0] ? colors[0].name : 'primary'}
        isOpen={isExportSuccessModalOpen}
        onClose={onExportSuccessModalClose}
        tokens={{ colorData: colors, typography, shadows }}
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
