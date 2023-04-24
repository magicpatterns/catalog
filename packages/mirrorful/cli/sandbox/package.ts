import { execSync } from 'child_process'

import fs from 'fs'
import chalk from 'chalk'
import { createLibrary } from '../api'
import dts from 'dts-bundle'

const logProgress = (message: string) => {
  console.log(chalk.cyan(message))
}

export async function packageLibrary() {
  logProgress('Compiling library...')
  execSync(`npx vite build --config ${__dirname}/vite-lib.config.js`, {
    stdio: 'inherit',
  })

  logProgress('Forming dist...')
  // Create final dist folder
  fs.mkdirSync(`${__dirname}/dist`, { recursive: true })
  fs.cpSync(
    `${__dirname}/module/library.es.js`,
    `${__dirname}/dist/library.es.js`
  )

  const files = fs
    .readdirSync(`${__dirname}/module/build/_assets`)
    .filter((fileName) => fileName.startsWith('tailwind'))
    .filter((fileName) => fileName.endsWith('.css'))

  fs.cpSync(
    `${__dirname}/module/build/_assets/${files[0]}`,
    `${__dirname}/dist/main.css`
  )

  execSync(
    `npx dts-bundle-generator -o ${__dirname}/dist/all.d.ts ./app/components/primitives/index.ts --external-inlines '@remix-run/react' 'react-router-dom'`,
    { stdio: 'inherit' }
  )

  // fs.rmdirSync(`${__dirname}/module`, { recursive: true })

  logProgress('Forming package.json...')
  // TODO: Generate a package json to put inside of dist

  logProgress('Syncing files...')
  // TODO(Danilowicz): Upload files to S3
  // await createLibrary()

  logProgress('Publishing...')
  logProgress('hello!')
  // TODO: Run npm publish INSIDE OF dist
}
