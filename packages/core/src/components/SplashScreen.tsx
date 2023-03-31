import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  return (
    <Box
      css={{
        display: 'flex',
        minHeight: '100dvh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [0.5, 1.5],
        }}
        transition={{
          duration: 0.5,
          ease: 'easeIn',
          repeat: Infinity,
          repeatDelay: 0.25,
        }}
      >
        <img width={50} height={50} src="/simple_logo.png" alt="Mirrorful" />
      </motion.div>
    </Box>
  )
}
