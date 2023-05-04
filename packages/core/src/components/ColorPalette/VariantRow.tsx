import {
  Box,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { TNamedToken } from '@core/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsSliders2 } from 'react-icons/bs'
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md'
import tinycolor from 'tinycolor2'

function MirrorfulSlider({ label }: { label: string }) {
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <Flex>
      <Flex mr={2}>
        <Text fontSize={12}>{`${label}:`}</Text>
        <Text fontSize={12} ml={1} mr={1}>
          {sliderValue}
        </Text>
      </Flex>
      <Slider
        colorScheme={'gray.700'}
        aria-label="slider"
        onChange={(val: number) => setSliderValue(val)}
        size="lg"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  )
}

export function VariantRow({
  variant,
  onUpdateVariant,
  hideIcons = false,
}: {
  hideIcons?: boolean
  variant: TNamedToken
  onUpdateVariant: (newVariant: TNamedToken) => void
}) {
  const [showSlider, setShowSlider] = useState(false)
  const [hasCopiedHexCode, setHasCopiedHexCode] = useState(false)
  const { name, token } = variant

  useEffect(() => {
    let copiedTimeout: NodeJS.Timeout

    if (hasCopiedHexCode) {
      copiedTimeout = setTimeout(() => {
        setHasCopiedHexCode(false)
      }, 1500)
    }

    return () => clearTimeout(copiedTimeout)
  }, [hasCopiedHexCode])

  const color = `${token.value}`
  const isBase = variant.token?.metadata?.isBase
  return (
    <Flex>
      <Box
        css={{
          height: '3rem',
          width: '100%',
          backgroundColor: `${token.value}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 24px',
          borderRadius: 8,
          border: '1px solid black',
        }}
        role="group"
      >
        <Text
          fontSize="1rem"
          fontWeight={isBase ? 800 : 400}
          color={tinycolor(color).isDark() ? 'white' : 'black'}
        >
          {name} {isBase && '[BASE]'}
        </Text>
        <Box
          css={{ display: 'flex', alignItems: 'center', position: 'relative' }}
        >
          <Tooltip
            label="Copied Hex to Clipboard"
            hasArrow
            isDisabled={!hasCopiedHexCode}
            isOpen={hasCopiedHexCode}
          >
            <Text
              fontSize="1rem"
              fontWeight={600}
              color={tinycolor(color).isDark() ? 'white' : 'black'}
              _hover={{
                cursor: 'pointer',
                backgroundColor: tinycolor(color).isDark() ? 'white' : 'black',
                color: color,
                borderRadius: 8,
                paddingInline: 2,
              }}
              onClick={() => {
                navigator.clipboard.writeText(color)
                setHasCopiedHexCode(true)
              }}
            >
              {color}
            </Text>
          </Tooltip>
          {!hideIcons && (
            <>
              <IconButton
                disabled={isBase}
                onClick={() => {
                  const newToken = {
                    ...variant.token,
                    metadata: { isBase: true },
                  }
                  onUpdateVariant({ ...variant, token: newToken })
                }}
                style={{ marginLeft: '24px' }}
                variant="outline"
                color={
                  color
                    ? tinycolor(color).isDark()
                      ? 'white'
                      : 'black'
                    : 'black'
                }
                _hover={{
                  backgroundColor: 'rgba(235, 235, 235, 0.3)',
                }}
                _active={{
                  backgroundColor: 'rgba(235, 235, 235, 0.3)',
                }}
                size="sm"
                css={{
                  border: 'none',
                }}
                aria-label="Select as base"
                icon={
                  variant.token?.metadata?.isBase ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )
                }
              />
              <IconButton
                onClick={() => setShowSlider(!showSlider)}
                variant="outline"
                color={
                  color
                    ? tinycolor(color).isDark()
                      ? 'white'
                      : 'black'
                    : 'black'
                }
                _hover={{
                  backgroundColor: 'rgba(235, 235, 235, 0.3)',
                }}
                _active={{
                  backgroundColor: 'rgba(235, 235, 235, 0.3)',
                }}
                size="sm"
                css={{
                  border: 'none',
                }}
                aria-label="Show sliders"
                icon={<BsSliders2 />}
              />
            </>
          )}
        </Box>
      </Box>
      {showSlider && (
        <Flex
          ml={4}
          style={{
            width: '30%',
            flexDirection: 'column',
            height: '3rem',
          }}
        >
          {['H', 'S', 'L'].map((label, i) => {
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * i,
                }}
              >
                <MirrorfulSlider label={label} />
              </motion.div>
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}
