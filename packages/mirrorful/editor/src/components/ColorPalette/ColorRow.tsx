import * as Separator from '@radix-ui/react-separator'
import tinycolor from 'tinycolor2'
import { generateDefaultColorShades } from './utils'
import { TColorData } from 'types'
import {
  Box,
  Button,
  Stack,
  Text,
  useDisclosure,
  Badge,
} from '@chakra-ui/react'
import { EditColorModal } from './EditColorModal'

function ColorPanel({ title, hex }: { title: string; hex: string }) {
  return (
    <Box
      bgColor={hex}
      css={{
        width: 150,
        height: 150,
        color: tinycolor(hex).isDark() ? 'white' : 'black',
        padding: '8px',
      }}
    >
      <Text fontWeight={600}>{title}</Text>
      <Text>{hex}</Text>
    </Box>
  )
}

export function ColorRow({
  colorData,
  onUpdateColorData,
  onDeleteColorData,
  onSetAsPrimary,
  onSetAsSecondary,
}: {
  colorData: TColorData
  onUpdateColorData: (colorData: TColorData) => void
  onDeleteColorData: () => void
  onSetAsPrimary: () => void
  onSetAsSecondary: () => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const colorScale = generateDefaultColorShades(colorData.base)

  return (
    <>
      <div style={{ padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: colorData.base,
              }}
            />
            <div style={{ marginLeft: 8, fontSize: 22 }}>{colorData.name}</div>
            <Box css={{ marginLeft: 12 }}>
              {colorData.isPrimary && <Badge colorScheme="blue">PRIMARY</Badge>}
              {colorData.isSecondary && <Badge>SECONDARY</Badge>}
            </Box>
          </div>
        </div>
        <Separator.Root
          style={{
            margin: '8px 0',
            backgroundColor: 'black',
            width: '100%',
            height: '1px',
          }}
        />
        <Stack direction="row" spacing={0}>
          <ColorPanel title={'Base'} hex={colorData.base} />
          {colorData.hover && (
            <ColorPanel title={'Hover'} hex={colorData.hover} />
          )}
          {colorData.active && (
            <ColorPanel title={'Active'} hex={colorData.active} />
          )}
        </Stack>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {/* TODO: Click to copy to clipboard */}
            {Object.keys(colorScale).map((weight) => (
              <div
                key={weight}
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '12px',
                  // @ts-ignore
                  color: tinycolor(colorScale[weight]).isDark()
                    ? 'white'
                    : 'black',
                  // @ts-ignore
                  backgroundColor: colorScale[weight],
                }}
              >
                {weight}
              </div>
            ))}
          </div>
        </div>
        <Stack direction="row" css={{ marginTop: 16 }}>
          <Button onClick={() => onOpen()}>Edit Color</Button>
          <Button onClick={() => onSetAsPrimary()}>Set as Primary</Button>
          <Button onClick={() => onSetAsSecondary()}>Set as Secondary</Button>
          <Button
            onClick={() => {
              onDeleteColorData()
            }}
          >
            Delete Color
          </Button>
        </Stack>
      </div>
      <EditColorModal
        isOpen={isOpen}
        onClose={(updatedColorData?: TColorData) => {
          if (updatedColorData) {
            onUpdateColorData(updatedColorData)
          }
          onClose()
        }}
        initialColorData={colorData}
      />
    </>
  )
}
