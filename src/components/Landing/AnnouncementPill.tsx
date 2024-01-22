import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Box, Text } from '@radix-ui/themes'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export function AnnouncementPill({
  text,
  href,
  onClick,
}: {
  text: string
  href?: string
  onClick?: () => void
}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Link
      href={href ?? ''}
      style={{ textDecoration: 'none', cursor: 'default' }}
    >
      <Box
        style={{
          padding: '6px 18px 6px 14px',
          border: '1px solid white',
          width: 'fit-content',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: `0 0 ${isHovering ? '20px' : '5px'} #fff`,
          cursor: href || onClick ? 'pointer' : 'initial',
          transition: 'box-shadow 200ms ease-in-out',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={onClick}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Text size="2" weight="medium" style={{ color: 'white' }}>
          {text}
        </Text>
        <motion.div
          animate={{ x: isHovering ? 4 : 0 }}
          style={{
            marginLeft: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowRightIcon color={'white'} height="16" width="16" />
        </motion.div>
      </Box>
    </Link>
  )
}
