import { Box } from '@chakra-ui/react'
import { ColorPaletteSection } from 'components/ColorPalette/ColorPaletteSection'
import '../main.css'

export default function Editor() {
  return (
    <Box
      padding={{
        base: '36px',
      }}
    >
      <ColorPaletteSection />
    </Box>
  )
}
