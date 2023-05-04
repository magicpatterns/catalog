import {
  Box,
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
import { assertToken, TNamedToken, TToken, TTokenGroup } from '@core/types'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import tinycolor from 'tinycolor2'

import { EditBaseColorModal } from './EditBaseColorModal'
import { EditColorNameModal } from './EditColorNameModal'
import { VariantRow } from './VariantRow'

export function MirrorfulMenuButton({
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
        border: 'none',
      }}
    />
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
  onUpdateColorData: (colorData: TTokenGroup, newName?: string) => void
  onDeleteColorData: () => void
}) {
  const {
    isOpen: isBaseModalOpen,
    onOpen: onBaseModalOpen,
    onClose: onBaseModalClose,
  } = useDisclosure()

  const {
    isOpen: isColorNameModalOpen,
    onOpen: onColorNameModalOpen,
    onClose: onColorNameModalClose,
  } = useDisclosure()

  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const namedTokens = Object.keys(colorData)
    .map((key) => ({
      name: key,
      token: colorData[key],
    }))
    .filter((value): value is TNamedToken => assertToken(value.token))

  const baseNamedToken: TNamedToken | undefined = namedTokens.filter(
    (v) => v.token.metadata.isBase
  )[0]
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
            <MenuItem onClick={() => onBaseModalOpen()}>
              Edit Base Color
            </MenuItem>
            <MenuItem onClick={() => onColorNameModalOpen()}>
              Edit Color Name
            </MenuItem>
            <MenuItem onClick={() => onDeleteAlertDialogOpen()}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Stack spacing={'8px'}>
        {namedTokens
          .sort((a, b) =>
            tinycolor(`${a.token.value}`).toHsl().l <
            tinycolor(`${b.token.value}`).toHsl().l
              ? 1
              : -1
          )
          .filter((variant) => variant.name !== 'DEFAULT')
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
                  console.log('new v', newVariant)
                  const updatedColorData = { ...colorData }

                  // This is absurd that this is how we get the baseColor
                  // There is a better way, we are just refactoring right now...
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const existingBaseColor: { name: string; value: TToken } =
                    Object.keys(updatedColorData)
                      .map((key) => {
                        return { name: key, value: updatedColorData[key] }
                      })
                      .filter(
                        (c) => assertToken(c.value) && c.value.metadata.isBase
                      )[0]

                  try {
                    const oldBaseColorValue = {
                      ...existingBaseColor.value,
                      metadata: { isBase: false },
                    }
                    updatedColorData[existingBaseColor.name] = oldBaseColorValue
                  } catch (e) {
                    // No existing base color
                    console.log(e)
                  }

                  updatedColorData['DEFAULT'] = newVariant.token
                  updatedColorData[newVariant.name] = newVariant.token
                  onUpdateColorData(updatedColorData)
                }}
              />
            </motion.div>
          ))}
      </Stack>

      <EditBaseColorModal
        colorName={colorName}
        isOpen={isBaseModalOpen}
        onClose={onBaseModalClose}
        color={baseNamedToken}
        onUpdateBaseColor={(updatedColorData: TTokenGroup, newName: string) => {
          onUpdateColorData(updatedColorData, newName)
        }}
      />

      <EditColorNameModal
        color={baseNamedToken}
        isOpen={isColorNameModalOpen}
        onClose={onColorNameModalClose}
        initialColorName={colorName}
        onUpdateColorName={(newName: string) => {
          onUpdateColorName(newName)
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
