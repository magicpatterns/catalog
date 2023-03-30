import { Box } from '@chakra-ui/react'
import { Dashboard, TTab } from '@mirrorful/core/lib/components/Dashboard'
import { TConfig } from '@mirrorful/core/lib/types'
import Head from 'next/head'
import { platform } from 'os'

export default function Editor() {
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
      <Dashboard
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
      />
    </>
  )
}

type props = { children: React.ReactNode }
function Layout({ children }: props) {
  return (
    <Box css={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Box css={{ width: '300px', position: 'fixed' }}>
        <Sidebar
          platform={platform}
          activeTab={tab}
          onSelectTab={(newTab: TTab) => setTab(newTab)}
          onOpenSettings={() => onExportSettingsModalOpen()}
          onExport={handleExport}
          isDisabled={isLoading}
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
      ></Box>
    </Box>
  )
}
