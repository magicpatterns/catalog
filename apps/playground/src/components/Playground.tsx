import { Box, Textarea, Button, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { transpileCode } from '../utils/transpileCode'
import MonacoEditor, { Monaco } from '@monaco-editor/react'
import { SOURCE_BOILERPLATE, DEFAULT_CODE } from '../utils/constants'
import { replaceImports } from '../utils/replacers'

type TLogData = {
  text: string
  type: 'success' | 'error' | 'info'
  timestamp: string
}

function LogInstance({ data }: { data: TLogData }) {
  const { timestamp, text, type } = data
  let color = 'gray'
  if (type === 'success') {
    color = 'green'
  } else if (type === 'error') {
    color = 'red'
  }

  return (
    <Box css={{ display: 'flex' }}>
      <Text css={{ color: 'gray', marginRight: '8px' }}>{timestamp}: </Text>
      <Text css={{ color }}>{text}</Text>
    </Box>
  )
}

export function Playground() {
  const [inputCode, setInputCode] = useState<string>(DEFAULT_CODE)
  const [transpiledCode, setTranspiledCode] = useState<string>('')
  const [sourceCode, setSourceCode] = useState<string>('')
  const [logs, setLogs] = useState<TLogData[]>([
    {
      text: 'Welcome to Mirrorful!',
      type: 'info',
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const logsContainer = useRef<HTMLDivElement>(null)

  const handleTranspileCode = () => {
    try {
      const modifiedInputCode = replaceImports(inputCode)

      const { iframeCode, sourceCode: sc } = transpileCode(modifiedInputCode)

      const source = SOURCE_BOILERPLATE(iframeCode)

      setLogs([
        ...logs,
        {
          text: 'Code transpiled successfully',
          type: 'success',
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      setTranspiledCode(source)
      setSourceCode(sc)
    } catch (e) {
      if (e instanceof Error) {
        setLogs([
          ...logs,
          {
            text: `Error: ${e.message}}`,
            type: 'error',
            timestamp: new Date().toLocaleTimeString(),
          },
        ])
      }
    }

    setTimeout(() => {
      if (logsContainer.current) {
        logsContainer.current.scroll({
          top: logsContainer.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    }, 10)
  }

  function handleEditorWillMount(monaco: Monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({})
  }

  const handleEditorChange = (value: string | undefined) => {
    setInputCode(value ?? '')
  }

  return (
    <Box>
      <Box
        css={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          padding: '24px',
        }}
      >
        <Box css={{ width: '50%' }}>
          <MonacoEditor
            defaultLanguage="typescript"
            defaultValue={DEFAULT_CODE}
            beforeMount={handleEditorWillMount}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
            }}
            height={'80%'}
          />
          <Button onClick={() => handleTranspileCode()}>Transpile</Button>
        </Box>
        <Box
          css={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box css={{ height: '70%', padding: '24px' }}>
            <iframe srcDoc={transpiledCode} />
          </Box>
          <Box
            css={{
              height: '30%',
              borderTop: '1px solid lightgray',
              padding: '24px',
            }}
          >
            <Box
              css={{ height: '100%', overflow: 'scroll' }}
              ref={logsContainer}
            >
              {logs.map((log, index) => (
                <LogInstance key={index} data={log} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
