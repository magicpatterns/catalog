import { Theme } from '@radix-ui/themes'

import { DefaultContainer } from '@/components/DefaultContainer'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function DsPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Theme accentColor="indigo" panelBackground="translucent">
      <Navbar />
      <main>
        <DefaultContainer py="6">{children}</DefaultContainer>
      </main>
      <Footer />
    </Theme>
  )
}
