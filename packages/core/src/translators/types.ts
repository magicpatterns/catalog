import { TExportFileType, TPrimitives } from '@core/types'

export type Translator = {
  toContent: (primitives: TPrimitives) => string
  extension: string
}

export type TranslatorMap = { [FileType in TExportFileType]: Translator }
