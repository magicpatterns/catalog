// Based on ts-jest config docs (https://kulshekhar.github.io/ts-jest/docs/getting-started)
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the list at https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
  // TODO:  Consider this more carefully and select appropriate preset...
  preset: 'ts-jest',
}

export default jestConfig