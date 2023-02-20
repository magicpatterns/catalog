import chalk from 'chalk'
import path from 'path'
import { PackageManager } from './helpers/get-pkg-manager'
import { isWriteable } from './helpers/is-writeable'
import { makeDir } from './helpers/make-dir'
import spawn from 'cross-spawn'

export async function init({
  appPath,
  packageManager,
  verbose,
}: {
  appPath: string
  packageManager: PackageManager
  verbose: boolean
}) {
  const root = path.resolve(appPath)

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    )
    console.error(
      'It is likely you do not have write permissions for this folder.'
    )
    process.exit(1)
  }

  await makeDir('.mirrorful')
  const port = 5050 // don't hard code this

  // NOTE: it seems that 'production' is not a valid NODE_ENV value at this time
  // Right now it's either 'development' or undefined
  if (process.env.NODE_ENV === 'development') {
    process.chdir(`editor`)
  } else {
    process.chdir(`node_modules/mirrorful/editor`)
  }

  // Assume success
  console.log(`${chalk.green('Success!')}`)
  console.log()
  console.log(`url: ${chalk.cyan(`${`http://localhost:`}${port.toString()}`)}`)
  console.log()

  const useYarn = packageManager === 'yarn'
  console.log('Inside your project, you can run:')
  console.log()
  console.log(chalk.cyan(`  ${useYarn ? 'yarn run ' : 'npx '}mirrorful`))
  console.log()
  console.log('to start Mirrorful development at any time 🚀')
  console.log()

  let command = 'start'
  if (process.env.NODE_ENV === 'development') {
    command = 'dev'
  }
  // TODO(Danilowicz): This probably means yarn needs to be installed globally?
  spawn.sync('yarn', ['run', command, '-p', port.toString()], {
    stdio: verbose ? 'inherit' : 'ignore',
  })
}
