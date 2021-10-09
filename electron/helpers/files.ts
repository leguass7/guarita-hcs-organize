import { parse, isValid, format } from 'date-fns'
import { readdirSync, statSync, readFileSync, existsSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { v4 as uuidV4 } from 'uuid'

import { replaceAll, timeStamp } from './strings'

export interface IReadedIndex {
  id: string
  inDir: string
  dateDir: string
  timeDir: string
  datetime: Date
  line1: string
  line2: string
}

const removeChars = "'@#$%¨&*()_+{}?^><|¹²³£¢¬§ªº°;.,~´`=-"

export function loadIndexFile(path: string): IReadedIndex[] {
  try {
    const lines = readFileSync(path, { encoding: 'utf-8' })
      ?.split(/\r?\n/)
      ?.map(l => {
        return replaceAll(`${l}`.trim(), ['\x00', ...removeChars.split('')])
      })
      .filter(f => f && f !== 'FFFFFFFFFFFFFFFFF')

    const results: IReadedIndex[] = []
    for (let i = 0; i < lines.length; i = i + 3) {
      const dateTime = lines[i].split(' ')
      const dateDir = dateTime[0].split('/').join('_')
      const timeDir = dateTime[1].split(':').join('_')
      results.push({
        id: uuidV4(),
        inDir: dirname(path),
        dateDir,
        timeDir,
        datetime: parse(lines[i], 'yy/MM/dd HH:mm:ss', new Date()),
        line1: lines[i + 1] || timeStamp(),
        line2: lines[i + 2] || ''
      })
    }

    return results
  } catch (error) {
    console.warn('ERRo LEITURA DE ARQUIVO', path)
    return []
  }
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
