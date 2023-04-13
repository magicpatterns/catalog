import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Flex,
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
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { assertToken, TNamedTokenGroup, TTokenGroup } from '@core/types'
import { Dispatch, SetStateAction, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { HexPicker } from './ColorPicker'
import { defaultColorShadesToTokens, generateDefaultColorShades } from './utils'

interface ModalProps {
  isOpen: boolean
  onClose: (newColor?: TNamedTokenGroup) => void
  initialColorData?: TNamedTokenGroup
}

interface InputProps {
  name: string
  error: string | null
  setName: Dispatch<SetStateAction<string>>
  setError: Dispatch<SetStateAction<string | null>>
}

interface ColorProps {
  base: string
  name: string
  error: string | null
  setBase: Dispatch<SetStateAction<string>>
  setError: Dispatch<SetStateAction<string | null>>
  setColorPickerColor: Dispatch<SetStateAction<string>>
}

interface VariantProps {
  shouldGenerateVariants: boolean
  setShouldGenerateVariants: Dispatch<SetStateAction<boolean>>
}

interface LayoutProps {
  initialColorData?: TNamedTokenGroup
}

function Header({ initialColorData }: LayoutProps) {
  return (
    <>
      <ModalHeader>{initialColorData ? 'Edit Color' : 'Add Color'}</ModalHeader>
      <ModalCloseButton />
    </>
  )
}

function NameInput({ name, error, setName, setError }: InputProps) {
  return (
    <FormControl>
      <Flex>
        <FormLabel>Variable Name</FormLabel>
        <Tooltip
          placement="right"
          closeDelay={500}
          hasArrow
          label={"Variable names don't need a hyphen."}
        >
          <InfoIcon css={{ marginTop: '5px', marginLeft: '-6px' }} />
        </Tooltip>
      </Flex>
      <Input
        placeholder="e.g. Pepsi Blue"
        size="md"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          if (error) setError(null)
        }}
      />
      {error && !name && (
        <Text
          css={{ alignSelf: 'flex-start', marginTop: '8px' }}
          color="red.400"
          fontWeight="medium"
        >
          {error}
        </Text>
      )}
    </FormControl>
  )
}

function ColorInput({
  base,
  name,
  error,
  setBase,
  setError,
  setColorPickerColor,
}: ColorProps) {
  return (
    <FormControl>
      <FormLabel>
        <Box css={{ display: 'flex', alignItems: 'center' }}>
          Base Color{' '}
          <Box
            css={{ height: '14px', width: '14px', marginLeft: '8px' }}
            bgColor={base}
            border={'1px solid black'}
          />
        </Box>
      </FormLabel>
      <Input
        placeholder="e.g. #D3AC3B"
        size="md"
        value={base}
        onChange={(e) => {
          setColorPickerColor(e.target.value)
          setBase(e.target.value)
          if (error) setError(null)
        }}
      />
      {error && name && (
        <Text
          css={{ alignSelf: 'flex-start', marginTop: '8px' }}
          color="red.400"
          fontWeight="medium"
        >
          {error}
        </Text>
      )}
    </FormControl>
  )
}

function GenerateVariant({
  shouldGenerateVariants,
  setShouldGenerateVariants,
}: VariantProps) {
  return (
    <FormControl>
      <Checkbox
        checked={shouldGenerateVariants}
        onChange={() => setShouldGenerateVariants((prev) => !prev)}
        defaultChecked={shouldGenerateVariants}
      >
        Automatically generate variants
      </Checkbox>
    </FormControl>
  )
}

function Footer({
  initialColorData,
  handleOnSave,
}: LayoutProps & { handleOnSave: () => void }) {
  return (
    <ModalFooter>
      <Button onClick={handleOnSave}>
        {initialColorData ? 'Save' : 'Add'}
      </Button>
    </ModalFooter>
  )
}

export function EditColorModal({
  isOpen,
  onClose,
  initialColorData,
}: ModalProps) {
  const initialBaseValue = initialColorData?.group.base ?? {}

  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>(initialColorData?.name ?? '')
  const [base, setBase] = useState<string>(
    assertToken(initialBaseValue) ? initialBaseValue.value : ''
  )
  const [shouldGenerateVariants, setShouldGenerateVariants] = useState(false)

  const [colorPickerColor, setColorPickerColor] = useState<string>(
    `${initialColorData?.group.base?.value}` ?? ''
  )

  const handleOnSave = () => {
    // Check for blank / missing color name
    if (!name) {
      setError('Please enter a variable name.')
      return
    }

    // Check for blank / missing color
    if (!base) {
      setError('Please enter a base color.')
      return
    }

    let additionalVariants: TTokenGroup = {}

    if (shouldGenerateVariants) {
      additionalVariants = defaultColorShadesToTokens(
        generateDefaultColorShades(base)
      )
    }

    onClose({
      name,
      group: {
        base: {
          id: uuidv4(),
          value: base,
          type: 'color',
        },
        ...additionalVariants,
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <Header initialColorData={initialColorData} />
        <ModalBody
          css={{
            flexDirection: 'row',
            display: 'flex',
            gap: 24,
          }}
        >
          <Flex flexDirection="column" flex="1" gap={4}>
            <NameInput
              name={name}
              error={error}
              setName={setName}
              setError={setError}
            />
            <ColorInput
              base={base}
              name={name}
              error={error}
              setBase={setBase}
              setError={setError}
              setColorPickerColor={setColorPickerColor}
            />
            {!initialColorData ||
            base !== initialColorData.group?.base.value ? (
              <GenerateVariant
                shouldGenerateVariants={shouldGenerateVariants}
                setShouldGenerateVariants={setShouldGenerateVariants}
              />
            ) : null}
          </Flex>
          <Box flex="1">
            <HexPicker
              onChange={(colorPickerColor) => {
                setBase(colorPickerColor)
              }}
              colorPickerColor={colorPickerColor}
            />
          </Box>
        </ModalBody>
        <Footer
          handleOnSave={handleOnSave}
          initialColorData={initialColorData}
        />
      </ModalContent>
    </Modal>
  )
}
