import { useEffect, useState } from 'react'
import { Console, Hook, Unhook } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Component'

// function LogInstance({ timestamp, text, type }: TLogData) {
//   let color = 'gray'
//   if (type === 'success') {
//     color = 'green'
//   } else if (type === 'error') {
//     color = 'red'
//   }

//   return (
//     <Box css={{ display: 'flex' }}>
//       <Text color="playgroundText" css={{ marginRight: '8px' }}>
//         {timestamp}:{' '}
//       </Text>
//       <Text css={{ color }}>{text}</Text>
//     </Box>
//   )
// }
// export function OldConsole({ logs }: { logs: TLogData[] }) {
//   const logsContainer = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (logsContainer.current) {
//       logsContainer.current.scroll({
//         top: logsContainer.current.scrollHeight,
//         behavior: 'smooth',
//       })
//     }
//   }, [logs])

//   return (
//     <Box ref={logsContainer}>
//       {logs.map((log, index) => (
//         <LogInstance key={index} {...log} />
//       ))}
//     </Box>
//   )
// }

export function LogsContainer({ theLogs }: { theLogs: Message[] }) {
  const [logs, setLogs] = useState<Message[]>(theLogs)

  // @ts-ignore
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      //@ts-ignore
      (log) => setLogs((currLogs: Message[]) => [...currLogs, log]),
      false
    )
    return () => Unhook(hookedConsole)
  })

  return <Console logs={logs} variant="dark" />
}
