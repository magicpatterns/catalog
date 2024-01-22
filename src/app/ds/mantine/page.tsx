'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import {
  MANTINE_COMPONENT_DATA,
  MANTINE_SHOWCASE_DATA,
} from '@/components/Libraries/Mantine'

export default function MantinePage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'Mantine',
        library: 'mantine',
        websiteLink: 'https://mantine.dev/',
        lastRelease: 'September 19th, 2023',
        githubStarCount: '23K',
        githubLink: 'https://github.com/mantinedev/mantine',
        npmDownloadCount: '281K',
        npmLink: 'https://www.npmjs.com/package/@mantine/core',
      }}
      componentRender={
        <>
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {MANTINE_COMPONENT_DATA.map((data) => {
                return (
                  <ComponentCard
                    key={`${data.library}-${data.name}`}
                    name={data.name}
                    library={data.library}
                    docsLink={data.docsLink ?? 'https://mantine.dev/'}
                  >
                    {data.component}
                  </ComponentCard>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      }
      showcaseData={MANTINE_SHOWCASE_DATA}
    />
  )
}
