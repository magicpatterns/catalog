import { TExportFileType, TPrimitives, TTheme } from '@core/types'

export type Translator = {
  toContent: (primitives: TPrimitives, themes: TTheme[]) => string
  extension: string
}

export type TranslatorMap = { [FileType in TExportFileType]: Translator }
