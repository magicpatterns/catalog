import {
  Box,
  Heading,
  Text,
  Divider,
  Stack,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { TFontSizeVariant } from 'types'
import { EditFontSizeModal } from './EditFontSizeModal'
import { FontSizeRow } from './FontSizeRow'

export function FontSizesSection({
  fontSizeData,
  onUpdateFontSizeData,
}: {
  fontSizeData: TFontSizeVariant[]
  onUpdateFontSizeData: (newFontSizeData: TFontSizeVariant[]) => void
}) {
  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  const sortFontSizes = function () {
    const rem: TFontSizeVariant[] = []
    const px: TFontSizeVariant[] = []
    const em: TFontSizeVariant[] = []

    fontSizeData.map((font) => {
      if (font.unit == 'rem') {
        rem.push(font)
      }
      if (font.unit == 'em') {
        em.push(font)
      }
      if (font.unit == 'px') {
        px.push(font)
      }
    })

    rem.sort((a, b) => a.value - b.value)
    em.sort((a, b) => a.value - b.value)
    px.sort((a, b) => a.value - b.value)

    return rem.concat(px, em)
  }

  fontSizeData = sortFontSizes()

  return (
    <Box>
      <Heading fontSize={28} fontWeight="black">
        Font Sizes
      </Heading>
      <Stack css={{ marginTop: '24px' }} spacing={12}>
        {fontSizeData.map((fontSizeVariant) => {
          return (
            <FontSizeRow
              key={fontSizeVariant.name}
              fontSizeData={fontSizeVariant}
              onUpdateFontSizeVariant={(
                updatedFontSizeData: TFontSizeVariant
              ) => {
                const newFontSizeData = [...fontSizeData]
                const fontSizeIndex = fontSizeData.findIndex(
                  (ec) => ec.name === fontSizeVariant.name
                )
                newFontSizeData[fontSizeIndex] = updatedFontSizeData

                onUpdateFontSizeData(newFontSizeData)
              }}
              onDeleteFontSizeVariant={() => {
                const newFontSizeData = fontSizeData.filter(
                  (v) => v.name !== fontSizeVariant.name
                )

                onUpdateFontSizeData(newFontSizeData)
              }}
            />
          )
        })}
        <Button
          css={{ height: '50px', fontSize: '18px', fontWeight: 'bold' }}
          onClick={() => onAddVariantModalOpen()}
        >
          Add New Font Size
        </Button>
      </Stack>
      <EditFontSizeModal
        isOpen={isAddVariantModalOpen}
        onClose={onAddVariantModalClose}
        onUpdateFontSizeVariant={(newVariant: TFontSizeVariant) => {
          const updatedFontSizeData = [...fontSizeData, newVariant]
          onUpdateFontSizeData(updatedFontSizeData)
        }}
      />
    </Box>
  )
}
