'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import {
  SHADCN_COMPONENT_DATA,
  SHADCN_SHOWCASE_DATA,
} from '@/components/Libraries/ShadCn'
import { Toaster } from '@/components/Libraries/ShadCn/raw/ui/toaster'

export default function ShadcnPage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'Shadcn',
        library: 'shadcn',
        websiteLink: 'https://ui.shadcn.com/',
        lastRelease: 'Jan 21st, 2023',
        githubStarCount: '45K',
        githubLink: '',
        npmDownloadCount: '75K',
        npmLink: '',
      }}
      componentRender={
        <>
          <Toaster />
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {SHADCN_COMPONENT_DATA.map((data) => {
                return (
                  <ComponentCard
                    key={`${data.library}-${data.name}`}
                    name={data.name}
                    library={data.library}
                    docsLink={data.docsLink ?? 'https://ui.shadcn.com/'}
                  >
                    {data.component}
                  </ComponentCard>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      }
      showcaseData={SHADCN_SHOWCASE_DATA}
    />
  )
}
