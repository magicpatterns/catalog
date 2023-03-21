type props = {
  preset: 'linear' | 'facebook' | ''
}

async function getPreset({ preset }: props) {
  const presetConfig = await fetch(
    __dirname + `/packages/core/src/presets/model/${preset}.json`
  )
  console.log(presetConfig)
  return presetConfig
}

console.log(getPreset({ preset: 'linear' }))
