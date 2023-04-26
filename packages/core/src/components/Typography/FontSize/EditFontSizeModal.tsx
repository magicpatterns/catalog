import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { darkTheme, lightTheme } from '@core/components/theme'
import { TNamedToken, TUnits, Units } from '@core/types'
import { parseUnit } from '@core/utils/parseUnit'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function EditFontSizeModal({
  isOpen,
  isAdding,
  onClose,
  initialFontSizeVariant,
  onUpdateFontSizeVariant,
  onDeleteFontSizeVariant,
}: {
  isOpen: boolean
  isAdding: boolean
  onClose: () => void
  initialFontSizeVariant?: TNamedToken
  onUpdateFontSizeVariant: (newVariant: TNamedToken) => void
  onDeleteFontSizeVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variantName, setVariantName] = useState<string>(
    initialFontSizeVariant?.name ?? ''
  )
  const [variantValue, setVariantValue] = useState<number>(
    initialFontSizeVariant?.token
      ? parseUnit(initialFontSizeVariant.token.value).rawValue
      : 0
  )
  const [id, setId] = useState<string>(
    initialFontSizeVariant?.token.id ?? uuidv4()
  )
  const [variantUnit, setVariantUnit] = useState<TUnits>(
    initialFontSizeVariant?.token
      ? parseUnit(initialFontSizeVariant.token.value).unit
      : ('px' as const)
  )

  const [error, setError] = useState<string | null>(null)
  const backgroundColor = useColorModeValue(
    lightTheme.backgroundColors.secondary,
    darkTheme.backgroundColors.secondary
  )

  const handleSave = () => {
    setError(null)
    if (variantName === '') {
      setError('Please fill out all fields.')
      return
    }

    if (variantValue < 0 || variantValue > 10000) {
      setError('Value must be greater than or equal to 0')
      return
    }

    onUpdateFontSizeVariant({
      name: variantName,
      token: {
        id,
        value: `${variantValue}${variantUnit}`,
        type: 'fontSize',
      },
    })
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setVariantName(initialFontSizeVariant?.name ?? '')
      setVariantValue(
        initialFontSizeVariant?.token
          ? parseUnit(initialFontSizeVariant.token.value).rawValue
          : 0
      )
      setVariantUnit(
        initialFontSizeVariant?.token
          ? parseUnit(initialFontSizeVariant.token.value).unit
          : ('px' as const)
      )
      setId(initialFontSizeVariant?.token.id ?? uuidv4())
      setError(null)
    }
  }, [isOpen, initialFontSizeVariant])

  if (initialFontSizeVariant) {
    console.log(initialFontSizeVariant)
    console.log(parseUnit(initialFontSizeVariant?.token.value))
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent css={{ background: backgroundColor }}>
          <ModalHeader>
            {isAdding ? 'Add' : 'Edit'} Font Size Variant
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            css={{
              padding: '0px 32px 32px 32px',
            }}
          >
            <Box css={{ display: 'flex', flexDirection: 'column' }}>
              <FormControl>
                <FormLabel>Variant Name</FormLabel>
                <Input
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                />
              </FormControl>

              <FormControl css={{ marginTop: '32px' }}>
                <FormLabel>Variant Value</FormLabel>
                <Input
                  value={variantValue}
                  onChange={(e) => setVariantValue(Number(e.target.value))}
                  type="number"
                />
              </FormControl>
              <FormControl css={{ marginTop: '32px' }}>
                <FormLabel>Variant Unit</FormLabel>
                <Select
                  value={variantUnit}
                  onChange={(e) => {
                    setVariantUnit(e.target.value as TUnits)
                  }}
                >
                  {Units.map((unit) => {
                    return (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            {error && (
              <Text color="red.500" css={{ marginTop: 18 }}>
                {error}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSave}
              css={{ marginRight: '12px' }}
              colorScheme="green"
            >
              Save Variant
            </Button>
            {onDeleteFontSizeVariant && (
              <>
                <Button
                  onClick={() => onDeleteAlertDialogOpen()}
                  colorScheme="red"
                >
                  Delete Variant
                </Button>
                <AlertDialogDelete
                  tokenName={variantName}
                  isOpen={isAlertDialogOpen}
                  onClose={onDeleteAlertDialogClose}
                  onDelete={() => onDeleteFontSizeVariant()}
                />
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
