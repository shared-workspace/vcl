import { defineCommand } from 'citty'
import { splitByCase } from 'scule'
// import clipboardy from 'clipboardy'
import { args } from '@command-shared'
import { headerLog } from './header'
import { footerLog } from './footer'
import fs from 'fs'
import path from 'path'

/*
 * Read sibling folder entries and create object {Name_Of_File: Return_Value_Of_Default}
 */
async function getEntriesObj(): Promise<Record<string, any>> {
  const entriesDir = path.resolve(__dirname, 'entries');
  const files = fs.readdirSync(entriesDir);
  const entries: Record<string, string> = {};

  for (const file of files) {
    const filePath = path.join(entriesDir, file);
    const fileName = path.parse(file).name;
    const module = await import(filePath);
    entries[fileName] = module.default();
  }

  return entries;
}

/*
 * Convert object {KeyName: 'KeyValue'} to list [['Key Name', 'KeyValue']]
 */
function objToList(infoObj: Record<string, string>) {
  let maxLength = 0
  const infoList = Object.entries(infoObj).map(([key, val]) => {
    const label = splitByCase(key).join(' ')
    if (label.length > maxLength) {
      maxLength = label.length
    }
    return [label, val || '-'] as [string, string]
  })
  return { infoList, maxLength }
}

/*
 * Convert list [['Key Name', 'KeyValue']] to formatted string
 */
function listToStr(infoList: [string, string][], maxLength: number) {
  let infoStr = ''
  for (const [label, value] of infoList) {
    infoStr
      += '- '
      + (label + ': ').padEnd(maxLength + 2)
      + (value.includes('`') ? value : '`' + value + '`')
      + '\n'
  }
  return infoStr
}

export default defineCommand({
  meta: {
    name: 'info',
    description: 'Get information about nuxt project',
  },
  args,
  async run(ctx) {
    headerLog(ctx)
    const infoObj = await getEntriesObj()
    const { infoList, maxLength } = objToList(infoObj)
    const infoStr = listToStr(infoList, maxLength)
    // const copied = await clipboardy    
    //   .write(infoStr)
    //   .then(() => true)
    //   .catch(() => false)
    console.log(`\n---------Project-Info---------\n${infoStr}------------------------------\n`)
    footerLog()
  },
})