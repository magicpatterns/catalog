import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SplashScreen() {
  return (
    <Box
      css={{
        display: 'flex',
        minHeight: '100dvh',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        inset: '0',
        zIndex: '100',
        backgroundColor: 'white',
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 0.75,
          ease: 'easeIn',
          repeat: Infinity,
        }}
      >
        <Image width={50} height={50} src="/simple_logo.png" alt="Mirrorful" />
      </motion.div>
    </Box>
  )
}
