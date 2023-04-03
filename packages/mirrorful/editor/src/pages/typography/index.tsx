// import { TypographySection } from '@mirrorful/core/lib/components/Typography/TypographySection'
// import useMirrorfulStore, {
//   MirrorfulState,
// } from '@mirrorful/core/lib/store/useMirrorfulStore'
// import { TTypographyData } from '@mirrorful/core/lib/types'
// import postStoreData from '@mirrorful/core/lib/utils/postStoreData'
// import React from 'react'
// import { Layout } from 'src/components/Layout'
// function Typography() {
//   const { typography, colors, shadows, setTypography, fileTypes } =
//     useMirrorfulStore((state: MirrorfulState) => state)
//   const handleUpdateTypography = async (data: TTypographyData) => {
//     setTypography(data)
//     await postStoreData({
//       tokens: { colorData: colors, typography: data, shadows },
//       files: fileTypes,
//     })
//   }
//   return (
//     <Layout>
//       <TypographySection
//         typography={{ fontSizes: typography.fontSizes }}
//         onUpdateTypography={handleUpdateTypography}
//       />
//     </Layout>
//   )
// }

// export default Typography

import TypographyPage from '@mirrorful/core/lib/pages/typography'
import React from 'react'
import postStoreData from 'src/utils/postStoreData'

export default function Typography() {
  return <TypographyPage postStoreData={postStoreData} />
}
