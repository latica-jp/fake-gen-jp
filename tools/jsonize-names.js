const fs = require('fs')
const csv = require('fast-csv')

const ConvertCsvToJson = async (srcPath, destPath, headers) => {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(srcPath)
    const ws = fs.createWriteStream(destPath)
    ws.write('{\n')
    ws.write('\t"data": [\n')
    const ps = csv.parse({ headers })
    let isFirst = true
    ps.on('data', row => {
      if (!isFirst) ws.write(',\n')
      else isFirst = false
      ws.write(`\t\t${JSON.stringify(row)}`)
    })
    ps.on('error', error => reject(error))
    ps.on('end', () => {
      ws.write('\n')
      ws.write('\t]\n')
      ws.write('}\n')
      resolve()
    })
    rs.pipe(ps)
  })
}

;(async () => {
  await ConvertCsvToJson(
    './data-source/firstName.csv',
    './data/firstName.json',
    ['firstName', 'firstNameKana', 'gender']
  )
  await ConvertCsvToJson('./data-source/lastName.csv', './data/lastName.json', [
    'lastName',
    'lastNameKana',
  ])
})()
