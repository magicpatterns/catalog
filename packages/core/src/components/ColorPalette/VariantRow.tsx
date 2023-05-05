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
import { assertToken, TNamedToken } from '@core/types'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BsSliders2 } from 'react-icons/bs'
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md'
import tinycolor from 'tinycolor2'

function MirrorfulSlider({
  label,
  onSlide,
  sliderValue,
  min,
  max,
}: {
  label: string
  onSlide: (v: number) => void
  sliderValue: number
  min: number
  max: number
}) {
  return (
    <Flex>
      <Flex mr={2}>
        <Text fontSize={12}>
          <span style={{ fontWeight: 700 }}>{label}</span>
          {`:`}
        </Text>
        <Text fontSize={12} ml={1} mr={1}>
          {sliderValue}
        </Text>
      </Flex>
      <Slider
        min={min}
        max={max}
        colorScheme={'gray.700'}
        aria-label="slider"
        onChange={(val: number) => onSlide(val)}
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
  defaultNamedToken,
  variant,
  onUpdateVariant,
  hideIcons = false,
}: {
  defaultNamedToken: TNamedToken
  hideIcons?: boolean
  variant: TNamedToken
  onUpdateVariant: (newVariant: TNamedToken, updateDefault: boolean) => void
}) {
  const [showSlider, setShowSlider] = useState(false)
  const [hasCopiedHexCode, setHasCopiedHexCode] = useState(false)
  const { name, token } = variant
  const color = `${token.value}`
  const c = token.value
  const hsl = tinycolor(c).toHsl()
  const [h, setH] = useState<number>(Math.round(hsl.h))
  const [s, setS] = useState<number>(Math.round(hsl.s * 100))
  const [l, setL] = useState<number>(Math.round(hsl.l * 100))

  useEffect(() => {
    let copiedTimeout: NodeJS.Timeout

    if (hasCopiedHexCode) {
      copiedTimeout = setTimeout(() => {
        setHasCopiedHexCode(false)
      }, 1500)
    }

    return () => clearTimeout(copiedTimeout)
  }, [hasCopiedHexCode])

  const isBase = defaultNamedToken.token.value === variant.token.value
  const onHSLSlide = ({
    val,
    type,
  }: {
    val: number
    type: 'h' | 's' | 'l'
  }) => {
    let newColor = ''
    if (type === 'h') {
      newColor = tinycolor({
        h: val,
        s: s / 100,
        l: l / 100,
      }).toHexString()
    } else if (type === 's') {
      newColor = tinycolor({ h, s: s / 100, l: l / 100 }).toHexString()
    } else {
      newColor = tinycolor({
        h,
        s: val / 100,
        l: val / 100,
      }).toHexString()
    }

    const newToken = {
      ...variant.token,
      value: newColor,
    }
    onUpdateVariant({ ...variant, token: newToken }, isBase)
  }

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
                  onUpdateVariant(variant, true)
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
                  isBase ? (
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
          {[
            {
              label: 'H',
              onSlide: (h: number) => {
                setH(h)
                onHSLSlide({ val: h, type: 'h' })
              },
              sliderValue: h,
              min: 0,
              max: 360,
            },
            {
              label: 'S',
              onSlide: (s: number) => {
                setS(s)
                onHSLSlide({ val: s, type: 's' })
              },
              sliderValue: s,
              min: 0,
              max: 100,
            },
            {
              label: 'L',
              onSlide: (l: number) => {
                setL(l)
                onHSLSlide({ val: l, type: 'l' })
              },
              sliderValue: l,
              min: 0,
              max: 100,
            },
          ].map((obj, i) => {
            return (
              <motion.div
                key={obj.label}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * i,
                }}
              >
                <MirrorfulSlider {...obj} />
              </motion.div>
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}
