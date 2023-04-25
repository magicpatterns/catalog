import { TLogData } from '../types'
import { Box, Text } from '@chakra-ui/react'
import { useRef, useEffect } from 'react'

function LogInstance({ timestamp, text, type }: TLogData) {
  let color = 'gray'
  if (type === 'success') {
    color = 'green'
  } else if (type === 'error') {
    color = 'red'
  }

  return (
    <Box css={{ display: 'flex' }}>
      <Text color="playgroundText" css={{ marginRight: '8px' }}>
        {timestamp}:{' '}
      </Text>
      <Text css={{ color }}>{text}</Text>
    </Box>
  )
}

export function Console({ logs }: { logs: TLogData[] }) {
  const logsContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logsContainer.current) {
      logsContainer.current.scroll({
        top: logsContainer.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [logs])

  return (
    <Box ref={logsContainer}>
      {logs.map((log, index) => (
        <LogInstance key={index} {...log} />
      ))}
    </Box>
  )
}
