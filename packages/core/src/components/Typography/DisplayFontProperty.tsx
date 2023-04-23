import { Button, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { assertToken, TNamedToken, TTokenGroup } from '@core/types'
import { parseUnit } from '@core/utils/parseUnit'

import { FontPropertyRow } from './FontPropertyRow'
import { EditFontSizeModal } from './FontSize/EditFontSizeModal'
import { EditFontWeightModal } from './FontWeight/EditFontWeightModal'
import { EditLineHeightModal } from './LineHeight/EditLineHeightModal'

const compareFontProperties = (a: TNamedToken, b: TNamedToken) => {
  const { rawValue: aRawValue, unit: aUnit } = parseUnit(a.token.value)
  const { rawValue: bRawValue, unit: bUnit } = parseUnit(b.token.value)

  if (aUnit !== bUnit) {
    return aUnit.localeCompare(bUnit)
  } else {
    return aRawValue - bRawValue
  }
}

export const DisplayFontProperty = ({
  headingText,
  buttonText,
  fontProperty,
  fontPropertyData,
  placeholder,
  onUpdateFontPropertyData,
}: {
  headingText: string
  buttonText: string
  fontProperty: 'fontSize' | 'fontWeight' | 'lineHeight'
  fontPropertyData: TTokenGroup
  placeholder: string
  onUpdateFontPropertyData: (newFontData: TTokenGroup) => void
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
        {Object.keys(fontPropertyData)
          .map((key) => ({
            name: key,
            token: fontPropertyData[key],
          }))
          .filter((value): value is TNamedToken => assertToken(value.token))
          .sort(compareFontProperties)
          .map((data) => (
            <FontPropertyRow
              key={`${fontProperty}-${data.name}`}
              fontProperty={fontProperty}
              fontPropertyData={data}
              placeholder={placeholder}
              onUpdateFontPropertyVariant={(updatedFontPropertyData) => {
                const newFontPropertyData = { ...fontPropertyData }

                if (data.name !== updatedFontPropertyData.name) {
                  delete newFontPropertyData[data.name]
                }

                newFontPropertyData[updatedFontPropertyData.name] =
                  updatedFontPropertyData.token

                onUpdateFontPropertyData(newFontPropertyData)
              }}
              onDeleteFontPropertyVariant={() => {
                const newFontPropertyData = { ...fontPropertyData }
                delete newFontPropertyData[data.name]
                onUpdateFontPropertyData(newFontPropertyData)
              }}
            />
          ))}
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
          onUpdateFontSizeVariant={(newVariant: TNamedToken) => {
            const newFontSizeData = { ...fontPropertyData }
            newFontSizeData[newVariant.name] = newVariant.token

            onUpdateFontPropertyData(newFontSizeData)
          }}
        />
      )}
      {fontProperty === 'fontWeight' && (
        <EditFontWeightModal
          isAdding={true}
          isOpen={isAddVariantModalOpen}
          onClose={onAddVariantModalClose}
          onUpdateFontWeightVariant={(newVariant: TNamedToken) => {
            const newFontWeightData = { ...fontPropertyData }
            newFontWeightData[newVariant.name] = newVariant.token
            onUpdateFontPropertyData(newFontWeightData)
          }}
        />
      )}
      {fontProperty === 'lineHeight' && (
        <EditLineHeightModal
          isAdding={true}
          isOpen={isAddVariantModalOpen}
          onClose={onAddVariantModalClose}
          onUpdateLineHeightVariant={(newVariant: TNamedToken) => {
            const newLineWeightData = { ...fontPropertyData }
            newLineWeightData[newVariant.name] = newVariant.token
            onUpdateFontPropertyData(newLineWeightData)
          }}
        />
      )}
    </>
  )
}
