'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import {
  BOOTSTRAP_COMPONENT_DATA,
  BOOTSTRAP_SHOWCASE_DATA,
} from '@/components/Libraries/Bootstrap'

export default function BootstrapPage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'Bootstrap',
        library: 'bootstrap',
        websiteLink: 'https://react-bootstrap.netlify.app/',
        lastRelease: 'Jan 17th, 2024',
        githubStarCount: '22K',
        githubLink: 'https://github.com/react-bootstrap/react-bootstrap',
        npmDownloadCount: '1.5M',
        npmLink: 'https://www.npmjs.com/package/react-bootstrap',
      }}
      componentRender={
        <>
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {BOOTSTRAP_COMPONENT_DATA.map((data) => {
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
      showcaseData={BOOTSTRAP_SHOWCASE_DATA}
    />
  )
}
