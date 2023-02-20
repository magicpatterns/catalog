import chalk from 'chalk'
import path from 'path'
import { PackageManager } from './helpers/get-pkg-manager'
import { isWriteable } from './helpers/is-writeable'
import { makeDir } from './helpers/make-dir'
import spawn from 'cross-spawn'

export async function init({
  appPath,
  packageManager,
}: {
  appPath: string
  packageManager: PackageManager
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

  // TODO(Danilowicz): everything is development right now
  await makeDir('.mirrorful')
  const port = 5050 // don't hard code this

  process.chdir(`node_modules/mirrorful/editor`)

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

  spawn.sync('yarn', ['run', 'start', '-p', port.toString()], {
    stdio: 'ignore', // don't print next output (perhaps we want this for errors tho?)
  })
}
