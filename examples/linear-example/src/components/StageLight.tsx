import { Tokens } from '../../.mirrorful/theme'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export function StageLight() {
  return (
    <Box
      css={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: -1,
      }}
    >
      <Box
        css={{
          top: '-250px',
          position: 'absolute',
          width: '100vw',
          height: '500px',
          alignSelf: 'center',
          maskImage:
            'radial-gradient(100% 50% at center center, black, transparent)',
        }}
      >
        <Box
          css={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              height: '100%',
              width: '50%',
              left: 0,
              // background: `conic-gradient(from 90deg at 60% 50%, ${colorScale['300']}, #000000)`,
            }}
            initial={{
              background: `conic-gradient(from 90deg at 80% 50%, ${Tokens.purple.shades['100']}, #000000)`,
              opacity: 0.2,
            }}
            whileInView={{
              background: `conic-gradient(from 90deg at 60% 50%, ${Tokens.purple.shades['300']}, #000000)`,
              opacity: 0.8,
            }}
            viewport={{
              amount: 0.9,
              margin: '20% 0px -5% 0px',
            }}
            transition={{
              duration: 0.5,
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              right: 0,
              height: '100%',
              width: '50%',
            }}
            initial={{
              background: `conic-gradient(from 270deg at 20% 50%, #000000, ${Tokens.purple.shades['100']})`,
              opacity: 0.2,
            }}
            whileInView={{
              background: `conic-gradient(from 270deg at 40% 50%, #000000, ${Tokens.purple.shades['300']})`,
              opacity: 0.8,
            }}
            viewport={{
              amount: 0.9,
              margin: '20% 0px -5% 0px',
            }}
            transition={{
              duration: 0.5,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
