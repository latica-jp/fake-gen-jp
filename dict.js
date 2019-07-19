const addresses = require('./data/address.json')['data']

const randomInt = n => Math.floor(Math.random() * Math.floor(n))

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

module.exports = {
  addresses,
  firstNames: require('./data/firstName.json')['data'],
  lastNames: require('./data/lastName.json')['data'],
}
