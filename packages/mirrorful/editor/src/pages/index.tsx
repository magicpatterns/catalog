import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Editor() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/colors')
  }, [router])

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
    </>
  )
}
