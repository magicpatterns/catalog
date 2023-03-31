import { create } from 'zustand'

import { ColorsSlice, createColorsSlice } from './colorsSlice'
import { createFileTypesSlice, FileTypesSlice } from './fileTypesSlice'
import { createShadowsSlice, ShadowsSlice } from './shadowsSlice'
import { createTypographySlice, TypographySlice } from './typographySlice'

const useMirrorfulStore = create<
  TypographySlice & ColorsSlice & ShadowsSlice & FileTypesSlice
>()((...state) => ({
  ...createColorsSlice(...state),
  ...createTypographySlice(...state),
  ...createShadowsSlice(...state),
  ...createFileTypesSlice(...state),
}))

export default useMirrorfulStore
