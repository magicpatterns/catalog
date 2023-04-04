import { Box, Spinner, useDisclosure } from '@chakra-ui/react'
import { TConfig } from '@core/types'
import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { TTab } from '../components/Dashboard'
import { Sidebar } from '../components/Dashboard/Sidebar'
import { ExportSettingsModal } from '../components/ExportSettingsModal'
import { ExportSuccessModal } from '../components/ExportSuccessModal'
import useMirrorfulStore, { MirrorfulState } from '../store/useMirrorfulStore'
// import postStoreData from '../utils/postStoreData'

export type TPlatform = 'package' | 'web'

// export type TTab = '/' | 'typography' | 'shadows' | 'theme_manager'

type props = {
  children: React.ReactNode
  isLoading?: boolean
  platform?: TPlatform
  postStoreData: (data: TConfig) => Promise<void>
}
export function Layout({
  children,
  isLoading = false,
  platform = 'package',
  postStoreData,
}: props) {
  const router = useRouter()
  const pathname = usePathname()
  // TODO replace TTab with accordance to the pathname
  const currentTab = pathname === '/' ? '/colors' : (pathname as TTab)

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { colors, typography, shadows, fileTypes, setFileTypes } =
    useMirrorfulStore((state: MirrorfulState) => state)
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
      <Box css={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
        <motion.div
          animate={{
            width: isSidebarCollapsed ? '50px' : '300px',
            position: 'fixed',
          }}
        >
          <Sidebar
            platform={platform}
            activeTab={currentTab}
            onSelectTab={(newTab: TTab) => router.push(newTab)}
            onOpenSettings={() => onExportSettingsModalOpen()}
            onExport={handleExport}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapsed={() => setIsSidebarCollapsed((prev) => !prev)}
          />
        </motion.div>
        <motion.div
          animate={{
            minWidth: isSidebarCollapsed ? ' 100px' : '350px',
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
    </>
  )
}
