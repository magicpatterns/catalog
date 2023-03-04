import Conf from 'conf'
import { TTokens } from 'types'
import {
  ZeroPointZeroPointTwoMigration,
  ZeroPointZeroPointThreeMigration,
  defaultTypography,
} from './migrations'

// Our working directory is 2 levels below node_modules in production, so we go up 3 levels
export const rootPath =
  process.env.NODE_ENV === 'development'
    ? '../.mirrorful'
    : '../../../.mirrorful'

export const store = new Conf<{ tokens: TTokens }>({
  projectName: 'Mirrorful',
  projectVersion: '0.0.3',
  cwd: `${rootPath}/store`,
  defaults: {
    tokens: {
      colorData: [],
      typography: defaultTypography,
    },
  },
  beforeEachMigration: (store, context) => {
    console.log(
      `[main-config] migrate from ${context.fromVersion} → ${context.toVersion}`
    )
  },
  migrations: {
    '0.0.2': ZeroPointZeroPointTwoMigration,
    '0.0.3': ZeroPointZeroPointThreeMigration,
  },
})
