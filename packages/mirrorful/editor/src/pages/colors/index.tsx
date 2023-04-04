// import { ColorPaletteSection } from '@mirrorful/core/lib/components/ColorPalette/ColorPaletteSection'
// import useMirrorfulStore, {
//   MirrorfulState,
// } from '@mirrorful/core/lib/store/useMirrorfulStore'
// import { TColorData } from '@mirrorful/core/lib/types'
// import postStoreData from '@mirrorful/core/lib/utils/postStoreData'
// import { Layout } from 'src/components/Layout'

// export default function Colors() {
//   const { colors, typography, shadows, fileTypes, setColors } =
//     useMirrorfulStore((state: MirrorfulState) => state)

//   const handleUpdateColors = async (data: TColorData[]) => {
//     setColors(data)
//     await postStoreData({
//       tokens: {
//         typography,
//         colorData: data,
//         shadows,
//       },
//       files: fileTypes,
//     })
//   }

//   return (
//     <Layout>
//       <ColorPaletteSection
//         colors={colors}
//         onUpdateColors={handleUpdateColors}
//       />
//     </Layout>
//   )
// }

import ColorsPage from '@mirrorful/core/lib/pages/colors'
import React from 'react'
import LayoutWrapper from 'src/components/LayoutWrapper'
import postStoreData from 'src/utils/postStoreData'

export default function Colors() {
  return (
    <LayoutWrapper>
      <ColorsPage postStoreData={postStoreData} />
    </LayoutWrapper>
  )
}
