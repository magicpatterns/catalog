import * as Separator from '@radix-ui/react-separator'
import { Text } from 'components/core/Text'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { generateDefaultColorShades } from './utils'
import FeatherIcon from 'feather-icons-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { TColorData } from 'types'
import { EditColorDialog } from './EditColorDialog'

export function ColorRow({ colorData }: { colorData: TColorData }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)

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
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="icon-button">
                <FeatherIcon
                  icon="more-vertical"
                  style={{ width: '16px', height: '16px' }}
                />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={5}
                className="DropdownMenuContent"
              >
                <DropdownMenu.Item
                  className="DropdownMenuItem"
                  onSelect={() => {
                    console.log('selecting!!!')
                    setIsEditDialogOpen(true)
                  }}
                >
                  Edit Color
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">
                  Delete Color
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <Separator.Root
          style={{
            margin: '8px 0',
            backgroundColor: 'black',
            width: '100%',
            height: '1px',
          }}
        />
        <Text>
          {/* <input
            type="text"
            value={colorHex}
            onChange={(e) => {
              setColorHex(e.target.value)
            }}
          /> */}
          Hex Code: {colorData.base}
        </Text>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {/* TODO: Click to copy to clipboard */}
            {Object.keys(colorScale).map((weight) => (
              <div
                key={weight}
                style={{
                  width: '24px',
                  height: '24px',
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
      </div>
      <EditColorDialog
        isOpen={isEditDialogOpen}
        onOpenChange={(newState) => setIsEditDialogOpen(newState)}
        defaultData={colorData}
      />
    </>
  )
}
