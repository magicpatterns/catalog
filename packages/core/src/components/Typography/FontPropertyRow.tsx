import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { TFontSizeVariant, TFontWeightVariant } from '@core/types'

import { EditFontSizeModal } from './FontSize/EditFontSizeModal'
import { FontSizeData } from './FontSize/FontSizeData'
import { EditFontWeightModal } from './FontWeight/EditFontWeightModal'
import { FontWeightData } from './FontWeight/FontWeightData'

export function FontPropertyRow({
  fontProperty,
  fontPropertyData,
  onUpdateFontPropertyVariant,
  onDeleteFontPropertyVariant,
}: {
  fontProperty: 'fontSize' | 'fontWeight'
  fontPropertyData: TFontSizeVariant | TFontWeightVariant
  onUpdateFontPropertyVariant: (
    newVariant: TFontSizeVariant | TFontWeightVariant
  ) => void
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
        {fontProperty === 'fontSize' ? (
          <FontSizeData fontSizeData={fontPropertyData as TFontSizeVariant} />
        ) : (
          <FontWeightData
            fontWeightData={fontPropertyData as TFontWeightVariant}
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
        {fontProperty === 'fontSize' ? (
          <EditFontSizeModal
            isAdding={false}
            isOpen={isEditVariantModalOpen}
            onClose={onEditVariantModalClose}
            initialFontSizeVariant={fontPropertyData as TFontSizeVariant}
            onUpdateFontSizeVariant={onUpdateFontPropertyVariant}
            onDeleteFontSizeVariant={onDeleteFontPropertyVariant}
          />
        ) : (
          <EditFontWeightModal
            isAdding={false}
            isOpen={isEditVariantModalOpen}
            onClose={onEditVariantModalClose}
            initialFontWeightVariant={fontPropertyData as TFontWeightVariant}
            onUpdateFontWeightVariant={onUpdateFontPropertyVariant}
            onDeleteFontWeightVariant={onDeleteFontPropertyVariant}
          />
        )}
      </Stack>
    </Box>
  )
}
