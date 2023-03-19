import { TExportFileType } from 'types'

const fileTypeToString: { [x in TExportFileType]: string } = {
  css: 'CSS',
  scss: 'Sass',
  js: 'JavaScript',
  cjs: 'CommonJS',
  ts: 'TypeScript',
  json: 'JSON',
}

export function getExportFileTypeName(fileType: TExportFileType): string {
  return fileTypeToString[fileType] ?? `${fileType}`
}
