'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import { ANT_COMPONENT_DATA } from '@/components/Libraries/Ant'

export default function AntPage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'AntD',
        library: 'ant',
        websiteLink: 'https://ant.design/',
        lastRelease: 'Jan 19th, 2024',
        githubStarCount: '89K',
        githubLink: 'https://github.com/ant-design/ant-design',
        npmDownloadCount: '1.2M',
        npmLink: 'https://www.npmjs.com/package/antd',
      }}
      componentRender={
        <>
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {ANT_COMPONENT_DATA.map((data) => {
                return (
                  <ComponentCard
                    key={`${data.library}-${data.name}`}
                    name={data.name}
                    library={data.library}
                    docsLink={data.docsLink ?? 'https://ant.design/'}
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
