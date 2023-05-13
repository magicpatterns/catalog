import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Editor() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/colors')
  }, [router])

  // Note: the local editor is using pages dir, while web is using app dir
  // So we have a <Head> here, but not in web.
  return (
    <>
      <Head>
        <title>Mirrorful Editor</title>
        <meta property="og:title" content="Mirrorful" key="title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          property="og:image"
          content="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/components_graphic_dark.png"
        />
        <meta
          property="og:description"
          content="Create, edit, and manage your app's theme."
        />
        <meta
          name="description"
          content="Create, edit, and manage your app's theme."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/components_graphic_dark.png"
        />
        <link
          rel="preload"
          href="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/components_graphic_light.png"
        />
      </Head>
    </>
  )
}
