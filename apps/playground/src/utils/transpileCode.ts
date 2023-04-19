import { transform } from '@babel/standalone'

const importsRegex =
  /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g
const pureRegex = /\/\*#__PURE__\*\//g

function replace(string: string, regex: RegExp, value = ''): string {
  return string.replace(regex, value).trim()
}

export function transpileCode(code: string) {
  const codeToTranspile = replace(code, importsRegex)
  const options = { presets: ['es2015-loose', 'react'] }
  const { code: transpiledCode } = transform(codeToTranspile, options)

  if (!transpiledCode) {
    // syntax errors get caught by the `error` listener
    throw new Error(`Something went wrong transpiling ${codeToTranspile}.`)
  }

  const hasImports = Boolean(code.match(importsRegex))
  const imports = code.match(importsRegex)?.join('\n') ?? ''

  return {
    // this is passed to `updateIframe`
    iframeCode: hasImports ? `${imports}\n${transpiledCode}` : transpiledCode,
    // this is passed to `updateSource`
    // ignore /*#__PURE__*/ from transpiled output to reduce noise
    sourceCode: replace(transpiledCode, pureRegex),
  }
}
