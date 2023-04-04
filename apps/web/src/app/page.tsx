'use client'

import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/colors')
  }, [router])

  return (
    <Head>
      <title>Mirrorful Editor</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Create, edit, and manage your app's theme."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
