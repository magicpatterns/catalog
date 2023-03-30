import { create } from 'zustand'
import { createTypographySlice, TypographySlice } from './typographySlice'

const useMirrorfulStore = create<TypographySlice>()((...state) => ({
  ...createTypographySlice(...state),
}))

export default useMirrorfulStore
