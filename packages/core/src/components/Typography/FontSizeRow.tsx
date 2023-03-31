import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { TFontSizeVariant } from '@core/types'

import { EditFontSizeModal } from './EditFontSizeModal'

// max font size in px or em/rem
const maxFontSizePx = 48
const maxFontSizeEmRem = maxFontSizePx / 16

// return boolean font size is too large for preview
function isFontSizeTooLarge(fontSizeData: TFontSizeVariant) {
  if (fontSizeData.unit === 'px') {
    return fontSizeData.value > maxFontSizePx
  }

  if (fontSizeData.unit === 'rem' || fontSizeData.unit === 'em') {
    return fontSizeData.value > maxFontSizeEmRem
  }

  return false
}

// return font size for preview default to 1rem if too large
function normalizeFontSize(fontSizeData: TFontSizeVariant) {
  if (fontSizeData.unit === 'px') {
    return isFontSizeTooLarge(fontSizeData) ? '1rem' : `${fontSizeData.value}px`
  }

  if (fontSizeData.unit === 'rem' || fontSizeData.unit === 'em') {
    return isFontSizeTooLarge(fontSizeData)
      ? '1rem'
      : `${fontSizeData.value}${fontSizeData.unit}`
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
          <Text css={{ fontWeight: 'bold' }} noOfLines={1}>
            {fontSizeData.name}
          </Text>
        </Box>
        <Box>
          <Text css={{ fontWeight: 'bold', width: 100 }} fontSize={18}>
            {fontSizeData.value} {fontSizeData.unit}
          </Text>
        </Box>
        <Box
          css={{
            fontSize: normalizeFontSize(fontSizeData),
            fontWeight: isFontSizeTooLarge(fontSizeData) ? 'bold' : '',
            width: '100%',
          }}
        >
          {isFontSizeTooLarge(fontSizeData)
            ? `Font size ${fontSizeData.value}${fontSizeData.unit} is too large to render.`
            : `Lorem ipsum dolor sit amet.`}
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
          isAdding={false}
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
