import { Layout } from 'src/components/Layout'

import { TypographySection } from '../../components/Typography/TypographySection'
import useMirrorfulStore, {
  MirrorfulState,
} from '../../store/useMirrorfulStore'
import { TConfig, TTypographyData } from '../../types'
export default function Typography({
  postStoreData,
}: {
  postStoreData: (data: TConfig) => Promise<void>
}) {
  const { typography, colors, shadows, setTypography, fileTypes } =
    useMirrorfulStore((state: MirrorfulState) => state)
  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await postStoreData({
      tokens: { colorData: colors, typography: data, shadows },
      files: fileTypes,
    })
  }
  return (
    <Layout>
      <TypographySection
        typography={{ fontSizes: typography.fontSizes }}
        onUpdateTypography={handleUpdateTypography}
      />
    </Layout>
  )
}
