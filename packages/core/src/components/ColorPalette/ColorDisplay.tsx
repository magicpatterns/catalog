import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { assertToken, TNamedToken, TTokenGroup } from '@core/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import tinycolor from 'tinycolor2'

import { darkTheme, lightTheme } from '../theme'
import { EditColorNameModal } from './EditColorNameModal'
import { EditVariantModal } from './EditVariantModal'

function VariantRow({
  variant,
  onUpdateVariant,
  onDeleteVariant,
}: {
  variant: TNamedToken
  onUpdateVariant: (newVariant: TNamedToken) => void
  onDeleteVariant: () => void
}) {
  const [hasCopiedHexCode, setHasCopiedHexCode] = useState(false)
  const { name, token } = variant

  const {
    isOpen: isEditVariantModalOpen,
    onOpen: onEditVariantModalOpen,
    onClose: onEditVariantModalClose,
  } = useDisclosure()

  useEffect(() => {
    let copiedTimeout: NodeJS.Timeout

    if (hasCopiedHexCode) {
      copiedTimeout = setTimeout(() => {
        setHasCopiedHexCode(false)
      }, 1500)
    }

    return () => clearTimeout(copiedTimeout)
  }, [hasCopiedHexCode])

  const color = `${token.value}`

  return (
    <Box
      css={{
        height: '3rem',
        backgroundColor: `${token.value}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 24px',
        borderRadius: 8,
        border: '1px solid black',
      }}
      role="group"
    >
      <Text
        fontSize="1rem"
        // fontWeight={variant.isBase ? 700 : 600}
        color={tinycolor(color).isDark() ? 'white' : 'black'}
      >
        {/* {name} {variant.isBase ? ' (Base)' : ''} */}
        {name}
      </Text>
      <Box
        css={{ display: 'flex', alignItems: 'center', position: 'relative' }}
      >
        <Tooltip
          label="Copied Hex to Clipboard"
          hasArrow
          isDisabled={!hasCopiedHexCode}
          isOpen={hasCopiedHexCode}
        >
          <Text
            fontSize="1rem"
            // fontWeight={variant.isBase ? 700 : 600}
            fontWeight={600}
            color={tinycolor(color).isDark() ? 'white' : 'black'}
            _hover={{
              cursor: 'pointer',
              backgroundColor: tinycolor(color).isDark() ? 'white' : 'black',
              color: color,
              borderRadius: 8,
              paddingInline: 2,
            }}
            onClick={() => {
              navigator.clipboard.writeText(color)
              setHasCopiedHexCode(true)
            }}
          >
            {color}
          </Text>
        </Tooltip>
        <Menu>
          <MenuButton
            variant="outline"
            as={IconButton}
            icon={<Icon as={FiMoreVertical} />}
            color={tinycolor(color).isDark() ? 'white' : 'black'}
            _hover={{
              backgroundColor: 'rgba(235, 235, 235, 0.3)',
            }}
            _active={{
              backgroundColor: 'rgba(235, 235, 235, 0.3)',
            }}
            size="sm"
            css={{
              borderRadius: '50%',
              border: 'none',
              marginLeft: '24px',
            }}
          />
          <MenuList>
            <MenuItem onClick={() => onEditVariantModalOpen()}>Edit</MenuItem>
            <MenuItem onClick={() => onDeleteVariant()}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <EditVariantModal
        isOpen={isEditVariantModalOpen}
        onClose={onEditVariantModalClose}
        initialVariant={variant}
        onUpdateVariant={onUpdateVariant}
      />
    </Box>
  )
}

export function ColorDisplay({
  colorName,
  colorData,
  onUpdateColorData,
  onUpdateColorName,
  onDeleteColorData,
}: {
  colorName: string
  colorData: TTokenGroup
  onUpdateColorName: (newColorName: string) => void
  onUpdateColorData: (colorData: TTokenGroup) => void
  onDeleteColorData: () => void
}) {
  const {
    isOpen: isColorNameModalOpen,
    onOpen: onColorNameModalOpen,
    onClose: onColorNameModalClose,
  } = useDisclosure()

  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  let baseColor = null
  if (colorData.DEFAULT && assertToken(colorData.DEFAULT)) {
    baseColor = colorData.DEFAULT.value
  } else if (colorData.base && assertToken(colorData.base)) {
    baseColor = colorData.base.value
  }
  const headingColor = useColorModeValue(
    lightTheme.headings.colors.medium,
    darkTheme.headings.colors.medium
  )
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
  const variantName = useColorModeValue(
    lightTheme.text.colors.primary,
    darkTheme.text.colors.primary
  )
  const border = useColorModeValue('none', '2px solid transparent')
  const borderRadius = useColorModeValue(8, 30)
  const baseColorValue = useColorModeValue(
    lightTheme.text.colors.secondary,
    darkTheme.text.colors.secondary
  )

  return (
    <Box
      css={{
        display: 'flex',
        borderRadius: 8,
      }}
    >
      <Box css={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
        <Text
          css={{
            fontWeight: 900,
            fontSize: '1rem',
            background: headingColor,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          COLOR NAME
        </Text>
        <Text
          css={{
            fontWeight: 600,
            fontSize: '1.8rem',
            background: variantName,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {colorName}
        </Text>
        <Text
          css={{
            fontWeight: 900,
            fontSize: '1rem',
            background: headingColor,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginTop: '32px',
          }}
        >
          BASE VALUE
        </Text>
        {baseColor && (
          <>
            <Box
              css={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '8px',
              }}
            >
              <Box
                css={{
                  width: '1.8rem',
                  height: '1.8rem',
                  backgroundColor: baseColor,
                  marginRight: '16px',
                  borderRadius: 8,
                  border: '1px solid #cdcdcd',
                }}
              />
              <Text
                css={{
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  color: baseColorValue,
                }}
              >
                {baseColor}
              </Text>
            </Box>
          </>
        )}

        <Stack
          marginTop={'32px'}
          spacing={'16px'}
          paddingRight={'36px'}
          direction="row"
        >
          <Button
            onClick={() => {
              onColorNameModalOpen()
            }}
            leftIcon={<EditIcon />}
            css={{
              color: color,
              background: backgroundColor,
              border: border,
              borderRadius: borderRadius,
            }}
            _hover={{
              background: backgroundColorOnHover,
            }}
          >
            Edit Name
          </Button>
          <Button
            onClick={() => {
              onDeleteAlertDialogOpen()
            }}
            leftIcon={<DeleteIcon />}
            css={{
              color: color,
              background: backgroundColor,
              border: border,
              borderRadius: borderRadius,
            }}
            _hover={{
              background: backgroundColorOnHover,
            }}
          >
            Delete Color
          </Button>
        </Stack>
      </Box>
      <Box css={{ flexGrow: 1 }}>
        <Box
          css={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Text
            css={{
              fontWeight: 900,
              fontSize: '1rem',
              background: headingColor,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            COLOR VARIANTS
          </Text>
          <Button
            onClick={onAddVariantModalOpen}
            css={{
              color: color,
              background: backgroundColor,
              border: border,
              borderRadius: borderRadius,
            }}
            _hover={{
              background: backgroundColorOnHover,
            }}
          >
            Add New Variant
          </Button>
        </Box>
        <Box css={{ marginTop: '32px' }}>
          <Stack spacing={'4px'}>
            {Object.keys(colorData)
              .map((key) => ({
                name: key,
                token: colorData[key],
              }))
              .filter((value): value is TNamedToken => assertToken(value.token))
              .sort((a, b) =>
                tinycolor(`${a.token.value}`).toHsl().l <
                tinycolor(`${b.token.value}`).toHsl().l
                  ? 1
                  : -1
              )
              .map((variant, index) => (
                <motion.div
                  key={variant.name}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * index,
                  }}
                >
                  <VariantRow
                    variant={variant}
                    onUpdateVariant={(newVariant: TNamedToken) => {
                      const updatedColorData = { ...colorData }
                      delete updatedColorData[variant.name]
                      updatedColorData[newVariant.name] = newVariant.token

                      onUpdateColorData(updatedColorData)
                    }}
                    onDeleteVariant={() => {
                      const updatedColorData = { ...colorData }
                      delete updatedColorData[variant.name]

                      onUpdateColorData(updatedColorData)
                    }}
                  />
                </motion.div>
              ))}
          </Stack>
        </Box>
      </Box>
      <EditColorNameModal
        isOpen={isColorNameModalOpen}
        onClose={onColorNameModalClose}
        initialColorName={colorName}
        onUpdateColorName={(newName: string) => {
          onUpdateColorName(newName)
        }}
      />
      <EditVariantModal
        isOpen={isAddVariantModalOpen}
        onClose={onAddVariantModalClose}
        onUpdateVariant={(newVariant: TNamedToken) => {
          if (newVariant.name in colorData) {
            throw new Error(
              'This name already exists, please choose a different name.'
            )
          }
          const updatedColorData = { ...colorData }
          updatedColorData[newVariant.name] = newVariant.token

          onUpdateColorData(updatedColorData)
        }}
      />
      <AlertDialogDelete
        tokenName={colorName}
        isOpen={isAlertDialogOpen}
        onClose={onDeleteAlertDialogClose}
        onDelete={() => onDeleteColorData()}
      />
    </Box>
  )
}
