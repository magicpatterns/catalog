import { useEffect, useState } from 'react'
import { Console, Hook, Unhook, Decode } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Component'

export function LogsContainer({ theLogs }: { theLogs: Message[] }) {
  const [logs, setLogs] = useState<Message[]>(theLogs)

  // @ts-ignore
  useEffect(() => {
    console.log('r u running')
    const hookedConsole = Hook(
      window.console,
      //@ts-ignore
      (log) => setLogs((currLogs: Message[]) => [...currLogs, Decode(log)]),
      true
    )
    return () => Unhook(hookedConsole)
    // Not sure exactly dep array that is needed to show logs without a re-mount
  }, [theLogs, window.console])

  return <Console logs={logs} variant="dark" />
}
