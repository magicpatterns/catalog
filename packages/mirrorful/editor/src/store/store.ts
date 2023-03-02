import Conf from 'conf'
import { ZeroPointZeroPointTwoMigration } from './migrations'

// Our working directory is 2 levels below node_modules in production, so we go up 3 levels
export const rootPath =
  process.env.NODE_ENV === 'development'
    ? '../.mirrorful'
    : '../../../.mirrorful'

export const store = new Conf({
  projectName: 'Mirrorful',
  projectVersion: '0.0.1',
  cwd: `${rootPath}/store`,
  defaults: {
    tokens: {
      colorData: [],
    },
  },
  beforeEachMigration: (store, context) => {
    console.log(
      `[main-config] migrate from ${context.fromVersion} → ${context.toVersion}`
    )
  },
  migrations: {
    '0.0.2': ZeroPointZeroPointTwoMigration,
  },
})
