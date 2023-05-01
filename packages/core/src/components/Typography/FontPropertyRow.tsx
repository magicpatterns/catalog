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
          <Text
            css={{
              fontWeight: 'bold',
              width: 50,
              textAlign: 'center',
            }}
            noOfLines={1}
          >
            {fontPropertyData.name}
          </Text>
        </Box>
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
