import { readdirSync, statSync, copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname, extname } from 'path'

const extList = ['.DPT', '.EVT', '.STP', '.PAR', '.ROT', '.SP1', '.SP2', '.SP3', '.CTB']
export async function copyAllHCSFiles(sourceDir: string, targetDir: string): Promise<any> {
  const list = readdirSync(sourceDir)
  list.forEach(filename => {
    const pathFile = resolve(sourceDir, filename)
    const stats = statSync(pathFile)
    if (stats.isFile() && extList.includes(extname(pathFile).toLocaleUpperCase())) {
      copyFile(pathFile, resolve(targetDir, filename))
    }
  })
}

export function copyFile(source: string, target: string): boolean {
  try {
    const targetDir = dirname(target)
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })
    copyFileSync(source, target, 2)
    return true
  } catch (error) {
    console.warn('ERRO AO COPIAR:', source)
    return false
  }
}
