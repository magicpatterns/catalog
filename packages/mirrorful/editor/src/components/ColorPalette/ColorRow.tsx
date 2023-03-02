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
  Heading,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { EditColorModal } from './EditColorModal'
import {
  FiMoreVertical,
  FiTrash,
  FiEdit,
  FiAward,
  FiBookmark,
} from 'react-icons/fi'

function ColorPanel({ title, hex }: { title: string; hex: string }) {
  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '14px 6px 6px 6px',
        borderRadius: 8,
        border: '1px solid #DFDFDF',
        boxShadow: `0px 8px 15px rgba(0, 0, 0, 0.25)`,
      }}
    >
      <Box>
        <Text fontWeight={500}>
          {title} {hex}
        </Text>
      </Box>
      <Box
        css={{
          width: 150,
          height: 150,
          padding: '16px',
          display: 'flex',
        }}
      >
        <Box
          bgColor={hex}
          border={`0.5px solid ${tinycolor(hex).isDark() ? 'white' : 'black'}`}
          css={{ flexGrow: 1, borderRadius: 8 }}
        />
      </Box>
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
  const colorScale = generateDefaultColorShades(colorData.base)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box css={{ display: 'flex' }}>
        <Box css={{ width: 350 }}>
          <Box>
            <Heading fontWeight="extrabold" fontSize={28}>
              {colorData.name}
            </Heading>
            <Text
              fontWeight="bold"
              color="gray.600"
              fontSize={16}
              css={{ marginTop: '8px' }}
            >
              {colorData.base.toUpperCase()}
            </Text>
            <Text
              fontWeight="bold"
              color="gray.600"
              fontSize={16}
              css={{ marginTop: '4px' }}
            >
              {tinycolor(colorData.base).toRgbString()}
            </Text>
            <Text
              fontWeight="bold"
              color="gray.600"
              fontSize={16}
              css={{ marginTop: '4px' }}
            >
              {tinycolor(colorData.base).toHslString()}
            </Text>
          </Box>
        </Box>
        <Box css={{ display: 'flex' }}>
          <Box
            css={{
              backgroundColor: colorData.base,
              width: 200,
              height: 200,
              padding: '16px',
              borderRadius: '12px 0 0 12px',
              color: tinycolor(colorData.base).isDark() ? 'white' : 'black',
            }}
          >
            <Text fontSize={14} fontWeight="black">
              BASE
            </Text>
            <Text fontSize={22} fontWeight="medium">
              {colorData.base.toUpperCase()}
            </Text>
          </Box>
          <Box css={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              css={{
                backgroundColor: colorData.hover,
                width: 200,
                height: 100,
                padding: '16px',
                color: tinycolor(colorData.hover ?? '#ffffff').isDark()
                  ? 'white'
                  : 'black',
                borderRadius: '0 12px 0 0',
                border: colorData.hover ? 'none' : '1px dashed black',
              }}
            >
              <Text fontSize={14} fontWeight="black">
                HOVER
              </Text>
              <Text fontSize={colorData.hover ? 22 : 16} fontWeight="medium">
                {colorData.hover ? colorData.hover.toUpperCase() : 'Not set.'}
              </Text>
            </Box>
            <Box
              css={{
                backgroundColor: colorData.active,
                width: 200,
                height: 100,
                padding: '16px',
                color: tinycolor(colorData.active ?? '#ffffff').isDark()
                  ? 'white'
                  : 'black',
                borderRadius: '0 0 12px 0',
                border: colorData.active ? 'none' : '1px dashed black',
              }}
            >
              <Text fontSize={14} fontWeight="black">
                ACTIVE
              </Text>
              <Text fontSize={colorData.active ? 22 : 16} fontWeight="medium">
                {colorData.active ? colorData.active.toUpperCase() : 'Not set.'}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          css={{ display: 'flex', alignItems: 'center', marginLeft: '64px' }}
        >
          <Box
            css={{
              display: 'flex',
              width: 250,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {Object.keys(colorScale).map((weight) => (
              <Box
                key={weight}
                style={{
                  width: 50,
                  height: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                  // @ts-ignore
                  color: tinycolor(colorScale[weight]).isDark()
                    ? 'white'
                    : 'black',
                  // @ts-ignore
                  backgroundColor: colorScale[weight],
                }}
              >
                {weight}
              </Box>
            ))}
          </Box>
        </Box>
        <Stack css={{ marginLeft: '32px' }}>
          <Button
            css={{ marginTop: '16px' }}
            backgroundColor={colorData.base}
            color={tinycolor(colorData.base).isDark() ? 'white' : 'black'}
            _hover={{
              backgroundColor: colorData.hover ?? colorScale['600'],
            }}
            _active={{
              backgroundColor: colorData.active ?? colorScale['700'],
            }}
            leftIcon={<Icon as={FiEdit} />}
            onClick={() => {
              onOpen()
            }}
          >
            Edit
          </Button>
          <Button leftIcon={<Icon as={FiTrash} />} onClick={onDeleteColorData}>
            Delete
          </Button>
          <Button
            leftIcon={<Icon as={FiAward} />}
            onClick={() => {
              onSetAsPrimary()
            }}
          >
            Set as Primary
          </Button>
          <Button
            leftIcon={<Icon as={FiBookmark} />}
            onClick={() => {
              onSetAsSecondary()
            }}
          >
            Set as Secondary
          </Button>
        </Stack>
      </Box>
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
