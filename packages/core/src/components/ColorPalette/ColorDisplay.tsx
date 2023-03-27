import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { TColorData, TColorVariant } from '@core/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import tinycolor from 'tinycolor2'

import { EditColorNameModal } from './EditColorNameModal'
import { EditVariantModal } from './EditVariantModal'

function VariantRow({
  variant,
  onUpdateVariant,
  onDeleteVariant,
}: {
  variant: TColorVariant
  onUpdateVariant: (newVariant: TColorVariant) => void
  onDeleteVariant: () => void
}) {
  const [hasCopiedHexCode, setHasCopiedHexCode] = useState(false)
  const { name, color } = variant

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
      }, 2500)
    }

    return () => clearTimeout(copiedTimeout)
  }, [hasCopiedHexCode])

  return (
    <Box
      css={{
        height: '3rem',
        backgroundColor: variant.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 24px',
        borderRadius: 8,
        border: variant.isBase ? '2px solid black' : '1px solid black',
      }}
      role="group"
      _hover={{
        cursor: 'pointer',
        backgroundColor: tinycolor(variant.color).isDark() ? 'white' : 'black',
      }}
      onClick={() => handleCopyColor(color)}
    >
      <Text
        fontSize="1rem"
        fontWeight={variant.isBase ? 700 : 600}
        color={tinycolor(variant.color).isDark() ? 'white' : 'black'}
        _groupHover={{ color: variant.color, fontWeight: 'bold' }}
      >
        {name} {variant.isBase ? ' (Base)' : ''}
      </Text>
      <Box
        css={{ display: 'flex', alignItems: 'center', position: 'relative' }}
      >
        {hasCopiedHexCode ? (
          <Text
            fontSize="1rem"
            css={{ marginRight: '5px', fontWeight: 'bold' }}
          >
            Copied &rarr;
          </Text>
        ) : null}
        <Text
          fontSize="1rem"
          fontWeight={variant.isBase ? 700 : 600}
          color={tinycolor(variant.color).isDark() ? 'white' : 'black'}
          _groupHover={{ color: variant.color, fontWeight: 'bold' }}
        >
          {color}
        </Text>
        <Menu>
          <MenuButton
            variant="outline"
            as={IconButton}
            icon={<Icon as={FiMoreVertical} />}
            color={tinycolor(variant.color).isDark() ? 'white' : 'black'}
            _groupHover={{ color: variant.color, fontWeight: 'bold' }}
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
  function handleCopyColor(colorHex: string) {
    navigator.clipboard.writeText(colorHex)
    setHasCopiedHexCode(true)
  }
}

export function ColorDisplay({
  colorData,
  onUpdateColorData,
  onDeleteColorData,
  animationDelayAddition,
}: {
  colorData: TColorData
  onUpdateColorData: (colorData: TColorData) => void
  onDeleteColorData: () => void
  animationDelayAddition: number
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

  return (
    <Box
      css={{
        display: 'flex',
        borderRadius: 8,
      }}
    >
      <Box css={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
        <Text css={{ fontWeight: 900, fontSize: '1rem', color: 'gray' }}>
          COLOR NAME
        </Text>
        <Text css={{ fontWeight: 600, fontSize: '1.8rem' }}>
          {colorData.name}
        </Text>
        <Text
          css={{
            fontWeight: 900,
            fontSize: '1rem',
            color: 'gray',
            marginTop: '32px',
          }}
        >
          BASE VALUE
        </Text>
        {colorData.baseColor && (
          <>
            <Box
              css={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
            >
              <Box
                css={{
                  width: '1.8rem',
                  height: '1.8rem',
                  backgroundColor: colorData.baseColor,
                  marginRight: '16px',
                  borderRadius: 8,
                  border: '1px solid black',
                }}
              />
              <Text css={{ fontWeight: 600, fontSize: '1.5rem' }}>
                {colorData.baseColor}
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
            variant="outline"
            onClick={() => {
              onColorNameModalOpen()
            }}
            leftIcon={<EditIcon />}
          >
            Edit Name
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onDeleteAlertDialogOpen()
            }}
            leftIcon={<DeleteIcon />}
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
              color: 'gray',
            }}
          >
            COLOR VARIANTS
          </Text>
          <Button variant="outline" onClick={onAddVariantModalOpen}>
            Add New Variant
          </Button>
        </Box>
        <Box css={{ marginTop: '32px' }}>
          <Stack spacing={'4px'}>
            {Object.keys(colorData.variants)
              .sort((a, b) =>
                tinycolor(colorData.variants[a]).toHsl().l <
                tinycolor(colorData.variants[b]).toHsl().l
                  ? 1
                  : -1
              )
              .map((variant, index) => (
                <motion.div
                  key={variant}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * index + animationDelayAddition,
                  }}
                >
                  <VariantRow
                    variant={{
                      name: variant,
                      color: colorData.variants[variant],
                      isBase:
                        colorData.variants[variant].toUpperCase() ===
                        colorData.baseColor?.toUpperCase(),
                    }}
                    onUpdateVariant={(newVariant: TColorVariant) => {
                      const updatedVariants = { ...colorData.variants }
                      delete updatedVariants[variant]
                      updatedVariants[newVariant.name] = newVariant.color

                      const updatedColorData = {
                        ...colorData,
                        variants: updatedVariants,
                      }
                      if (newVariant.isBase) {
                        updatedColorData.baseColor = newVariant.color
                      } else if (
                        !newVariant.isBase &&
                        updatedColorData.baseColor === newVariant.color
                      ) {
                        delete updatedColorData.baseColor
                      }

                      onUpdateColorData(updatedColorData)
                    }}
                    onDeleteVariant={() => {
                      const updatedVariants = { ...colorData.variants }
                      delete updatedVariants[variant]

                      const updatedColorData = {
                        ...colorData,
                        variants: updatedVariants,
                      }
                      if (colorData.variants[variant] === colorData.baseColor) {
                        delete updatedColorData.baseColor
                      }

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
        initialColorName={colorData.name}
        onUpdateColorName={(newName: string) => {
          onUpdateColorData({ ...colorData, name: newName })
        }}
      />
      <EditVariantModal
        isOpen={isAddVariantModalOpen}
        onClose={onAddVariantModalClose}
        onUpdateVariant={(newVariant: TColorVariant) => {
          const updatedVariants = { ...colorData.variants }
          updatedVariants[newVariant.name] = newVariant.color
          if (newVariant.isBase) {
            colorData.baseColor = newVariant.color
          }
          onUpdateColorData({ ...colorData, variants: updatedVariants })
        }}
      />
      <AlertDialogDelete
        tokenName={colorData.name}
        isOpen={isAlertDialogOpen}
        onClose={onDeleteAlertDialogClose}
        onDelete={() => onDeleteColorData()}
      />
    </Box>
  )
}
