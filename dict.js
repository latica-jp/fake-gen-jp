const { randomInt } = require('./utils')
const addresses = require('./data/address.json')['data']
const firstNames = require('./data/firstName.json')['data']
const lastNames = require('./data/lastName.json')['data']
const areaCodes = require('./data/areaCode.json')['data']

const getBuildingName = (street, streetKana) => {
  const arr = ['ハイツ', 'コーポ', 'メゾン', 'ヴィラ', 'ハイム', 'シャトー']
  const suffix = arr[randomInt(arr.length)]
  const room = `${randomInt(9) + 1}${`0${randomInt(20)}`.slice(-2)}`
  return Math.random() > 0.5
    ? [`${suffix}${street}${room}`, `${suffix}${streetKana}${room}`]
    : [`${street}${suffix}${room}`, `${streetKana}${suffix}${room}`]
}

addresses.forEach(addr => {
  const street = addr['street']
  const streetKana = addr['streetKana']
  const chome = `${randomInt(8) + 1}-${randomInt(50) + 1}-${randomInt(20) + 1}`
  addr['street'] += chome
  addr['streetKana'] += chome
  if (Math.random() > 0.3) {
    const [bldg, bldgKana] = getBuildingName(street, streetKana)
    addr['street'] += ` ${bldg}`
    addr['streetKana'] += ` ${bldgKana}`
  }
})

const phoneNumbers = areaCodes.reduce((prev, areaCode) => {
  const len = areaCode.cityCode.length
  const arr = [...Array(20)].map(num => {
    const cityCode = `0000${randomInt(10 ** len - 1)}`.slice(-len)
    const code = `0000${randomInt(10000)}`.slice(-4)
    return `0${areaCode.areaCode}-${cityCode}-${code}`
  })
  return [...prev, ...arr]
}, [])

module.exports = {
  addresses,
  firstNames,
  lastNames,
  phoneNumbers,
}
