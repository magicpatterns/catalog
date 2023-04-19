import { execSync } from 'child_process'
import process from 'process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

export function packageLibrary() {
  execSync(`npx vite build --config ${__dirname}/vite-lib.config.js`)

  console.log('Library compiled successfully.')
  // Upload file to S3

  // Run publish
}
