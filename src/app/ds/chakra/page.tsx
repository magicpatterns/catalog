'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import {
  CHAKRA_COMPONENT_DATA,
  CHAKRA_SHOWCASE_DATA,
} from '@/components/Libraries/Chakra'

export default function ChakraPage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'Chakra UI',
        library: 'chakra',
        websiteLink: 'https://chakra-ui.com/',
        lastRelease: 'Nov 9th, 2023',
        githubStarCount: '35K',
        githubLink: 'https://github.com/chakra-ui/chakra-ui',
        npmDownloadCount: '499K',
        npmLink: 'https://www.npmjs.com/package/@chakra-ui/react',
      }}
      componentRender={
        <>
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {CHAKRA_COMPONENT_DATA.map((data) => {
                return (
                  <ComponentCard
                    key={`${data.library}-${data.name}`}
                    name={data.name}
                    library={data.library}
                    docsLink={data.docsLink}
                  >
                    {data.component}
                  </ComponentCard>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      }
      showcaseData={CHAKRA_SHOWCASE_DATA}
    />
  )
}
