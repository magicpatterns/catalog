import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { ColorPaletteSection } from 'components/ColorPalette/ColorPaletteSection'
import { ExportSuccessModal } from 'components/ExportSuccessModal'
import { useState, useEffect } from 'react'
import { TColorData } from 'types'
import '../main.css'

export default function Editor() {
  const [colors, setColors] = useState<TColorData[]>([])

  const {
    isOpen: isExportSuccessModalOpen,
    onOpen: onExportSuccessModalOpen,
    onClose: onExportSuccessModalClose,
  } = useDisclosure()

  useEffect(() => {
    const fetchStoredData = async () => {
      const response = await fetch('/api/store')
      const data = await response.json()
      setColors(data.colorData)
    }

    fetchStoredData()
  }, [])

  const handleExport = async () => {
    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        colorData: colors,
      }),
    })

    onExportSuccessModalOpen()
  }

  return (
    <Box>
      <Box
        css={{
          position: 'fixed',
          width: '100vw',
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          zIndex: 5,
          height: '56px',
        }}
      >
        <Box
          css={{
            display: 'flex',
            padding: '8px 48px',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <img src="/mirrorful_logo.png" style={{ height: '39px' }} />
          </Box>
          <Button colorScheme="blue" onClick={handleExport}>
            Export Config
          </Button>
          <Box />
        </Box>
        <Box
          css={{
            height: '1px',
            width: '100%',
            background: 'linear-gradient(to right, #F5F5F5, #3F3F3F, #F5F5F5)',
          }}
        />
      </Box>

      <Box
        padding={{
          base: '64px 48px 16px 48px',
        }}
      >
        <ColorPaletteSection colors={colors} onUpdateColors={setColors} />
      </Box>
      <ExportSuccessModal isOpen={true} onClose={onExportSuccessModalClose} />
    </Box>
  )
}
