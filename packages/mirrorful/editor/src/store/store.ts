import Conf from 'conf'
import { TConfig, defaultFiles, defaultConfig } from '@mirrorful/core/lib/types'
import {
  ZeroPointZeroPointTwoMigration,
  ZeroPointZeroPointThreeMigration,
  ZeroPointZeroPointFourMigration,
} from './migrations'

// Our working directory is 2 levels below node_modules in production, so we go up 3 levels
const checkForSrc = () => {
  const prod = process.env.NODE_ENV === 'development'
  const path = '../../../'
  if (!prod) {
    if (`${path}src`) {
      return `${path}src/.mirrorful`
    } else {
      return `${path}.mirrorful`
    }
  } else {
    return '../.mirrorful'
  }
}

export const rootPath = checkForSrc()

export const store = new Conf<TConfig>({
  projectName: 'Mirrorful',
  projectVersion: '0.0.4',
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
  },
})
