import { Box, Spinner, useDisclosure } from '@chakra-ui/react'
import { TTab } from '@mirrorful/core/lib/components/Dashboard'
import { Sidebar } from '@mirrorful/core/lib/components/Dashboard/Sidebar'
import { ExportSettingsModal } from '@mirrorful/core/lib/components/ExportSettingsModal'
import { ExportSuccessModal } from '@mirrorful/core/lib/components/ExportSuccessModal'
import useMirrorfulStore, {
  MirrorfulState,
} from '@mirrorful/core/lib/store/useMirrorfulStore'
import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import postStoreData from '../utils/postStoreData'

export type TPlatform = 'package' | 'web'

// export type TTab = '/' | 'typography' | 'shadows' | 'theme_manager'

type props = {
  children: React.ReactNode
  isLoading?: boolean
  platform?: TPlatform
}
export function Layout({
  children,
  isLoading = false,
  platform = 'package',
}: props) {
  const router = useRouter()
  // TODO replace TTab with accordance to the pathname
  const currentTab =
    router.pathname === '/' ? '/colors' : (router.pathname as TTab)

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
