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
        <Box bgColor={hex} css={{ flexGrow: 1, borderRadius: 8 }} />
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const colorScale = generateDefaultColorShades(colorData.base)

  return (
    <>
      <Box>
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
            <Heading css={{ marginLeft: 8 }} size="lg">
              {colorData.name}
            </Heading>
            <Box css={{ marginLeft: 12 }}>
              {colorData.isPrimary && <Badge colorScheme="blue">PRIMARY</Badge>}
              {colorData.isSecondary && <Badge>SECONDARY</Badge>}
            </Box>
          </div>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<Icon as={FiMoreVertical} />}
              variant="outline"
            />
            <MenuList>
              <MenuItem icon={<Icon as={FiEdit} />} onClick={() => onOpen()}>
                Edit Color
              </MenuItem>
              <MenuItem
                icon={<Icon as={FiTrash} />}
                onClick={() => onDeleteColorData()}
              >
                <Text color="red.500">Delete Color</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<Icon as={FiAward} />}
                onClick={() => onSetAsPrimary()}
              >
                Set as Primary
              </MenuItem>
              <MenuItem
                icon={<Icon as={FiBookmark} />}
                onClick={() => onSetAsSecondary()}
              >
                Set as Secondary
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <Divider
          css={{
            margin: '12px 0',
            width: '100%',
            height: '1px',
          }}
          bgColor="gray.600"
        />
        <Stack direction="row" spacing={8}>
          <ColorPanel title={'Base'} hex={colorData.base} />
          {colorData.hover && (
            <ColorPanel title={'Hover'} hex={colorData.hover} />
          )}
          {colorData.active && (
            <ColorPanel title={'Active'} hex={colorData.active} />
          )}
        </Stack>

        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}
        >
          <div style={{ display: 'flex' }}>
            {/* TODO: Click to copy to clipboard */}
            {Object.keys(colorScale).map((weight) => (
              <div
                key={weight}
                style={{
                  width: 40,
                  height: 40,
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
        {/* <Stack direction="row" css={{ marginTop: 16 }}>
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
        </Stack> */}
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
