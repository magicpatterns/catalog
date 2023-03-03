import chalk from 'chalk'
import path from 'path'
import { PackageManager } from './helpers/get-pkg-manager'
import { isWriteable } from './helpers/is-writeable'
import { makeDir } from './helpers/make-dir'
import spawn from 'cross-spawn'
import fs from 'fs'
const { getInstalledPath } = require('get-installed-path')

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

  // // HACK: if a src file exists, plop it in src/mirrorful
  // try {
  //   await fs.promises.access(`./src`, fs.constants.F_OK)
  //   await makeDir('./src/mirrorful')
  // } catch (e) {
  //   if (verbose) {
  //     console.log('No src file found: ', e)
  //   }
  await makeDir('.mirrorful')
  //}

  const port = 5050 // don't hard code this

  if (verbose) {
    console.log('Current directory:', process.cwd())
  }

  let isUsingNextJs = false
  if (process.env.NODE_ENV === 'development') {
    // just run the editor in its own directory
    process.chdir(`editor`)
  } else {
    const absolutePathToMirrorfulIndexJS = await getInstalledPath('mirrorful')
    if (verbose) {
      console.log(
        'Absolute path to mirrorful index.js:',
        absolutePathToMirrorfulIndexJS
      )
    }
    try {
      await fs.promises.access(`next.config.js`, fs.constants.F_OK)
      isUsingNextJs = true
    } catch (e) {
      if (verbose) {
        console.log('Non-mirrorful next.config.js not found: ', e)
      }
      isUsingNextJs = false
    }
    // Change directory to be the editor
    process.chdir(`${absolutePathToMirrorfulIndexJS}/editor`)
    if (verbose) {
      console.log('New working directory:', process.cwd())
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
