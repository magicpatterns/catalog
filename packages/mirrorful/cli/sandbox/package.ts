import { execSync } from 'child_process'
import process from 'process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { createLibrary } from '../api'

export function packageLibrary() {
  execSync(`npx vite build --config ${__dirname}/vite-lib.config.js`)

  console.log('Library compiled successfully.')
  // Upload file to S3
  createLibrary()

  // Run publish
}
