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
import { Input } from '@chakra-ui/react'
import { TNamedToken } from '@core/types'
import React from 'react'
import { useEffect, useState } from 'react'
import { BsSliders2 } from 'react-icons/bs'
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md'
import tinycolor from 'tinycolor2'

function MirrorfulSlider({
  label,
  onSlide,
  sliderValue,
  min,
  max,
  onChangeStartCB,
  onChangeEndCB,
}: {
  label: string
  onSlide: (v: number) => void
  sliderValue: number
  min: number
  max: number
  onChangeStartCB?: () => void
  onChangeEndCB?: () => void
}) {
  return (
    <Flex>
      <Flex mr={2} style={{ minWidth: '60px' }} alignItems="center">
        <Text fontSize={{ base: '10px' }}>
          <span style={{ fontWeight: 700 }}>{label}</span>
          {`:`}
        </Text>
        <Input
          style={{
            border: 'none',
          }}
          width={10}
          height={3}
          padding={1}
          fontSize={{ base: '10px' }}
          ml={1}
          mr={1}
          value={sliderValue}
          onChange={(e) => {
            onSlide(Number(e.target.value))
          }}
        />
      </Flex>
      <Slider
        min={min}
        max={max}
        colorScheme={'gray.700'}
        aria-label="slider"
        value={sliderValue}
        onChangeStart={() => {
          if (onChangeStartCB) onChangeStartCB()
        }}
        onChange={(val: number) => {
          onSlide(val)
        }}
        onChangeEnd={() => {
          if (onChangeEndCB) onChangeEndCB()
        }}
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

export function VariantRowDisplay({
  variant,
  onUpdateVariant,
  hideIcons = false,
  isBase = false,
  onChangeColors,
  updateBaseVariant,
}: {
  hideIcons?: boolean
  isBase?: boolean
  variant: TNamedToken
  onUpdateVariant: () => void
  updateBaseVariant: (newVariant: TNamedToken) => void
  onChangeColors: (newVariant: TNamedToken, updateDefault: boolean) => void
}) {
  const [showSlider, setShowSlider] = useState(false)
  const [hasCopiedHexCode, setHasCopiedHexCode] = useState(false)
  const { name, token } = variant

  const hsl = tinycolor(token.value).toHsl()
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
    onChangeColors(
      {
        ...variant,
        token: {
          ...variant.token,
          value: newColor,
        },
      },
      isBase
    )
  }

  const textColor =
    tinycolor(variant.token.value).isDark() &&
    tinycolor(variant.token.value).getAlpha() > 0.5
      ? 'white'
      : 'black'
  return (
    <Flex>
      <Box
        css={{
          height: '3rem',
          width: '100%',
          backgroundColor: `${variant.token.value}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 24px',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
        }}
        role="group"
      >
        <Text
          fontSize={{ base: '0.8rem', md: '1rem' }}
          fontWeight={isBase || hideIcons ? 800 : 400}
          color={textColor}
        >
          {name} {(isBase || hideIcons) && '[BASE]'}
        </Text>
        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Tooltip
            label="Copied to Clipboard"
            hasArrow
            isDisabled={!hasCopiedHexCode}
            isOpen={hasCopiedHexCode}
          >
            <Text
              fontSize={{ base: '0.8rem', md: '1rem' }}
              fontWeight={600}
              color={textColor}
              paddingLeft={3}
              _hover={{
                cursor: 'pointer',
                backgroundColor: textColor,
                color: textColor === 'white' ? 'black' : 'white',
                borderRadius: 8,
                paddingInline: 2,
              }}
              onClick={() => {
                navigator.clipboard.writeText(variant.token.value)
                setHasCopiedHexCode(true)
              }}
            >
              {variant.token.value}
            </Text>
          </Tooltip>
          {!hideIcons && (
            <>
              <IconButton
                disabled={isBase}
                onClick={() => {
                  updateBaseVariant(variant)
                }}
                style={{ marginLeft: '24px' }}
                variant="outline"
                color={textColor}
                _hover={{
                  backgroundColor: isBase ? 'none' : 'rgba(235, 235, 235, 0.3)',
                }}
                _active={{
                  backgroundColor: isBase ? 'none' : 'rgba(235, 235, 235, 0.3)',
                }}
                size="sm"
                css={{
                  border: 'none',
                }}
                aria-label="Select as base"
                icon={
                  isBase ? (
                    <MdOutlineRadioButtonChecked />
                  ) : (
                    <MdOutlineRadioButtonUnchecked />
                  )
                }
              />
              <IconButton
                isActive={showSlider}
                onClick={() => setShowSlider(!showSlider)}
                variant="outline"
                color={textColor}
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
          ].map((obj) => {
            return (
              <MirrorfulSlider
                key={obj.label}
                {...obj}
                onChangeEndCB={() => {
                  onUpdateVariant()
                }}
              />
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}

export const VariantRow = React.memo(
  VariantRowDisplay,
  (prevProps, nextProps) => {
    return (
      prevProps.variant.token.value === nextProps.variant.token.value &&
      prevProps.variant.name === nextProps.variant.name &&
      prevProps.isBase === nextProps.isBase
    )
  }
)
