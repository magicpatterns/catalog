import { Box, Spinner, useDisclosure } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { TTab } from '../components/Dashboard'
import { Sidebar } from '../components/Dashboard/Sidebar'
import { ExportSettingsModal } from '../components/ExportSettingsModal'
import { ExportSuccessModal } from '../components/ExportSuccessModal'
import { Onboarding } from '../components/Onboarding'
import useMirrorfulStore, { MirrorfulState } from '../store/useMirrorfulStore'
import postStoreData from '../utils/postStoreData'

type props = { children: React.ReactNode; isLoading?: boolean }
export function Layout({ children, isLoading = false }: props) {
  const platform = 'package'
  const router = useRouter()
  const currentTab =
    router.pathname === '/'
      ? 'colors'
      : (router.pathname.replace('/', '') as TTab)

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const {
    colors,
    typography,
    shadows,
    fileTypes,
    setFileTypes,
    setShouldForceSkipOnboarding,
    setShowOnBoarding,
    shouldForceSkipOnboarding,
    showOnBoarding,
  } = useMirrorfulStore((state: MirrorfulState) => state)
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

  if (!shouldForceSkipOnboarding && showOnBoarding) {
    return (
      <Onboarding
        postStoreData={postStoreData}
        onFinishOnboarding={() => {
          setShowOnBoarding(false)
          setShouldForceSkipOnboarding(true)
        }}
        platform={'package'}
      />
    )
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
