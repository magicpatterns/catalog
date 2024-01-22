'use client'

import * as React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import {
  RADIX_COMPONENT_DATA,
  RADIX_SHOWCASE_DATA,
} from '@/components/Libraries/Radix'
import { RadixWrapper } from '@/components/Libraries/Radix/RadixWrapper'

export default function RadixPage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'Radix Themes',
        library: 'radix',
        websiteLink: 'https://www.radix-ui.com/',
        lastRelease: 'Dec 20th, 2023',
        githubStarCount: '3K',
        githubLink: 'https://github.com/radix-ui/themes',
        npmDownloadCount: '38K',
        npmLink: 'https://www.npmjs.com/package/radix-ui',
      }}
      componentRender={
        <>
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {RADIX_COMPONENT_DATA.map((data) => {
                return (
                  <ComponentCard
                    key={`${data.library}-${data.name}`}
                    name={data.name}
                    library={data.library}
                    docsLink={data.docsLink ?? 'https://www.radix-ui.com/'}
                  >
                    <RadixWrapper>{data.component}</RadixWrapper>
                  </ComponentCard>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      }
      showcaseData={RADIX_SHOWCASE_DATA}
    />
  )
}
