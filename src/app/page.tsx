import { Box, Theme } from '@radix-ui/themes'
import { Metadata } from 'next'

import '@radix-ui/themes/styles.css'
import '../output.css'

// import { Footer } from '@/components/Footer'
// import { ComponentTypeSection } from '@/components/Landing/ComponentTypeSection'
// import { DesignSystemSection } from '@/components/Landing/DesignSystemSection'
// import { HeroSection } from '@/components/Landing/HeroSection'
// import { NewsletterCta } from '@/components/NewsletterCta'
import { RedirectComponent } from '@/components/RedirectComponent'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Components ready for production.',
  openGraph: {
    title: 'Find the perfect component.',
  },
  twitter: {
    title: 'Find the perfect component.',
  },
}
export default function Catalog() {
  return (
    <RedirectComponent />
    // <Theme accentColor="indigo" panelBackground="translucent">
    //   <HeroSection />
    //   <DesignSystemSection />
    //   <ComponentTypeSection />
    //   <Box mt="8" />
    //   <NewsletterCta />
    //   <Footer />
    // </Theme>
  )
}
