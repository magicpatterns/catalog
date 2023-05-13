import { postStoreData } from '@core/api/postStoreData'
import { ColorPaletteSection } from '@core/components/ColorPalette/ColorPaletteSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TTokenGroup } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function ColorsPage() {
  const authInfo = useAuthInfo()

  const { colors, typography, shadows, fileTypes, setColors, themes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateColors = async (data: TTokenGroup) => {
    setColors(data)

    await postStoreData({
      newData: {
        primitives: {
          colors: data,
          typography,
          shadows,
        },
        themes,
        files: fileTypes,
      },
      authInfo: authInfo,
      storeId: '456',
    })
  }
  return (
    <ColorPaletteSection colors={colors} onUpdateColors={handleUpdateColors} />
  )
}
