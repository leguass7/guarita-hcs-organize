import { existsSync, mkdirSync, copyFile, readdirSync, statSync } from 'fs'
import { dirname, resolve as resolvePath, extname } from 'path'

export async function copyFileAsync(source: string, target: string): Promise<boolean> {
  try {
    const targetDir = dirname(target)
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })
    return new Promise(resolve => {
      copyFile(source, target, 2, error => {
        resolve(!error)
      })
    })
  } catch (error) {
    return !error
  }
}

const extList = ['.DPT', '.EVT', '.STP', '.PAR', '.ROT', '.SP1', '.SP2', '.SP3', '.CTB']
export async function copyAllHCSFilesAsync(sourceDir: string, targetDir: string): Promise<boolean[]> {
  const list = readdirSync(sourceDir)
  const copied = await Promise.all(
    list.map(async filename => {
      const pathFile = resolvePath(sourceDir, filename)
      const stats = statSync(pathFile)
      if (stats.isFile() && extList.includes(extname(pathFile).toLocaleUpperCase())) {
        return copyFileAsync(pathFile, resolvePath(targetDir, filename))
      }
      return false
    })
  )
  return copied.filter(f => !!f)
}
