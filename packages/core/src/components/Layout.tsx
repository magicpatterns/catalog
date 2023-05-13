import { Box, Spinner, useDisclosure } from '@chakra-ui/react'
import { postStoreData } from '@core/api/postStoreData'
import { useAuthInfo } from '@propelauth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { ExportSettingsModal } from '../components/ExportSettingsModal'
import { ExportSuccessModal } from '../components/ExportSuccessModal'
import useMirrorfulStore, { MirrorfulState } from '../store/useMirrorfulStore'
import { AlertDialogDelete } from './AlertDialogDelete'
import { Sidebar } from './Sidebar/Sidebar'

export type TPlatform = 'package' | 'web'

export type TTab =
  | '/colors'
  | '/typography'
  | '/shadows'
  | '/themes'
  | '/components'

export default function Layout({
  children,
  isLoading = false,
  platform = 'package',
}: {
  children: React.ReactNode
  isLoading?: boolean
  platform?: TPlatform
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const {
    colors,
    setColors,
    typography,
    setTypography,
    shadows,
    setShadows,
    fileTypes,
    setFileTypes,
    themes,
  } = useMirrorfulStore((state: MirrorfulState) => state)
  const authInfo = useAuthInfo()
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

  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const handleExport = async () => {
    await postStoreData({
      newData: {
        primitives: { colors, typography, shadows },
        themes: [],
        files: fileTypes,
      },
      authInfo: authInfo,
      storeId: '456',
    })

    onExportSuccessModalOpen()
  }

  const onDeleteData = async () => {
    onDeleteAlertDialogClose()
    setColors({})
    setTypography({ fontSizes: {}, fontWeights: {}, lineHeights: {} })
    setShadows({})
    await postStoreData({
      newData: {
        primitives: {
          colors: {},
          typography: { fontSizes: {}, fontWeights: {}, lineHeights: {} },
          shadows: {},
        },
        themes: [],
        files: fileTypes,
      },
      authInfo,
      storeId: '456',
    })
  }

  return (
    <>
      <Box css={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
        <motion.div
          animate={{
            width: isSidebarCollapsed ? '50px' : '250px',
            position: 'fixed',
          }}
        >
          <Sidebar
            platform={platform}
            activeTab={pathname}
            onSelectTab={(newTab: TTab) => router.push(newTab)}
            onOpenSettings={() => onExportSettingsModalOpen()}
            onExport={handleExport}
            onDelete={onDeleteAlertDialogOpen}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapsed={() => setIsSidebarCollapsed((prev) => !prev)}
          />
        </motion.div>
        <motion.div
          animate={{
            minWidth: isSidebarCollapsed ? ' 100px' : '250px',
          }}
        />
        <Box
          css={{
            backgroundColor: 'var(--background-color-primary)',
            flexGrow: 1,
            transition: 'background-color 200ms',
          }}
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
                <Spinner
                  size="xl"
                  color="var(--primary-color)"
                  borderWidth="3px"
                />
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
          primitives={{ colors, typography, shadows }}
          themes={themes}
        />
        {platform === 'web' && (
          <AlertDialogDelete
            isOpen={isAlertDialogOpen}
            onClose={onDeleteAlertDialogClose}
            onDelete={() => onDeleteData()}
            deleteAllTokens={true}
          />
        )}
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
