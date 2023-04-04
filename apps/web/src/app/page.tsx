'use client'
import { DashboardWrapper } from '@web/components/DashboardWrapper'
import Head from 'next/head'
import { useRouter } from 'next/navigation'

// export const metadata = {
//   title: 'Mirrorful Editor',
//   description: `Create, edit, and manage your app's theme.`,
// }

export default function Home() {
  const router = useRouter()
  router.replace('/colors')

  return (
    <Head>
      <title>Mirrorful Editor</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Local editor for your design system" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
  // <DashboardWrapper />
}
