import { Button, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import {
  TFontSizeVariant,
  TFontWeightVariant,
  TLineHeightVariant,
} from '@core/types'

import { FontPropertyRow } from './FontPropertyRow'
import { EditFontSizeModal } from './FontSize/EditFontSizeModal'
import { EditFontWeightModal } from './FontWeight/EditFontWeightModal'
import { EditLineHeightModal } from './LineHeight/EditLineHeightModal'

export const DisplayFontProperty = ({
  headingText,
  buttonText,
  fontProperty,
  fontPropertyData,
  onUpdateFontPropertyData,
}: {
  headingText: string
  buttonText: string
  fontProperty: 'fontSize' | 'fontWeight' | 'lineHeight'
  fontPropertyData:
    | TFontSizeVariant[]
    | TFontWeightVariant[]
    | TLineHeightVariant[]
  onUpdateFontPropertyData: (
    newFontSizeData:
      | TFontSizeVariant[]
      | TFontWeightVariant[]
      | TLineHeightVariant[]
  ) => void
}) => {
  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  return (
    <>
      <Heading fontSize={28} fontWeight="black">
        {headingText}
      </Heading>
      <Stack css={{ marginTop: '24px' }} spacing={12}>
        {fontPropertyData.map((fontPropertyVariant, index) => {
          return (
            <FontPropertyRow
              key={`${index}-${fontPropertyVariant.name}`}
              fontProperty={fontProperty}
              fontPropertyData={fontPropertyVariant}
              onUpdateFontPropertyVariant={(updatedFontPropertyData) => {
                const newFontPropertyData = [...fontPropertyData] as
                  | TFontSizeVariant[]
                  | TFontWeightVariant[]
                  | TLineHeightVariant[]
                const fontPropertyIndex = fontPropertyData.findIndex(
                  (ec) => ec.name === fontPropertyVariant.name
                )
                newFontPropertyData[fontPropertyIndex] = updatedFontPropertyData

                onUpdateFontPropertyData(newFontPropertyData)
              }}
              onDeleteFontPropertyVariant={() => {
                for (let i = 0; i < fontPropertyData.length; i++) {
                  if (fontPropertyData[i].name === fontPropertyVariant.name) {
                    fontPropertyData.splice(i, 1)
                    break
                  }
                }

                onUpdateFontPropertyData(fontPropertyData)
              }}
            />
          )
        })}
        <Button
          css={{ height: '50px', fontSize: '18px', fontWeight: 'bold' }}
          onClick={() => onAddVariantModalOpen()}
        >
          {buttonText}
        </Button>
      </Stack>
      {fontProperty === 'fontSize' && (
        <EditFontSizeModal
          isAdding={true}
          isOpen={isAddVariantModalOpen}
          onClose={onAddVariantModalClose}
          onUpdateFontSizeVariant={(newVariant: TFontSizeVariant) => {
            const updatedFontSizeData = [...fontPropertyData, newVariant]
            onUpdateFontPropertyData(updatedFontSizeData as TFontSizeVariant[])
          }}
        />
      )}
      {fontProperty === 'fontWeight' && (
        <EditFontWeightModal
          isAdding={true}
          isOpen={isAddVariantModalOpen}
          onClose={onAddVariantModalClose}
          onUpdateFontWeightVariant={(newVariant: TFontWeightVariant) => {
            const updatedFontWeightData = [...fontPropertyData, newVariant]
            onUpdateFontPropertyData(
              updatedFontWeightData as TFontWeightVariant[]
            )
          }}
        />
      )}
      {fontProperty === 'lineHeight' && (
        <EditLineHeightModal
          isAdding={true}
          isOpen={isAddVariantModalOpen}
          onClose={onAddVariantModalClose}
          onUpdateLineHeightVariant={(newVariant: TLineHeightVariant) => {
            const updatedLineHeightData = [...fontPropertyData, newVariant]
            onUpdateFontPropertyData(
              updatedLineHeightData as TLineHeightVariant[]
            )
          }}
        />
      )}
    </>
  )
}
