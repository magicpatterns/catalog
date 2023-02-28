import chalk from 'chalk'
import path from 'path'
import { PackageManager } from './helpers/get-pkg-manager'
import { isWriteable } from './helpers/is-writeable'
import { makeDir } from './helpers/make-dir'
import spawn from 'cross-spawn'
import { findNodeModulesPath } from './helpers/find-node-modules'
import fs from 'fs'

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

  try {
    await fs.promises.access('.mirrorful/store.json', fs.constants.F_OK)
    if (verbose) {
      console.log('store.json exists.')
    }
  } catch (error: any) {
    if (error && error.code === 'ENOENT') {
      if (verbose) {
        console.log('store.json does not exist, creating...')
      }
      await fs.promises.writeFile(
        '.mirrorful/store.json',
        JSON.stringify({ colorData: [] })
      )
    } else {
      throw error
    }
  }
  const port = 5050 // don't hard code this

  if (process.env.NODE_ENV === 'development') {
    // just run the editor in its own directory
    process.chdir(`editor`)
  } else {
    // find where the node_modules folder is
    const nodeModulesPath = findNodeModulesPath()
    if (nodeModulesPath) {
      process.chdir(`${nodeModulesPath}/mirrorful/editor`)
    }
  }

  let command = 'start'
  if (process.env.NODE_ENV === 'development') {
    command = 'dev'
  }

  console.log()
  console.log(
    `Visit: ${chalk.cyan(`${`http://localhost:`}${port.toString()}`)}`
  )

  const useYarn = packageManager === 'yarn'
  console.log('Inside your project, you can run:')
  console.log()
  console.log(chalk.cyan(`  ${useYarn ? 'yarn run ' : 'npx '}mirrorful`))
  console.log()
  console.log('to start the visual editor at any time 🚀')
  console.log()

  const outputMode = verbose ? 'inherit' : 'ignore'
  const output = spawn.sync('yarn', ['run', command, '-p', port.toString()], {
    // if you use pipe, then control + c throws an empty error
    stdio: [outputMode, outputMode, 'inherit'],
  })
  if (output.stderr || output.error) {
    console.log(
      chalk.red(
        'Unexpected error. Please report it as a bug on our repo: https://github.com/Mirrorful/mirrorful'
      ) + '\n'
    )
    if (output.stderr) {
      console.log()
      console.log(`Stderr: ${output.stderr}`)
    }
    if (output.error) {
      console.log()
      console.log(`Error: ${output.error}`)
    }
  }
}
