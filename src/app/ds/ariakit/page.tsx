'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import { ARIAKIT_COMPONENT_DATA } from '@/components/Libraries/Ariakit'

export default function AriaPage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'Aria Kit',
        library: 'ariakit',
        websiteLink: 'https://ariakit.org/',
        lastRelease: 'Jan 19th, 2024',
        githubStarCount: '7.4K',
        githubLink: 'https://github.com/ariakit/ariakit',
        npmDownloadCount: '55K',
        npmLink: 'https://www.npmjs.com/package/@ariakit/react',
      }}
      componentRender={
        <>
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {ARIAKIT_COMPONENT_DATA.map((data) => {
                return (
                  <ComponentCard
                    key={`${data.library}-${data.name}`}
                    name={data.name}
                    library={data.library}
                    docsLink={data.docsLink ?? 'https://ariakit.org/'}
                  >
                    {data.component}
                  </ComponentCard>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      }
      showcaseData={[]}
    />
  )
}
