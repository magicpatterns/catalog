import { create } from 'zustand'

import { ColorsSlice, createColorsSlice } from './colorsSlice'
import { createFileTypesSlice, FileTypesSlice } from './fileTypesSlice'
import { createInternalSlice, InternalSlice } from './internalSlice'
import { createMetadataSlice, MetadataSlice } from './metadataSlice'
import { createShadowsSlice, ShadowsSlice } from './shadowsSlice'
import { createThemesSlice, ThemesSlice } from './themesSlice'
import { createTypographySlice, TypographySlice } from './typographySlice'

export interface MirrorfulState
  extends TypographySlice,
    ColorsSlice,
    ShadowsSlice,
    ThemesSlice,
    MetadataSlice,
    FileTypesSlice,
    InternalSlice {}

const useMirrorfulStore = create<MirrorfulState>()((...state) => ({
  ...createColorsSlice(...state),
  ...createTypographySlice(...state),
  ...createShadowsSlice(...state),
  ...createFileTypesSlice(...state),
  ...createThemesSlice(...state),
  ...createMetadataSlice(...state),
  ...createInternalSlice(...state),
}))

export default useMirrorfulStore
