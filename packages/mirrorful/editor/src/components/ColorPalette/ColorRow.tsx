import * as Separator from '@radix-ui/react-separator'
import tinycolor from 'tinycolor2'
import { generateDefaultColorShades } from './utils'
import { TColorData, TColorVariant } from 'types'
import {
  Box,
  Button,
  Stack,
  Text,
  useDisclosure,
  Heading,
  Link,
  Checkbox,
} from '@chakra-ui/react'
import { EditColorModal } from './EditColorModal'
import { EditColorNameModal } from './EditColorNameModal'
import { useState } from 'react'
import { EditVariantModal } from './EditVariantModal'
import { ColorVariantPlaceholder } from './ColorVariantPlaceholder'
import { AlertDialogDelete } from 'components/AlertDialogDelete'

function VariantSquare({
  variant,
  onUpdateVariant,
  onDeleteVariant,
}: {
  variant: TColorVariant
  onUpdateVariant: (newVariant: TColorVariant) => void
  onDeleteVariant: () => void
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const {
    isOpen: isEditVariantModalOpen,
    onOpen: onEditVariantModalOpen,
    onClose: onEditVariantModalClose,
  } = useDisclosure()

  const { name, color } = variant

  return (
    <Box
      css={{
        backgroundColor: color,
        width: 110,
        height: 110,
        padding: '8px',
        color: tinycolor(color).isDark() ? 'white' : 'black',
        borderRadius: 8,
        marginRight: '24px',
        border: '1px solid gray',
        position: 'relative',
      }}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Text fontSize={14} fontWeight="black">
        {name.toUpperCase()}
      </Text>
      <Text fontSize={18} fontWeight="medium">
        {color.toUpperCase()}
      </Text>
      <Link onClick={onEditVariantModalOpen}>Edit</Link>
      <EditVariantModal
        isOpen={isEditVariantModalOpen}
        onClose={onEditVariantModalClose}
        initialVariant={variant}
        onUpdateVariant={onUpdateVariant}
        onDeleteVariant={onDeleteVariant}
      />
    </Box>
  )
}

export function ColorRow({
  colorData,
  onUpdateColorData,
  onDeleteColorData,
}: {
  colorData: TColorData
  onUpdateColorData: (colorData: TColorData) => void
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

  return (
    <>
      <Box css={{ display: 'flex' }}>
        <Box css={{ width: 350, paddingRight: '64px' }}>
          <Box>
            <Heading fontWeight="extrabold" fontSize={28}>
              {colorData.name}
            </Heading>
          </Box>
          <Stack direction="column" css={{ marginTop: '32px' }} spacing={4}>
            <Button onClick={() => onColorNameModalOpen()}>
              Edit Color Name
            </Button>
            <Button onClick={() => onAddVariantModalOpen()}>Add Variant</Button>
            <Button onClick={() => onDeleteAlertDialogOpen()}>
              Delete Color
            </Button>
          </Stack>
        </Box>
        <Box css={{ display: 'flex' }}>
          {colorData.baseColor && (
            <Box
              css={{
                backgroundColor: colorData.baseColor,
                width: 240,
                height: 240,
                padding: '24px',
                borderRadius: 8,
                color: tinycolor(colorData.baseColor).isDark()
                  ? 'white'
                  : 'black',
                border: '1px solid gray',
              }}
            >
              <Text fontSize={18} fontWeight="black">
                BASE
              </Text>
              <Text fontSize={24} fontWeight="medium">
                {colorData.baseColor.toUpperCase()}
              </Text>
            </Box>
          )}

          <Box
            css={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              marginLeft: '24px',
              justifyContent: 'space-between',
            }}
            height={240}
          >
            {Object.keys(colorData.variants).map((variant) => (
              <VariantSquare
                key={variant}
                variant={{
                  name: variant,
                  color: colorData.variants[variant],
                  isBase: colorData.variants[variant] === colorData.baseColor,
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
            ))}
            <ColorVariantPlaceholder onClick={() => onAddVariantModalOpen()} />
          </Box>
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

          onUpdateColorData({ ...colorData, variants: updatedVariants })
        }}
      />
      <AlertDialogDelete
        isOpen={isAlertDialogOpen}
        onClose={onDeleteAlertDialogClose}
        onDelete={() => onDeleteColorData()}
      />
    </>
  )
}
