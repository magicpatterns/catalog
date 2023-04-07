import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react'
import {
  TFontSizeVariant,
  TFontWeightVariant,
  TLineHeightVariant,
} from '@core/types'

import { EditFontSizeModal } from './FontSize/EditFontSizeModal'
import { FontSizeData } from './FontSize/FontSizeData'
import { EditFontWeightModal } from './FontWeight/EditFontWeightModal'
import { FontWeightData } from './FontWeight/FontWeightData'
import { EditLineHeightModal } from './LineHeight/EditLineHeightModal'
import { LineHeightData } from './LineHeight/LineHeightData'

export function FontPropertyRow({
  fontProperty,
  fontPropertyData,
  onUpdateFontPropertyVariant,
  onDeleteFontPropertyVariant,
}: {
  fontProperty: 'fontSize' | 'fontWeight' | 'lineHeight'
  fontPropertyData: TFontSizeVariant | TFontWeightVariant | TLineHeightVariant
  onUpdateFontPropertyVariant: (
    newVariant: TFontSizeVariant | TFontWeightVariant | TLineHeightVariant
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
        {(() => {
          switch (fontProperty) {
            case 'fontSize':
              return (
                <FontSizeData
                  fontSizeData={fontPropertyData as TFontSizeVariant}
                />
              )
            case 'fontWeight':
              return (
                <FontWeightData
                  fontWeightData={fontPropertyData as TFontWeightVariant}
                />
              )
            case 'lineHeight':
              return (
                <LineHeightData
                  lineHeightData={fontPropertyData as TLineHeightVariant}
                />
              )
          }
        })()}
        <Box css={{ justifySelf: 'flex-end' }}>
          <Button
            css={{ marginRight: 16 }}
            onClick={() => onEditVariantModalOpen()}
          >
            Edit Variant
          </Button>
        </Box>
        {(() => {
          switch (fontProperty) {
            case 'fontSize':
              return (
                <EditFontSizeModal
                  isAdding={false}
                  isOpen={isEditVariantModalOpen}
                  onClose={onEditVariantModalClose}
                  initialFontSizeVariant={fontPropertyData as TFontSizeVariant}
                  onUpdateFontSizeVariant={onUpdateFontPropertyVariant}
                  onDeleteFontSizeVariant={onDeleteFontPropertyVariant}
                />
              )
            case 'fontWeight':
              return (
                <EditFontWeightModal
                  isAdding={false}
                  isOpen={isEditVariantModalOpen}
                  onClose={onEditVariantModalClose}
                  initialFontWeightVariant={
                    fontPropertyData as TFontWeightVariant
                  }
                  onUpdateFontWeightVariant={onUpdateFontPropertyVariant}
                  onDeleteFontWeightVariant={onDeleteFontPropertyVariant}
                />
              )
            case 'lineHeight':
              return (
                <EditLineHeightModal
                  isAdding={false}
                  isOpen={isEditVariantModalOpen}
                  onClose={onEditVariantModalClose}
                  initialLineHeightVariant={
                    fontPropertyData as TLineHeightVariant
                  }
                  onUpdateLineHeightVariant={onUpdateFontPropertyVariant}
                  onDeleteLineHeightVariant={onDeleteFontPropertyVariant}
                />
              )
          }
        })()}
      </Stack>
    </Box>
  )
}
