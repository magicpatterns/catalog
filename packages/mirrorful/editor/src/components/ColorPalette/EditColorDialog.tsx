import * as Dialog from '@radix-ui/react-dialog'
import FeatherIcon from 'feather-icons-react'
import { useState } from 'react'
import { TColorData } from 'types'

export function EditColorDialog({
  isOpen,
  onOpenChange,
  defaultData,
}: {
  isOpen: boolean
  onOpenChange: (newState: boolean) => void
  defaultData?: TColorData
}) {
  const [colorName, setColorName] = useState<string>(defaultData?.name ?? '')
  const [colorHex, setColorHex] = useState<string>(defaultData?.base ?? '')

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            <span style={{ fontSize: 24 }}>
              {defaultData ? 'Edit Color' : 'Add Color'}
            </span>
          </Dialog.Title>
          <div
            style={{ display: 'flex', flexDirection: 'column', marginTop: 18 }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <div className="mirrorful-label">Color Name</div>
            </div>
            <input
              className="mirrorful-input"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', marginTop: 18 }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <div className="mirrorful-label">Hex Code</div>
            </div>
            <input
              className="mirrorful-input"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
            />
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="mirrorful-button">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <FeatherIcon icon="x" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
