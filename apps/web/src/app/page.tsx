'use client'

import { Dashboard } from '@mirrorful/core/components/Dashboard'
import { defaultConfig, TConfig } from '@mirrorful/core/types'
import { useLocalStorage } from '@web/hooks/useLocalStorage'
import Head from 'next/head'

export default function Home() {
  const [data, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )

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
        platform="web"
        fetchStoreData={async () => {
          return data
        }}
        postStoreData={async (newData: TConfig) => {
          setData(newData)
        }}
      />
    </>
  )
}
