import { Box, Textarea, Button, Text, Stack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { transpileCode } from '../utils/transpileCode'
import MonacoEditor, { Monaco } from '@monaco-editor/react'
import { SOURCE_BOILERPLATE, DEFAULT_CODE } from '../utils/constants'
import { replaceImports } from '../utils/replacers'
import { TLogData } from '../types'
import { Console } from './Console'
import { Toolbar } from './Toolbar'
import { editor } from 'monaco-editor'
import { Source } from './Source'

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

  const [panelTab, setPanelTab] = useState<'console' | 'source'>('console')
  const [widthDivide, setWidthDivide] = useState<number>(50)

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
  }

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({})
    monaco.editor.defineTheme('dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#040712',
      },
    })
  }

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleTranspileCode()
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    setInputCode(value ?? '')
  }

  useEffect(() => {
    handleTranspileCode()
  }, [])

  return (
    <Box>
      <Box
        css={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        backgroundColor={'bg'}
      >
        <Toolbar />
        <Box css={{ width: '100%', display: 'flex', flexGrow: 1 }}>
          <Box
            css={{ width: `${widthDivide}%`, position: 'relative' }}
            paddingY={'24px'}
          >
            <MonacoEditor
              defaultLanguage="typescript"
              value={inputCode}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                scrollbar: { vertical: 'hidden' },
                hideCursorInOverviewRuler: true,
                overviewRulerLanes: 0,
                automaticLayout: true,
              }}
              height={'100%'}
              theme={'dark'}
            />
            <Box css={{ position: 'absolute', bottom: '24px', right: '36px' }}>
              <Button
                backgroundColor={'bg'}
                borderColor={'divider'}
                borderWidth={'1px'}
                color={'playgroundText'}
                css={{
                  backdropFilter: 'blur(2px)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                _hover={{
                  boxShadow: '0 0 20px 1px #805AD5',
                  // bgGradient: 'linear(to-br, bg, primary, bg)',
                }}
                onClick={handleTranspileCode}
              >
                <Text>Transpile</Text>
                <Text
                  css={{
                    marginLeft: '6px',
                    fontWeight: 'bold',
                  }}
                  color={'playgroundTextHover'}
                >
                  ⌘ + Enter
                </Text>
              </Button>
            </Box>
          </Box>
          <Box
            css={{
              width: `${widthDivide}%`,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            borderLeftWidth={'1px'}
            borderColor={'divider'}
          >
            <Box css={{ height: '60%' }}>
              <iframe srcDoc={transpiledCode} />
            </Box>
            <Box
              css={{
                height: '40%',
                display: 'flex',
                flexDirection: 'column',
              }}
              borderTopWidth={'1px'}
              borderColor={'divider'}
            >
              <Box
                css={{
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px',
                }}
                borderBottomWidth={'1px'}
                borderColor="divider"
              >
                <Stack direction="row" spacing={16}>
                  <Button variant="tab" onClick={() => setPanelTab('console')}>
                    Console
                  </Button>
                  <Button variant="tab" onClick={() => setPanelTab('source')}>
                    Source
                  </Button>
                </Stack>
              </Box>
              <Box css={{ padding: '12px' }}>
                {panelTab === 'console' && <Console logs={logs} />}
                {panelTab === 'source' && <Source code={transpiledCode} />}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
