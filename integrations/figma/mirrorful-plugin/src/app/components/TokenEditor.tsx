import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { TTokenGroup } from '../types'

export function TokenEditor() {
  const [colorTokens, setColorTokens] = useState<TTokenGroup>({})

  return (
    <Box>
      <Text>Color</Text>
      <Box></Box>
    </Box>
  )
}
