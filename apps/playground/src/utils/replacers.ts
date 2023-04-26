export function replaceImports(code: string) {
  let modifiedCode = code
  modifiedCode = modifiedCode.replace(
    `'react'`,
    `'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm'`
  )
  modifiedCode = modifiedCode.replace(
    `'react-dom'`,
    `'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm'`
  )

  modifiedCode = modifiedCode.replace(
    `'@trigger-dev/components'`,
    `'https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/library23.es.js'`
  )

  return modifiedCode
}
