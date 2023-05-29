import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { assertToken, TNamedToken, TTokenGroup } from '@core/types'
import { onCopy } from '@core/utils/onCopy'
import { useEffect, useState } from 'react'

import { LoginAlert } from '../LoginAlert'
import { EditShadowModal } from './EditShadowModal'

export function ShadowRow({
  shadowData,
  onUpdateShadowVariant,
  onDeleteShadowVariant,
}: {
  shadowData: TNamedToken
  onUpdateShadowVariant: (newVariant: TNamedToken) => void
  onDeleteShadowVariant: () => void
}) {
  const {
    isOpen: isEditVariantModalOpen,
    onOpen: onEditVariantModalOpen,
    onClose: onEditVariantModalClose,
  } = useDisclosure()

  const [hasCopiedShadowValue, setHasCopiedShadowValue] = useState(false)

  useEffect(() => {
    let copiedTimeout: NodeJS.Timeout
    if (hasCopiedShadowValue) {
      copiedTimeout = setTimeout(() => {
        setHasCopiedShadowValue(false)
      }, 1500)
    }
    return () => clearTimeout(copiedTimeout)
  }, [hasCopiedShadowValue])

  return (
    <Box width={{ base: '80vw', sm: '60vw' }}>
      <Stack
        spacing={{ base: 4, sm: 8 }}
        alignItems={{ base: 'flex-start', sm: 'center' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Box
          css={{
            padding: '12px',
            border: '1px dashed black',
            borderRadius: 8,
            minWidth: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text css={{ fontWeight: 'bold' }} noOfLines={1}>
            {shadowData.name}
          </Text>
        </Box>
        <Box width={'80%'}>
          <Tooltip
            label="Copied Shadow to Clipboard"
            hasArrow
            isDisabled={!hasCopiedShadowValue}
            isOpen={hasCopiedShadowValue}
          >
            <Text
              css={{
                fontWeight: 'bold',
                paddingInline: 2,
                fontSize: '1rem',
              }}
              _hover={{
                cursor: 'pointer',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: 8,
              }}
              onClick={() => {
                onCopy(shadowData.token.value)
                setHasCopiedShadowValue(true)
              }}
            >
              {shadowData.token.value}
            </Text>
          </Tooltip>
        </Box>

        <Box
          css={{
            minWidth: 100,
            height: 50,
            backgroundColor: '#F3F3F3',
            border: '1px solid #D3D3D3',
            boxShadow: shadowData.token.value,
            padding: '24px',
            borderRadius: 8,
          }}
        />

        <Box alignItems="center" justifyContent={'flex-end'}>
          <Button onClick={() => onEditVariantModalOpen()}>Edit Variant</Button>
        </Box>
        <EditShadowModal
          isOpen={isEditVariantModalOpen}
          onClose={onEditVariantModalClose}
          initialShadowVariant={shadowData}
          onUpdateShadowVariant={onUpdateShadowVariant}
          onDeleteShadowVariant={onDeleteShadowVariant}
        />
      </Stack>
    </Box>
  )
}

export function ShadowsSection({
  shadows,
  onUpdateShadowData,
}: {
  shadows: TTokenGroup
  onUpdateShadowData: (newShadowData: TTokenGroup) => void
}) {
  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  return (
    <Box>
      <LoginAlert />
      <Heading
        fontSize={'2.5rem'}
        fontWeight="black"
        color="var(--text-color-primary)"
      >
        Shadows
      </Heading>
      <Text
        fontSize={'1.2rem'}
        fontWeight="medium"
        color="var(--text-color-secondary)"
        css={{ marginTop: '12px' }}
      >
        {`Add and edit the shadows in your theme. `}
      </Text>

      <Divider css={{ borderWidth: '2px', margin: '12px 0' }} />
      <Box css={{ marginBottom: '48px' }} />
      <Box>
        <Stack css={{ marginTop: '24px' }} spacing={12}>
          {Object.keys(shadows)
            .map((key) => ({
              name: key,
              token: shadows[key],
            }))
            .filter((value): value is TNamedToken => assertToken(value.token))
            .map((data) => {
              return (
                <ShadowRow
                  key={data.name}
                  shadowData={data}
                  onUpdateShadowVariant={(
                    updatedShadowVariant: TNamedToken
                  ) => {
                    const newShadowData = { ...shadows }

                    if (data.name !== updatedShadowVariant.name) {
                      delete newShadowData[data.name]
                    }

                    newShadowData[updatedShadowVariant.name] =
                      updatedShadowVariant.token

                    onUpdateShadowData(newShadowData)
                  }}
                  onDeleteShadowVariant={() => {
                    const newShadowData = { ...shadows }
                    delete newShadowData[data.name]
                    onUpdateShadowData(newShadowData)
                  }}
                />
              )
            })}
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
        onUpdateShadowVariant={(newVariant: TNamedToken) => {
          const newShadowData = { ...shadows }
          newShadowData[newVariant.name] = newVariant.token

          onUpdateShadowData(newShadowData)
        }}
      />
    </Box>
  )
}
