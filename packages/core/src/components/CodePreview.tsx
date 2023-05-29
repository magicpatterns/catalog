import { CopyIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'
import { onCopy } from '@core/utils/onCopy'
import { useState } from 'react'
import Highlight from 'react-highlight'

// NOTE: react-highlight is not safely typed!
// Check the docs before modifying: https://www.npmjs.com/package/react-highlight
export function CodePreview({
  language,
  text,
}: {
  language: string
  text: string
}) {
  const [tooltip, setTooltip] = useState<string>('Copy')
  return (
    <div
      style={{ position: 'relative', maxHeight: '40vh', overflowY: 'scroll' }}
    >
      <Highlight className={language}>{text}</Highlight>
      <Tooltip placement="top" closeDelay={500} hasArrow label={tooltip}>
        <CopyIcon
          style={{
            color: 'white',
            position: 'absolute',
            display: 'inline',
            right: 0,
            top: 0,
            margin: 7,
            zIndex: 2,
          }}
          cursor={'pointer'}
          onClick={async () => {
            await onCopy(text)
            setTooltip('Copied')
            setTimeout(() => {
              setTooltip('Copy')
            }, 1000)
          }}
        />
      </Tooltip>
    </div>
  )
}
