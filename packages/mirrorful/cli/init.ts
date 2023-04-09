import chalk from 'chalk'
import path from 'path'
import { PackageManager } from './helpers/get-pkg-manager'
import { isWriteable } from './helpers/is-writeable'
import { makeDir } from './helpers/make-dir'
import spawn from 'cross-spawn'
import { findNodeModulesMirrorfulPath } from './helpers/find-node-modules'
import fs from 'fs'
import openBrowser from './helpers/openBrowser'
import { addToTailwindConfig } from '../utils/addToTailwindConfig'

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
  // await openBrowser({ url: 'http://localhost', port })
  if (verbose) {
    console.log('Current directory:', process.cwd())
  }

  let isUsingNextJs = false
  if (process.env.NODE_ENV === 'development') {
    // just run the editor in its own directory
    process.chdir(`editor`)
  } else {
    // find where the node_modules folder is
    const nodeModulesPath = await findNodeModulesMirrorfulPath()
    if (nodeModulesPath) {
      try {
        await fs.promises.access(`next.config.js`, fs.constants.F_OK)
        isUsingNextJs = true
      } catch (e) {
        if (verbose) {
          console.log('Non-mirrorful next.config.js not found: ', e)
        }
        isUsingNextJs = false
      }
      process.chdir(`${nodeModulesPath}/editor`)
      if (verbose) {
        console.log('New working directory:', process.cwd())
      }
    }
  }

  let command = 'start'
  if (isUsingNextJs) {
    if (verbose) {
      console.log('NextJS app detected.')
    }
    command = 'next-start' // this is a custom command that uses the .bin/next
  }
  if (process.env.NODE_ENV === 'development') {
    command = 'dev'
  }

  const useYarn = packageManager === 'yarn'
  console.log('Inside your project, you can run:')
  console.log(chalk.cyan(`  ${useYarn ? 'yarn run ' : 'npx '}mirrorful`))
  console.log('to start the visual editor at any time.')
  console.log()

  try {
    const outputMode = verbose ? 'inherit' : 'ignore'
    const output = spawn('yarn', ['run', command, '-p', port.toString()], {
      // if you use pipe, then control + c throws an empty error
      stdio: [outputMode, outputMode, 'inherit'],
    })

    await openBrowser({ url: 'http://localhost', port })
    addToTailwindConfig()
    if (output.stderr) {
      console.log(
        chalk.red(
          'Unexpected error. Please report it as a bug on our repo: https://github.com/Mirrorful/mirrorful'
        ) + '\n'
      )

      console.log()
      console.log(`Stderr: ${output.stderr}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log()
      console.log(`Error: ${error.message}`)
    }
  }
}
