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
  useDisclosure,
} from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { assertToken, TNamedToken, TTokenGroup } from '@core/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import tinycolor from 'tinycolor2'

import { EditColorNameModal } from './EditColorNameModal'
import { EditVariantModal } from './EditVariantModal'

function MirrorfulMenuButton({
  color,
  icon = FiMoreHorizontal,
}: {
  color?: string
  icon?: IconType
}) {
  return (
    <MenuButton
      variant="outline"
      as={IconButton}
      icon={<Icon as={icon} />}
      color={color ? (tinycolor(color).isDark() ? 'white' : 'black') : 'black'}
      _hover={{
        backgroundColor: 'rgba(235, 235, 235, 0.3)',
      }}
      _active={{
        backgroundColor: 'rgba(235, 235, 235, 0.3)',
      }}
      size="sm"
      css={{
        // borderRadius: '50%',
        border: 'none',
      }}
    />
  )
}

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
          <Box style={{ marginLeft: '24px' }}>
            <MirrorfulMenuButton color={color} />
          </Box>
          <MenuList>
            <MenuItem onClick={() => alert('set as base')}>
              Set as Base
            </MenuItem>
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

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
      }}
    >
      <Box
        mb={5}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Text style={{ fontWeight: 600, fontSize: '1.5rem' }}>{colorName}</Text>
        <Menu>
          <Box style={{ marginLeft: '4px' }}>
            <MirrorfulMenuButton icon={FiEdit} />
          </Box>
          <MenuList>
            <MenuItem onClick={() => onColorNameModalOpen()}>
              Edit Color Name
            </MenuItem>
            <MenuItem onClick={() => onDeleteAlertDialogOpen()}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
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

      <EditColorNameModal
        color={baseColor}
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
