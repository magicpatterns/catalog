import { Heading, Text } from '@chakra-ui/react'
import { CSSProperties } from 'react'

export function EditableContent({
  text,
  type,
  onUpdateText,
  css,
}: {
  text: string
  type: 'heading' | 'text'
  onUpdateText: (updatedText: string) => void
  css?: CSSProperties
}) {
  const ComponentToUse = type === 'heading' ? Heading : Text

  return (
    <ComponentToUse
      css={{
        display: 'flex',
        transition: 'background-color 200ms ease-in-out',
        borderRadius: 8,
        ...css,
      }}
      suppressContentEditableWarning={true}
      contentEditable
      onBlur={(e) => {
        onUpdateText(e.target.innerHTML)
      }}
      _hover={{
        backgroundColor: 'rgba(0,0,0,0.05)',
      }}
    >
      {text}
    </ComponentToUse>
  )
}
