import {
  Box,
  Button,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { TNamedToken } from '@core/types'

import { darkTheme, lightTheme } from '../theme'
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

  const backgroundColor = useColorModeValue(
    lightTheme.buttons.backgroundColors.default,
    darkTheme.buttons.small.backgroundColors.default
  )
  const backgroundColorOnHover = useColorModeValue(
    lightTheme.buttons.backgroundColors.hover,
    darkTheme.buttons.small.backgroundColors.hover
  )
  const color = useColorModeValue(
    lightTheme.buttons.textColors.secondary,
    darkTheme.buttons.small.textColors
  )
  const border = useColorModeValue('none', '2px solid transparent')
  const borderRadius = useColorModeValue(8, 30)
  const fontTokenNameColor = useColorModeValue(
    lightTheme.text.colors.secondary,
    darkTheme.text.colors.secondary
  )

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
            border: '1px dashed gray',
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
              color: fontTokenNameColor,
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
            css={{
              marginRight: 16,
              color: color,
              background: backgroundColor,
              border: border,
              borderRadius: borderRadius,
            }}
            _hover={{
              background: backgroundColorOnHover,
            }}
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
