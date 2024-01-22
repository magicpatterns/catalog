'use client'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export function ArrowLink({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', transition: 'color 100ms ease-in-out' }}
    >
      <Flex
        align="center"
        onMouseEnter={() => {
          setIsHovering(true)
        }}
        onMouseLeave={() => {
          setIsHovering(false)
        }}
        style={{
          cursor: 'pointer',
        }}
      >
        <Text color={isHovering ? 'indigo' : 'gray'} weight={'medium'}>
          {children}
        </Text>
        <motion.div
          animate={{ x: isHovering ? 4 : 0 }}
          style={{
            marginLeft: '4px',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '2px',
          }}
        >
          <ArrowRightIcon
            color={isHovering ? 'indigo' : 'gray'}
            height="16"
            width="16"
          />
        </motion.div>
      </Flex>
    </Link>
  )
}
