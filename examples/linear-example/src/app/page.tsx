'use client'
import Image from 'next/image'
import { Button } from 'components/Button'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { Card } from 'components/Card'
import { Icon, Box } from '@chakra-ui/react'
import { FiGlobe, FiFeather, FiLayers, FiUsers } from 'react-icons/fi'
import { StageLight } from 'components/StageLight'
import { motion } from 'framer-motion'
import { Tokens } from '../../.mirrorful/theme'

export default function Home() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '64px 25%',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '32px',
        }}
      >
        <Image
          src="/headshot.jpg"
          width={150}
          height={150}
          alt="headshot"
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
            width: '150px',
            height: '150px',
            boxShadow: `0 0 50px 10px ${Tokens.purple.shades['400']}`,
          }}
        />
        <Heading
          text={`Hi, I'm Teddy.`}
          style={{ marginTop: '64px' }}
          size="lg"
        />
        <Text style={{ textAlign: 'center', marginTop: '12px' }} size="md">
          {`I'm a product-builder focused on the intersection`}
          <br /> {`between engineering and design.`}
        </Text>

        <Button label="Email Me" style={{ marginTop: '32px' }} />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '180px',
        }}
      >
        <StageLight />
        <motion.div
          initial={{
            y: 40,
            opacity: 0.5,
          }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{
            amount: 1,
            margin: '-5%',
          }}
          transition={{
            duration: 0.5,
          }}
          style={{
            marginTop: -20,
          }}
        >
          <Heading
            text={'My Portfolio'}
            size="md"
            style={{ marginTop: '64px', marginBottom: '32px', color: 'white' }}
          />
        </motion.div>
        <div style={{ width: '100%', marginTop: '32px' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              style={{
                height: '20vh',
                width: '33.33%',
                marginRight: '16px',
              }}
            >
              <Card>
                <Box
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Icon as={FiGlobe} width={8} height={8} />
                  <Text size="md" style={{ marginTop: 12 }}>
                    Three.js Saturn
                  </Text>
                </Box>
              </Card>
            </div>
            <div
              style={{
                height: '20vh',
                width: '66.66%',
                marginLeft: '16px',
              }}
            >
              <Card>
                <Box
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Icon as={FiFeather} width={8} height={8} />
                  <Text size="md" style={{ marginTop: 12 }}>
                    Robinhood | Product Engineer
                  </Text>
                </Box>
              </Card>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '32px' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              style={{
                height: '20vh',
                width: '66.66%',
                marginRight: '16px',
              }}
            >
              <Card>
                <Box
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Icon as={FiLayers} width={8} height={8} />
                  <Text size="md" style={{ marginTop: 12 }}>
                    Canopy | Product Engineer
                  </Text>
                </Box>
              </Card>
            </div>
            <div
              style={{
                height: '20vh',
                width: '33.33%',
                marginLeft: '16px',
              }}
            >
              <Card>
                <Box
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Icon as={FiUsers} width={8} height={8} />
                  <Text size="md" style={{ marginTop: 12 }}>
                    Teddit
                  </Text>
                </Box>
              </Card>
            </div>
          </div>
        </div>
      </div>{' '}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '64px',
        }}
      >
        <Heading text={'Contact Me'} size="md" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '60%',
            marginTop: '32px',
          }}
        >
          <button>Github</button>
          <button>Twitter</button>
          <button>YouTube</button>
          <button>Email</button>
        </div>
      </div>
    </div>
  )
}
