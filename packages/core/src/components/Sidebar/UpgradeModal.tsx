import {
  Box,
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { BiCheckCircle } from 'react-icons/bi'
import { FiCloud, FiGlobe } from 'react-icons/fi'

function PlanCard({
  icon,
  title,
  price,
  features,
  cta,
  onClick,
}: {
  icon: IconType
  title: string
  price: string
  features: string[]
  cta: string
  onClick: () => void
}) {
  return (
    <Box
      css={{
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid var(--border-color)',
        padding: '16px',
        borderRadius: 8,
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
      }}
    >
      <Box css={{ marginTop: '12px' }}>
        <Icon
          as={icon}
          css={{ width: '32px', height: '32px', color: '#805AD5' }}
        />
        <Text
          css={{
            marginTop: '8px',
            fontWeight: 'bold',
            fontSize: '28px',
          }}
        >
          {title}
        </Text>
        <Text
          css={{
            marginTop: '8px',
            fontWeight: 600,
            fontSize: '20px',
          }}
        >
          {price}
        </Text>
        <Stack css={{ marginTop: '24px' }}>
          {features.map((feature) => (
            <Box
              key={feature}
              css={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '18px',
              }}
            >
              <Icon
                as={BiCheckCircle}
                css={{
                  color: '#805AD5',
                  marginRight: '8px',
                  width: '20px',
                  height: '20px',
                }}
              />
              <Text css={{ fontWeight: 500 }}>{feature}</Text>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box css={{ padding: '0 12px', width: '100%', marginTop: '24px' }}>
        <Button
          css={{
            marginTop: '24px',
            width: '100%',
            color: 'white',
          }}
          backgroundImage={`linear-gradient(to bottom right, #805AD5, #553C9A)`}
          _hover={{
            backgroundImage: `linear-gradient(to bottom right, #553C9A, #805AD5)`,
          }}
          _active={{
            backgroundImage: `linear-gradient(to bottom right, #553C9A, #805AD5)`,
          }}
          shadow="lg"
          onClick={onClick}
        >
          {cta}
        </Button>
      </Box>
    </Box>
  )
}

export function UpgradeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody>
          <Box css={{ display: 'flex', height: '100%', position: 'relative' }}>
            <Box css={{ position: 'absolute', zIndex: -1, opacity: 0.7 }}>
              <img src="/mesh_background.png" />
            </Box>
            <Box
              css={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Text color="gray.500" fontWeight="black" fontSize={16}>
                  Early Access
                </Text>

                <Heading
                  fontWeight="black"
                  css={{ marginTop: '12px' }}
                  fontSize={32}
                >
                  Upgrade Plan
                </Heading>
                <Text
                  css={{ marginTop: '12px' }}
                  fontSize={16}
                  color="var(--text-color-secondary)"
                  fontWeight="bold"
                >
                  Mirrorful is open-core and includes premium features for
                  extended functionality.
                </Text>
                <Box
                  css={{
                    marginTop: '32px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '100%',
                  }}
                >
                  <PlanCard
                    icon={FiCloud}
                    title="Hobby"
                    price="$25/mo"
                    features={[
                      'Multiple Projects',
                      'Publish NPM Package',
                      'Static asset CDN',
                      'Figma Integration',
                    ]}
                    cta="Get Early Access"
                    onClick={() => {
                      window.open(
                        'https://docs.google.com/forms/d/e/1FAIpQLSdW4119bYcyGzwbNbarSwA437N9AAnJzAy6jl-XTjZybouk0g/viewform?usp=sf_link',
                        '_blank'
                      )
                    }}
                  />
                  <PlanCard
                    icon={FiGlobe}
                    title="Enterprise"
                    price="Custom"
                    features={[
                      'Multiple Projects',
                      'Publish NPM Package',
                      'Static asset CDN',
                      'Figma Integration',
                      'Organizational Access',
                      'Custom CI/CD Pipeline',
                    ]}
                    cta="Contact Us"
                    onClick={() => {
                      window.open(
                        'https://usemotion.com/meet/teddyni/mirrorful-plan?d=30',
                        '_blank'
                      )
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
