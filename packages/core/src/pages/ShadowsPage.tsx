'use client'

import { Box } from '@chakra-ui/react'
import { postStoreData } from '@core/client/store'
import { ShadowsSection } from '@core/components/Shadows/ShadowsSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TTokenGroup } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function ShadowsPage({
  fetchStoreId,
}: {
  fetchStoreId: () => Promise<string>
}) {
  const authInfo = useAuthInfo()
  const {
    typography,
    colors,
    shadows,
    setShadows,
    fileTypes,
    themes,
    metadata,
  } = useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateShadows = async (data: TTokenGroup) => {
    setShadows(data)
    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: { colors: colors, typography, shadows: data },
        themes,
        files: fileTypes,
        metadata,
      },
      authInfo: authInfo,
      storeId,
    })
  }
  return (
    <Box
      padding={{
        base: '24px 48px',
        md: '36px 72px',
        lg: '48px 96px',
      }}
    >
      <ShadowsSection
        shadows={shadows}
        onUpdateShadowData={handleUpdateShadows}
      />
    </Box>
  )
}
