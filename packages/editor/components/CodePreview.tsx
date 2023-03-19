import { CopyIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import Highlight from 'react-highlight'

export function CodePreview({
  language,
  textClass,
  text,
}: {
  language: string
  textClass: string
  text: string
}) {
  const [tooltip, setTooltip] = useState<string>('Copy')
  return (
    <div style={{ position: 'relative' }}>
      <Highlight language={language} className={textClass}>
        {text}
      </Highlight>
      <Tooltip placement="top" closeDelay={500} hasArrow label={tooltip}>
        <CopyIcon
          style={{
            color: 'white',
            position: 'absolute',
            display: 'inline',
            right: 0,
            top: 0,
            margin: 7,
          }}
          cursor={'pointer'}
          onClick={async () => {
            await navigator.clipboard.writeText(text)
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
