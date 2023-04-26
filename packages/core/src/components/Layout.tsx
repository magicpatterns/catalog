import {
  Box,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { TMirrorfulStore } from '@core/types'
import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { ExportSettingsModal } from '../components/ExportSettingsModal'
import { ExportSuccessModal } from '../components/ExportSuccessModal'
import useMirrorfulStore, { MirrorfulState } from '../store/useMirrorfulStore'
import { AlertDialogDelete } from './AlertDialogDelete'
import { Sidebar } from './Sidebar/Sidebar'
import { darkTheme, lightTheme } from './theme'

export type TPlatform = 'package' | 'web'

export type TTab =
  | '/colors'
  | '/typography'
  | '/shadows'
  | '/theme_manager'
  | '/components'

export default function Layout({
  children,
  isLoading = false,
  platform = 'package',
  postStoreData,
}: {
  children: React.ReactNode
  isLoading?: boolean
  platform?: TPlatform
  postStoreData: (data: TMirrorfulStore) => Promise<void>
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

  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const backgroundColor = useColorModeValue(
    lightTheme.backgroundColors.primary,
    darkTheme.backgroundColors.primary
  )

  const handleExport = async () => {
    await postStoreData({
      primitives: { colors, typography, shadows },
      themes: [],
      files: fileTypes,
    })

    onExportSuccessModalOpen()
  }

  const onDeleteData = async () => {
    onDeleteAlertDialogClose()
    setColors({})
    setTypography({ fontSizes: {}, fontWeights: {}, lineHeights: {} })
    setShadows({})
    await postStoreData({
      primitives: {
        colors: {},
        typography: { fontSizes: {}, fontWeights: {}, lineHeights: {} },
        shadows: {},
      },
      themes: [],
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
          bg={backgroundColor}
          css={{
            flexGrow: 1,
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
          primitives={{ colors, typography, shadows }}
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
