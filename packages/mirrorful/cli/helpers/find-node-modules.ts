import path from 'path'
import fs from 'fs'

export function findNodeModulesMirrorfulPath() {
  // Get the current working directory
  const cwd = process.cwd()

  // Traverse up the directory tree until we find the node_modules directory
  let dir = cwd
  while (dir !== path.parse(dir).root) {
    const nodeModulesDir = path.join(dir, 'node_modules/mirrorful')
    const testNodeModulesDir = path.join(dir, 'node_modules/@mirrorful/test')
    if (fs.existsSync(nodeModulesDir)) {
      return nodeModulesDir
    }
    if (fs.existsSync(testNodeModulesDir)) {
      return testNodeModulesDir
    }
    dir = path.dirname(dir)
  }

  // If we reached the root directory without finding node_modules, throw an error
  if (dir === path.parse(dir).root) {
    throw Error(
      `Could not find node_modules directory in: ${cwd} or its parent directories`
    )
  }
}
