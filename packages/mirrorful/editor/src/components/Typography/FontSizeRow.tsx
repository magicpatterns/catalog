import { TFontSizeVariant } from 'types'
import { Box, Stack, Text, Button, useDisclosure } from '@chakra-ui/react'
import { EditFontSizeModal } from './EditFontSizeModal'

function calculateMaxFontSizeForPreview(fontSizeData: TFontSizeVariant) {
  // allow anything up to 96px
  if (fontSizeData.unit === 'px') {
    return `${Math.min(fontSizeData.value, 96)}px`
  }

  // allow anything up to 6rem || 6em
  if (fontSizeData.unit === 'rem' || fontSizeData.unit === 'em') {
    return `${Math.min(fontSizeData.value, 6)}${fontSizeData.unit}`
  }

  return '1rem'
}

export function FontSizeRow({
  fontSizeData,
  onUpdateFontSizeVariant,
  onDeleteFontSizeVariant,
}: {
  fontSizeData: TFontSizeVariant
  onUpdateFontSizeVariant: (newVariant: TFontSizeVariant) => void
  onDeleteFontSizeVariant: () => void
}) {
  const {
    isOpen: isEditVariantModalOpen,
    onOpen: onEditVariantModalOpen,
    onClose: onEditVariantModalClose,
  } = useDisclosure()

  return (
    <Box>
      <Stack
        css={{ alignItems: 'center', width: '100%' }}
        spacing={8}
        direction="row"
      >
        <Box
          css={{
            padding: '12px',
            border: '1px dashed black',
            borderRadius: 8,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text css={{ fontWeight: 'bold' }}>{fontSizeData.name}</Text>
        </Box>
        <Box>
          <Text css={{ fontWeight: 'bold', width: 100 }} fontSize={18}>
            {fontSizeData.value} {fontSizeData.unit}
          </Text>
        </Box>
        <Box
          css={{
            fontSize: calculateMaxFontSizeForPreview(fontSizeData),
            width: 700,
          }}
        >
          Lorem ipsum dolor sit amet.
        </Box>
        <Box css={{ justifySelf: 'flex-end' }}>
          <Button
            css={{ marginRight: 16 }}
            onClick={() => onEditVariantModalOpen()}
          >
            Edit Variant
          </Button>
        </Box>
        <EditFontSizeModal
          isOpen={isEditVariantModalOpen}
          onClose={onEditVariantModalClose}
          initialFontSizeVariant={fontSizeData}
          onUpdateFontSizeVariant={onUpdateFontSizeVariant}
          onDeleteFontSizeVariant={onDeleteFontSizeVariant}
        />
      </Stack>
    </Box>
  )
}
