import { Dashboard } from '@mirrorful/core/lib/components/Dashboard'
import { TConfig } from '@mirrorful/core/lib/types'
import Head from 'next/head'

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
