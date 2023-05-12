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
import {
  defaultColorShadesToTokens,
  generateDefaultColorShades,
  ShadeStop,
} from './utils'
import { VariantRow } from './VariantRow'

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

  const defaultNamedToken: TNamedToken = {
    name: 'DEFAULT',
    token: colorData['DEFAULT'] as TToken,
  }

  let baseColorToken = defaultNamedToken
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    baseColorToken = namedTokens.find(
      (i) => i.token.value === defaultNamedToken.token.value
    )
    if (!baseColorToken) {
      throw new Error('Base color not found')
    }
  } catch (e) {
    console.error(e)
  }

  let alreadySetBase = false
  let isBase = false
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
            <MenuButton
              variant="outline"
              as={IconButton}
              icon={<Icon as={FiEdit} />}
              color="var(--text-color-primary)"
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
          .filter((variant) => variant.name !== 'DEFAULT')
          .map((variant, index) => {
            if (!alreadySetBase) {
              try {
                // just in case we are comparing rgba to hex
                isBase =
                  tinycolor(defaultNamedToken.token.value).toHexString() ===
                  tinycolor(variant.token.value).toHexString()
                alreadySetBase = isBase
              } catch (e) {
                throw Error(
                  `Migration 0.0.7 likely failed, please contact support at founders@mirrorful.io: ${e}`
                )
                // Sentry.captureException(e)
              }
            } else {
              isBase = false
            }
            return (
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
                  defaultNamedToken={defaultNamedToken}
                  variant={variant}
                  isBase={isBase}
                  onUpdateVariant={(
                    newVariant: TNamedToken,
                    updateDefault: boolean
                  ) => {
                    const updatedColorData = { ...colorData }
                    if (updateDefault) {
                      let additionalVariants: TTokenGroup = {}
                      additionalVariants = defaultColorShadesToTokens(
                        generateDefaultColorShades({
                          primary: newVariant.token.value,
                          baseStop: Number.isNaN(Number(newVariant.name))
                            ? 500
                            : (Number(newVariant.name) as ShadeStop),
                        })
                      )
                      const colorTokenGroup: TTokenGroup = {
                        DEFAULT: newVariant.token,
                        ...additionalVariants,
                      }
                      onUpdateColorData(colorTokenGroup)
                    } else {
                      updatedColorData[newVariant.name] = newVariant.token
                      onUpdateColorData(updatedColorData)
                    }
                  }}
                />
              </motion.div>
            )
          })}
      </Stack>

      <EditBaseColorModal
        colorName={colorName}
        isOpen={isBaseModalOpen}
        onClose={onBaseModalClose}
        baseColorToken={baseColorToken}
        onUpdateBaseColor={(updatedColorData: TTokenGroup, newName: string) => {
          onUpdateColorData(updatedColorData, newName)
        }}
      />

      <EditColorNameModal
        defaultNamedToken={defaultNamedToken}
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
