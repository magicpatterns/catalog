import { defaultConfig, TConfig } from '@mirrorful/core/lib/types'
import Conf from 'conf'

import {
  ZeroPointZeroFiveMigration,
  ZeroPointZeroPointFourMigration,
  ZeroPointZeroPointThreeMigration,
  ZeroPointZeroPointTwoMigration,
} from './migrations'

// Our working directory is 2 levels below node_modules in production, so we go up 3 levels
export const rootPath =
  process.env.NODE_ENV === 'development'
    ? '../.mirrorful'
    : '../../../.mirrorful'

export const store = new Conf<TConfig>({
  projectName: 'Mirrorful',
  projectVersion: '0.0.5',
  cwd: `${rootPath}/store`,
  defaults: defaultConfig,
  beforeEachMigration: (store, context) => {
    console.log(
      `[main-config] migrate from ${context.fromVersion} → ${context.toVersion}`
    )
  },
  migrations: {
    '0.0.2': ZeroPointZeroPointTwoMigration,
    '0.0.3': ZeroPointZeroPointThreeMigration,
    '0.0.4': ZeroPointZeroPointFourMigration,
    '0.0.5': ZeroPointZeroFiveMigration,
  },
})
