import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import {
  TMirrorfulStore,
  TPrimitives,
  TPrimitivesTypography,
  TTheme,
} from './types'

const typographyPrimitivesSchema = new mongoose.Schema<TPrimitivesTypography>({
  fontSizes: { type: Map, of: Object },
  fontWeights: { type: Map, of: Object },
  lineHeights: { type: Map, of: Object },
})

const primitivesSchema = new mongoose.Schema<TPrimitives>({
  colors: { type: Map, of: Object }, // colors is really TTokenGroup, but the keys are dynamic... so we let is be free-form
  typography: { types: typographyPrimitivesSchema },
  shadows: { type: Map, of: Object }, // shadows is really TTokenGroup, but the keys are dynamic... so we let is be free-form
})

const themeSchema = new mongoose.Schema<TTheme>({
  id: { type: String, default: uuidv4() },
  name: { type: String },
  tokens: { type: Map, of: Object }, // tokens is really TTokenGroup, but the keys are dynamic... so we let is be free-form
})

const storeSchema = new mongoose.Schema<
  TMirrorfulStore & { id: string; orgId: string; lastUpdatedByUserId: string }
>({
  lastUpdatedByUserId: { type: String }, // links to propelauth user
  orgId: { type: String },
  id: { type: String, default: uuidv4() },
  primitives: { type: primitivesSchema, _id: false },
  themes: { type: [themeSchema], _id: false },
  files: { type: [String], _id: false }, // 'css' | 'scss' | 'js' | 'cjs' | 'ts' | 'json'
})

export const Store = mongoose.model('Store', storeSchema)
