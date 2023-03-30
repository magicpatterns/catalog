import { create } from 'zustand'
import { createTypographySlice, TypographySlice } from './useTypographyStore'

const useMirrorfulStore = create<TypographySlice>()((...state) => ({
  ...createTypographySlice(...state),
}))

export default useMirrorfulStore
