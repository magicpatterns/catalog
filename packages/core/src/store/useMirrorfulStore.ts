import { create } from 'zustand'

import { ColorsSlice, createColorsSlice } from './colorsSlice'
import { createFileTypesSlice, FileTypesSlice } from './fileTypesSlice'
import { createOnBoardingSlice, onBoardingSlice } from './onBoardingSlice'
import { createShadowsSlice, ShadowsSlice } from './shadowsSlice'
import { createTypographySlice, TypographySlice } from './typographySlice'

export interface MirrorfulState
  extends TypographySlice,
    ColorsSlice,
    ShadowsSlice,
    FileTypesSlice,
    onBoardingSlice {}

const useMirrorfulStore = create<MirrorfulState>()((...state) => ({
  ...createColorsSlice(...state),
  ...createTypographySlice(...state),
  ...createShadowsSlice(...state),
  ...createFileTypesSlice(...state),
  ...createOnBoardingSlice(...state),
}))

export default useMirrorfulStore
