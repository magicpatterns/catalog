'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ComponentCard } from '@/components/ComponentCard'
import { DesignSystemPageLayout } from '@/components/DesignSystem/DesignSystemPageLayout'
import {
  MUI_COMPONENT_DATA,
  MUI_SHOWCASE_DATA,
} from '@/components/Libraries/Mui'

export default function MuiPage() {
  return (
    <DesignSystemPageLayout
      metadata={{
        name: 'Material UI',
        library: 'mui',
        websiteLink: 'https://mui.com/core/',
        lastRelease: 'Jan 17th, 2024',
        githubStarCount: '90K',
        githubLink: 'https://github.com/mui/material-ui',
        npmDownloadCount: '3M',
        npmLink: 'https://www.npmjs.com/package/@mui/material',
      }}
      componentRender={
        <>
          <ResponsiveMasonry>
            <Masonry gutter="18px">
              {MUI_COMPONENT_DATA.map((data) => {
                return (
                  <ComponentCard
                    key={`${data.library}-${data.name}`}
                    name={data.name}
                    library={data.library}
                    docsLink={data.docsLink ?? 'https://mui.com/'}
                  >
                    {data.component}
                  </ComponentCard>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </>
      }
      showcaseData={MUI_SHOWCASE_DATA}
    />
  )
}
