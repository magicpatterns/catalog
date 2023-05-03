export function separateBoxShadows(input: string | string[], name: string) {
  const result = []
  let current = ''
  let parenCount = 0

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (char === ',' && parenCount === 0) {
      result.push({ name: name, value: current.trim() })
      current = ''
    } else {
      current += char

      if (char === '(') {
        parenCount++
      } else if (char === ')') {
        parenCount--
      }
    }
  }

  result.push({ name: name, value: current.trim() })

  return result
}

export function getValues(str: string) {
  const regex = /^(.+?)\s*rgba/
  const match = regex.exec(str)

  if (match) {
    const values = match[1].split(' ')
    const parsedValues = values.map((val) => parseInt(val))

    return {
      hOffset: parsedValues[0],
      vOffset: parsedValues[1],
      blur: parsedValues[2],
      spread: parsedValues[3],
    }
  }
  return { hOffset: 0, vOffset: 0, blur: 0, spread: 0 }
}

export function getRgba(str: string) {
  const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
  const match = str.match(rgbaRegex)
  if (match) {
    const [, r, g, b, a] = match
    return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) }
  }
  return { r: 0, g: 0, b: 0, a: 0.5 }
}

export function initialCodeResult() {
  const result = []
  for (let i = 0; i < initialValues?.length; i++) {
    result.push(
      `${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
    )
  }
  return result
}
