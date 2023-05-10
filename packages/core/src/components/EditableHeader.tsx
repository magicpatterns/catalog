import { Heading } from '@chakra-ui/react'

export function EditableHeader({
  text,
  onUpdateText,
}: {
  text: string
  onUpdateText: (updatedText: string) => void
}) {
  return (
    <Heading
      fontSize={'2rem'}
      fontWeight="bold"
      css={{
        marginTop: '24px',
        display: 'flex',
        transition: 'background-color 200ms ease-in-out',
        borderRadius: 8,
        padding: '4px 8px',
      }}
      contentEditable
      onBlur={(e) => {
        onUpdateText(e.target.innerHTML)
      }}
      _hover={{
        backgroundColor: 'rgba(0,0,0,0.05)',
      }}
    >
      {text}
    </Heading>
  )
}
