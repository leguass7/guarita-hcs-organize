import { createHash } from 'crypto'
import { parse, isValid, format } from 'date-fns'
import { readdirSync, statSync, readFileSync, existsSync } from 'fs'
import { join, resolve, dirname } from 'path'

import { replaceAll, timeStamp } from './strings'

export interface IReadedIndex {
  id: string
  inDir: string
  dateDir: string
  timeDir: string
  datetime: Date
  line1: string
  line2: string
  files?: string[]
}

const removeChars = "'!@#$%¨&*()_+{}?^><|¹²³£¢¬§ªº°;.,~´`=-"
const hexChars = ['\x00', '\x01', '\x1f', '\x10', '\x22', '\x5c']

export function loadIndexFile(path: string): IReadedIndex[] {
  const toDateTime = (str: string): Date => {
    try {
      return parse(str, 'yy/MM/dd HH:mm:ss', new Date())
    } catch (error) {
      console.warn('ERRO LEITURA DE DATETIME', path)
      return null
    }
  }

  try {
    const lines = readFileSync(path, { encoding: 'utf-8' })
      ?.split(/\r?\n/)
      ?.map(l => {
        return replaceAll(`${l}`.trim(), [...hexChars, ...removeChars.split('')], ' ').trim()
      })
      .filter(f => f && f !== 'FFFFFFFFFFFFFFFFF')

    const results: IReadedIndex[] = []
    for (let i = 0; i < lines.length; i = i + 3) {
      const dateTime = lines[i].split(' ')
      const inDir = dirname(path)
      const dateDir = dateTime[0]?.split('/').join('_') || ''
      const timeDir = dateTime[1]?.split(':').join('_') || ''
      const report = resolve(inDir, dateDir, timeDir)
      if (isDir(report)) {
        const readed: IReadedIndex = {
          id: createHash('md5').update(report).digest('hex'),
          inDir,
          dateDir,
          timeDir,
          datetime: toDateTime(lines[i]),
          line1: lines[i + 1] ? replaceAll(lines[i + 1], [':', '  '], ' ').replace(/\s+/g, ' ') : timeStamp(),
          line2: lines[i + 2] || ''
        }
        results.push(readed)
      }
    }

    return results
  } catch (error) {
    // console.warn('ERRO LEITURA DE ARQUIVO INDEX', path)
    return []
  }
}

export function listFiles(pathDir: string): string[] {
  try {
    if (isDir(pathDir)) {
      const list = readdirSync(pathDir)
      return list
        .map(fileName => {
          const filePath = resolve(pathDir, fileName)
          if (isFile(filePath)) return filePath
          return ''
        })
        .filter(f => !!f)
    }
    return []
  } catch (error) {
    // console.warn('ERRO DE ARQUVOS', pathDir)
    return []
  }
}

export function isDir(path?: string): boolean {
  if (!path) return false
  if (!existsSync(path)) return false
  return !!statSync(path).isDirectory()
}

export function isFile(path?: string): boolean {
  if (!path) return false
  if (!existsSync(path)) return false
  return !!statSync(path).isFile()
}

export function hasIndexFile(dir: string, fileName: string): boolean {
  const testDir = resolve(dir)
  try {
    const list = readdirSync(testDir)
    return list?.map(f => f.toLocaleUpperCase())?.includes(fileName.toLocaleUpperCase())
  } catch (error) {
    console.warn('ERRO EM', testDir)
    return false
  }
}

/**
 * Localiza arquivos index recursivamente
 * @function findIndexiesFiles
 */
export function findIndexiesFiles(dir: string, fileName = 'INDEX.TXT'): string[] {
  const result: string[] = []

  if (hasIndexFile(dir, fileName)) result.push(join(dir, fileName))

  const list = readdirSync(resolve(dir))
  list.forEach(item => {
    const pathFile = resolve(dir, item)
    const stats = statSync(pathFile)
    if (stats && stats.isDirectory()) {
      if (!result.includes(pathFile) && hasIndexFile(pathFile, fileName)) {
        result.push(join(`${pathFile}`, fileName))
      } else {
        const findHere = findIndexiesFiles(pathFile, fileName)
        if (findHere && findHere.length) {
          findHere.forEach(f => {
            if (!result.includes(f)) result.push(f)
          })
        }
      }
    }
  })
  return result
}

export interface ITaskCopy {
  id: string
  company: string
  from: string
  outDir: string
  copied?: boolean
}

export function builderTasks(list: IReadedIndex[]): ITaskCopy[] {
  const results: ITaskCopy[] = []

  list.forEach(item => {
    const validDate = !!isValid(item.datetime)
    const pathDir = join(item.inDir, item.dateDir, item.timeDir)

    const outDir = validDate
      ? join(item.line1, format(item.datetime, 'yyyy-MM-dd HH_mm_ss'))
      : join(item.line1, `${item.dateDir} ${item.timeDir}`)

    if (existsSync(pathDir)) {
      results.push({
        id: item.id,
        company: item.line1,
        from: pathDir,
        outDir
      })
    }
  })

  return results
}
