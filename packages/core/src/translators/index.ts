import { toCjs } from './toCjs'
import { toCss } from './toCss'
import { toJs } from './toJs'
import { toJson } from './toJson'
import { toScss } from './toScss'
import { toTs } from './toTs'
import { TranslatorMap } from './types'

export const translators: TranslatorMap = {
  css: {
    toContent: toCss,
    extension: '.css',
  },
  scss: {
    toContent: toScss,
    extension: '.scss',
  },
  js: {
    toContent: toJs,
    extension: '.js',
  },
  cjs: {
    toContent: toCjs,
    extension: '_cjs.js',
  },
  ts: {
    toContent: toTs,
    extension: '.ts',
  },
  json: {
    toContent: toJson,
    extension: '.json',
  },
}
