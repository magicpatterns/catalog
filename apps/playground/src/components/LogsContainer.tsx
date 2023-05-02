import { Console } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Component'

export function LogsContainer({ theLogs }: { theLogs: Message[] }) {
  return <Console logs={theLogs} variant="dark" />
}
