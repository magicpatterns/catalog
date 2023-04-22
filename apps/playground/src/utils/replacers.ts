export function replaceImports(code: string) {
  let modifiedCode = code
  modifiedCode = modifiedCode.replace(
    `'react'`,
    `'https://esm.sh/react@18.2.0'`
  )
  modifiedCode = modifiedCode.replace(
    `'react-dom'`,
    `'https://esm.sh/react-dom@18.2.0'`
  )

  modifiedCode = modifiedCode.replace(
    `'@trigger-dev/components'`,
    `'https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/library11.es.js'`
  )

  return modifiedCode
}