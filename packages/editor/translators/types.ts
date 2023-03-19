import { TExportFileType, TTokens } from 'types'

export type Translator = {
  toContent: (tokens: TTokens) => string
  extension: string
}

export type TranslatorMap = { [FileType in TExportFileType]: Translator }
