import { LIBRARY_CONTEXT } from './constants'

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

  if (LIBRARY_CONTEXT === 'fabra') {
    modifiedCode = modifiedCode.replace(
      `'@fabra/components'`,
      `'https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/fabra/fabra-library-2.es.js'`
    )
  } else if (LIBRARY_CONTEXT === 'triggerdev') {
    modifiedCode = modifiedCode.replace(
      `'@trigger-dev/components'`,
      `'https://cdn.jsdelivr.net/gh/teddarific/example-component-library/lib/library23.es.js'`
    )
  }

  return modifiedCode
}
