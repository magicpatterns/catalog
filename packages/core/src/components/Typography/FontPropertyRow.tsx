import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { TNamedToken } from '@core/types'

import { EditFontSizeModal } from './FontSize/EditFontSizeModal'
import { FontSizeRow } from './FontSize/FontSizeRow'
import { EditFontWeightModal } from './FontWeight/EditFontWeightModal'
import { FontWeightRow } from './FontWeight/FontWeightRow'
import { EditLineHeightModal } from './LineHeight/EditLineHeightModal'
import { LineHeightData } from './LineHeight/LineHeightData'

export function FontPropertyRow({
  fontProperty,
  fontPropertyData,
  placeholder,
  onUpdateFontPropertyVariant,
  onDeleteFontPropertyVariant,
}: {
  fontProperty: 'fontSize' | 'fontWeight' | 'lineHeight'
  fontPropertyData: TNamedToken
  placeholder: string
  onUpdateFontPropertyVariant: (newVariant: TNamedToken) => void
  onDeleteFontPropertyVariant: () => void
}) {
  const {
    isOpen: isEditVariantModalOpen,
    onOpen: onEditVariantModalOpen,
    onClose: onEditVariantModalClose,
  } = useDisclosure()

  return (
    <Box>
      <Stack
        width={'100%'}
        alignItems={{ base: 'left', sm: 'center' }}
        spacing={8}
        direction={{ base: 'column', sm: 'row' }}
      >
        {fontProperty === 'fontSize' && (
          <FontSizeRow
            fontSizeData={fontPropertyData}
            placeholder={placeholder}
          />
        )}
        {fontProperty === 'fontWeight' && (
          <FontWeightRow
            fontWeightData={fontPropertyData}
            placeholder={placeholder}
          />
        )}
        {fontProperty === 'lineHeight' && (
          <LineHeightData
            lineHeightData={fontPropertyData}
            placeholder={placeholder}
          />
        )}
        <Box css={{ justifySelf: 'flex-end' }}>
          <Button
            css={{ marginRight: 16 }}
            onClick={() => onEditVariantModalOpen()}
          >
            Edit Variant
          </Button>
        </Box>
        {fontProperty === 'fontSize' && (
          <EditFontSizeModal
            isAdding={false}
            isOpen={isEditVariantModalOpen}
            onClose={onEditVariantModalClose}
            initialFontSizeVariant={fontPropertyData}
            onUpdateFontSizeVariant={onUpdateFontPropertyVariant}
            onDeleteFontSizeVariant={onDeleteFontPropertyVariant}
          />
        )}
        {fontProperty === 'fontWeight' && (
          <EditFontWeightModal
            isAdding={false}
            isOpen={isEditVariantModalOpen}
            onClose={onEditVariantModalClose}
            initialFontWeightVariant={fontPropertyData}
            onUpdateFontWeightVariant={onUpdateFontPropertyVariant}
            onDeleteFontWeightVariant={onDeleteFontPropertyVariant}
          />
        )}
        {fontProperty === 'lineHeight' && (
          <EditLineHeightModal
            isAdding={false}
            isOpen={isEditVariantModalOpen}
            onClose={onEditVariantModalClose}
            initialLineHeightVariant={fontPropertyData}
            onUpdateLineHeightVariant={onUpdateFontPropertyVariant}
            onDeleteLineHeightVariant={onDeleteFontPropertyVariant}
          />
        )}
      </Stack>
    </Box>
  )
}
