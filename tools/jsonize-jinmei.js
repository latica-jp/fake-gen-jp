const fs = require('fs')
const iconv = require('iconv-lite')
const readline = require('readline')
const srcPath = './data-source/JINMEI30.TXT'
const moji = require('moji')

if (!fs.existsSync(srcPath)) {
  console.error('Place JINMEI30.TXT into ./data folder!')
  process.exit(1)
}
const rs = fs.createReadStream(srcPath)
const decoder = iconv.decodeStream('Shift_JIS')

const wsFirstName = fs.createWriteStream('./data/firstName.json')
const wsLastName = fs.createWriteStream('./data/lastName.json')

const rl = readline.createInterface({
  input: decoder,
  output: process.stdout,
  terminal: false,
})

let [ff, fl] = [true, true]
rl.on('line', function(line) {
  if (line.substring(0, 1) === ';') return
  const [nameKana, name, type] = line
    .replace(/\t/, ':')
    .replace(/"/g, '')
    .split(':')
  if (type === '姓') {
    if (!fl) {
      wsLastName.write(',\n')
    } else fl = false
    wsLastName.write(
      `\t\t${JSON.stringify({
        lastName: name,
        lastNameKana: moji(nameKana)
          .convert('HGtoKK')
          .toString(),
      })}`
    )
  } else {
    if (!ff) {
      wsFirstName.write(',\n')
    } else ff = false
    wsFirstName.write(
      `\t\t${JSON.stringify({
        firstName: name,
        firstNameKana: moji(nameKana)
          .convert('HGtoKK')
          .toString(),
      })}`
    )
  }
})

rs.on('end', () => {
  wsFirstName.write('\n')
  wsFirstName.write('\t]\n')
  wsFirstName.write('}\n')

  wsLastName.write('\n')
  wsLastName.write('\t]\n')
  wsLastName.write('}\n')

  console.info('firstName.json and lastName.json generated successfully!')
})

wsFirstName.write('{\n')
wsFirstName.write('\t"data": [\n')

wsLastName.write('{\n')
wsLastName.write('\t"data": [\n')

rs.pipe(decoder)
