import { postStoreData } from '@core/api/postStoreData'
import { TypographySection } from '@core/components/Typography/TypographySection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TPrimitivesTypography } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function TypographyPage() {
  const authInfo = useAuthInfo()

  const { typography, colors, shadows, setTypography, fileTypes, themes } =
    useMirrorfulStore((state: MirrorfulState) => state)
  const handleUpdateTypography = async (data: TPrimitivesTypography) => {
    setTypography(data)
    await postStoreData({
      newData: {
        primitives: { colors, typography: data, shadows },
        themes,
        files: fileTypes,
      },
      authInfo: authInfo,
      storeId: '456',
    })
  }
  return (
    <TypographySection
      typography={{
        fontSizes: typography.fontSizes,
        fontWeights: typography.fontWeights,
        lineHeights: typography.lineHeights,
      }}
      onUpdateTypography={handleUpdateTypography}
    />
  )
}
