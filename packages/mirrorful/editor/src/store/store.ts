import { defaultConfigV2, TMirrorfulStore } from '@mirrorful/core/lib/types'
import Conf from 'conf'

import {
  ZeroPointZeroFiveMigration,
  ZeroPointZeroPointFourMigration,
  ZeroPointZeroPointThreeMigration,
  ZeroPointZeroPointTwoMigration,
  ZeroPointZeroSevenMigration,
  ZeroPointZeroSixMigration,
} from './migrations'

// Our working directory is 2 levels below node_modules in production, so we go up 3 levels
export const rootPath =
  process.env.NODE_ENV === 'development'
    ? '../.mirrorful'
    : '../../../.mirrorful'

export const store = new Conf<TMirrorfulStore>({
  projectName: 'Mirrorful',
  projectVersion: '0.0.7',
  cwd: `${rootPath}/store`,
  defaults: defaultConfigV2,
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
    '0.0.6': ZeroPointZeroSixMigration,
    '0.0.7': ZeroPointZeroSevenMigration,
  },
})
