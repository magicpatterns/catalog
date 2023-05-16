import {
  Box,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { assertToken, TNamedToken, TToken, TTokenGroup } from '@core/types'
import { motion } from 'framer-motion'
import { MutableRefObject, useReducer, useRef } from 'react'
import { FiEdit } from 'react-icons/fi'
import tinycolor from 'tinycolor2'

import { EditBaseColorModal } from './EditBaseColorModal'
import {
  defaultColorShadesToTokens,
  generateDefaultColorShades,
  ShadeStop
} from './utils'
import { VariantRow } from './VariantRow'

export function ColorDisplay({
  colorName,
  colorData,
  onUpdateColorData,
  onUpdateColorName,
  isErrorOnUpdateColorName,
  onDeleteColorData,
}: {
  colorName: string
  colorData: TTokenGroup
  onUpdateColorName: (newColorName: string) => void
  isErrorOnUpdateColorName: (newColor: string) => string | null
  onUpdateColorData: (colorData: TTokenGroup, newName?: string) => void
  onDeleteColorData: () => void
}) {
  const {
    isOpen: isBaseModalOpen,
    onOpen: onBaseModalOpen,
    onClose: onBaseModalClose,
  } = useDisclosure()

  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const INITIAL_STATE = {
    colourName: colorName,
    isEditing: false,
    error: null,
  }

  const ACTIONS = {
    SET_COLOUR_NAME: 'SET_COLOUR_NAME',
    SET_IS_EDITING: 'SET_IS_EDITING',
    SET_ERROR: 'SET_ERROR',
    ON_SAVE: 'ON_SAVE',
  } as const

  const reducer = (
    state: {
      colourName?: string
      isEditing?: boolean
      error?: string | null
    },
    action: {
      type: string
      payload: {
        colourName?: string
        isEditing?: boolean
        errorMessage?: string | null
      }
    }
  ) => {
    switch (action.type) {
      case ACTIONS.SET_COLOUR_NAME:
        return {
          ...state,
          colourName: action.payload.colourName,
        }
      case ACTIONS.SET_IS_EDITING:
        return {
          ...state,
          isEditing: action.payload.isEditing,
        }
      case ACTIONS.SET_ERROR:
        return {
          ...state,
          error: action.payload.errorMessage,
        }
      case ACTIONS.ON_SAVE:
        return {
          error: action.payload.errorMessage,
          isEditing: action.payload.isEditing,
          colourName: action.payload.colourName,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const colorNameRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleSave = () => {
    const error = isErrorOnUpdateColorName(state.colourName?.trim() as string)
    if (error) {
      colorNameRef.current.focus()
      dispatch({ type: ACTIONS.SET_ERROR, payload: { errorMessage: error } })
      return
    }

    dispatch({
      type: ACTIONS.ON_SAVE,
      payload: {
        errorMessage: null,
        isEditing: false,
        colourName: state.colourName?.trim() as string,
      },
    })

    onUpdateColorName(state.colourName?.trim() as string)
  }

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
        mb={state.error ? 0 : 5}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        {state.isEditing ? (
          <Input
            style={{
              border: 'none',
            }}
            padding={1}
            fontSize={{ base: '1.3rem', md: '1.5rem' }}
            width={`${(state.colourName as string).length * 12}px`}
            minWidth={200}
            ml={1}
            mr={1}
            mt={1}
            ref={colorNameRef}
            value={state.colourName}
            onChange={(e) => {
              dispatch({
                type: ACTIONS.SET_COLOUR_NAME,
                payload: { colourName: e.target.value },
              })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave()
              }
            }}
            onBlur={() => {
              handleSave()
            }}
            autoFocus
          />
        ) : (
          <Text
            padding={1}
            fontWeight={600}
            fontSize={{ base: '1.3rem', md: '1.5rem' }}
            onDoubleClick={() => {
              dispatch({
                type: ACTIONS.SET_IS_EDITING,
                payload: { isEditing: true },
              })
            }}
          >
            {state.colourName}
          </Text>
        )}
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
            {/* <MenuItem onClick={() => onColorNameModalOpen()}>
              Edit Color Name
            </MenuItem> */}
            <MenuItem onClick={() => onDeleteAlertDialogOpen()}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {state.error && (
        <Text color="red.500" mb={5}>
          {state.error}
        </Text>
      )}
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

      <AlertDialogDelete
        tokenName={colorName}
        isOpen={isAlertDialogOpen}
        onClose={onDeleteAlertDialogClose}
        onDelete={() => onDeleteColorData()}
      />
    </Box>
  )
}
