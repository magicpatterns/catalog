import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { TShadowData } from '@core/types'

import { EditShadowModal } from './EditShadowModal'

export function ShadowRow({
  shadowData,
  onUpdateShadowVariant,
  onDeleteShadowVariant,
}: {
  shadowData: TShadowData
  onUpdateShadowVariant: (newVariant: TShadowData) => void
  onDeleteShadowVariant: () => void
}) {
  const {
    isOpen: isEditVariantModalOpen,
    onOpen: onEditVariantModalOpen,
    onClose: onEditVariantModalClose,
  } = useDisclosure()

  return (
    <Box css={{ width: '60vw' }}>
      <Stack
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        spacing={8}
        direction="row"
      >
        <Box css={{ display: 'flex', alignItems: 'center' }}>
          <Box
            css={{
              padding: '12px',
              border: '1px dashed black',
              borderRadius: 8,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text css={{ fontWeight: 'bold' }}>{shadowData.name}</Text>
          </Box>
          <Box>
            <Text
              css={{
                fontWeight: 'bold',
                flexGrow: 1,
                fontSize: '1rem',
                marginLeft: '12px',
              }}
              fontSize={18}
            >
              {shadowData.value}
            </Text>
          </Box>
        </Box>

        <Box css={{ display: 'flex', alignItems: 'center' }}>
          <Box
            css={{
              width: 100,
              height: 50,
              backgroundColor: '#F3F3F3',
              border: '1px solid #D3D3D3',
              boxShadow: shadowData.value,
              padding: '24px',
              borderRadius: 8,
            }}
          />
          <Box css={{ justifySelf: 'flex-end' }}>
            <Button
              css={{ marginLeft: 32 }}
              onClick={() => onEditVariantModalOpen()}
            >
              Edit Variant
            </Button>
          </Box>
          <EditShadowModal
            isOpen={isEditVariantModalOpen}
            onClose={onEditVariantModalClose}
            initialShadowVariant={shadowData}
            onUpdateShadowVariant={onUpdateShadowVariant}
            onDeleteShadowVariant={onDeleteShadowVariant}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export function ShadowsSection({
  shadows,
  onUpdateShadowData,
}: {
  shadows: TShadowData[]
  onUpdateShadowData: (newShadowData: TShadowData[]) => void
}) {
  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  return (
    <Box>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Shadows
      </Heading>
      <Text
        fontSize={'1.2rem'}
        fontWeight="medium"
        color="gray.600"
        css={{ marginTop: '12px' }}
      >
        {`Add and edit the shadows in your theme. `}
      </Text>

      <Divider css={{ borderWidth: '2px', margin: '12px 0' }} />
      <Box css={{ marginBottom: '48px' }} />
      <Box>
        <Stack css={{ marginTop: '24px' }} spacing={12}>
          {shadows.map((shadowData, index) => (
            <ShadowRow
              key={shadowData.name}
              shadowData={shadowData}
              onUpdateShadowVariant={(updatedShadowVariant: TShadowData) => {
                const newShadowData = [...shadows]
                newShadowData[index] = updatedShadowVariant

                onUpdateShadowData(newShadowData)
              }}
              onDeleteShadowVariant={() => {
                const newShadowData = [...shadows]
                newShadowData.splice(index, 1)
                onUpdateShadowData(newShadowData)
              }}
            />
          ))}
          <Button
            css={{ height: '50px', fontSize: '18px', fontWeight: 'bold' }}
            onClick={() => onAddVariantModalOpen()}
          >
            Add New Shadow
          </Button>
        </Stack>
      </Box>
      <EditShadowModal
        isOpen={isAddVariantModalOpen}
        onClose={onAddVariantModalClose}
        onUpdateShadowVariant={(newVariant: TShadowData) => {
          onUpdateShadowData([...shadows, newVariant])
        }}
      />
    </Box>
  )
}
