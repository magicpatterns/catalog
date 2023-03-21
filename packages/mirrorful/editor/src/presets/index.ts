type props = {
  preset: 'linear' | 'facebook' | ''
}

export default async function getPreset({ preset }: props) {
  console.log(`../../presets/model/${preset}.json`)
  // const presetConfig = await fetch(
  //   __dirname + `/packages/core/src/presets/model/${preset}.json`
  // )
  // console.log(presetConfig)
  // return presetConfig
}

console.log(getPreset({ preset: 'linear' }))
