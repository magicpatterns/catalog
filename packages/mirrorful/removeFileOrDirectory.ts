import os from 'os'
import path from 'path'
import { exec } from 'child_process'
import { argv } from 'process'
import { fileURLToPath } from 'url'

const windowsCommands: Record<string, string> = {
  '-F': 'del',
  '-D': 'rmdir /S /Q',
}

/**
 * @param option Option can be -D for directory or -F for file
 * @param name Either the name of the file or folder path
 */
function removeFileOrDirectory(option: string, name: string) {
  // replicating functionality of __dirname
  // const __filename = fileURLToPath(import.meta.url)
  // const __dirname = path.dirname(__filename)
  const filePath = path.join(__dirname, name)

  if (os.platform() === 'win32') {
    // Windows command to remove directory
    exec(
      `${windowsCommands[option]} "${filePath}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
      }
    )
  } else {
    // Unix command to remove directory
    exec(`rm -rf "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
    })
  }
}

removeFileOrDirectory(argv[2], argv[3])
