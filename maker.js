const { randomInt, toLowerCaseHebon } = require('./utils')
const dict = require('./dict')

module.exports = class Maker {
  constructor(options) {
    this.options = options
    this.dict = dict
    this.reset()
  }

  shuffleDict() {
    this.shuffle(this.dict.addresses)
    this.shuffle(this.dict.firstNames)
    this.shuffle(this.dict.lastNames)
    this.shuffle(this.dict.phoneNumbers)
  }

  incIndex(dictName) {
    if (this.index[dictName] === undefined) {
      this.index[dictName] = 0
    } else this.index[dictName] += 1
    if (this.index[dictName] > this.dict[dictName].length)
      throw new Error(`Data limit exceeded on ${dictName}. Need reset()`)
  }

  reset() {
    this.shuffleDict()
    this.index = {}
  }

  getDict(dictName) {
    this.incIndex(dictName)
    return this.dict[dictName][this.index[dictName]]
  }

  getAddress() {
    return this.getDict('addresses')
  }

  getFirstName() {
    return this.getDict('firstNames')
  }

  getLastName() {
    return this.getDict('lastNames')
  }

  getName(separator = ' ') {
    const firstName = this.getFirstName()
    const lastName = this.getLastName()
    const mailAddress = this.getMailAddress(
      toLowerCaseHebon(firstName.firstNameKana),
      toLowerCaseHebon(lastName.lastNameKana)
    )
    return {
      ...firstName,
      ...lastName,
      fullName: `${lastName.lastName}${separator}${firstName.firstName}`,
      fullNameKana: `${lastName.lastNameKana}${separator}${firstName.firstName}`,
      ...mailAddress,
    }
  }

  getMailAddress(firstName, lastName) {
    const domain = ['gmail.com', 'yahoo.com', 'hotmail.com'][randomInt(3)]
    return {
      mailAddress: `${firstName}${
        ['_', '-', ''][randomInt(3)]
      }${lastName}@${domain}`,
    }
  }

  getPhoneNumber() {
    return this.getDict('phoneNumbers')
  }

  getMobilePhoneNumber() {
    return `0${[7, 8, 9](randomInt(3))}0-`
  }

  shuffle(arr) {
    arr.forEach((_, i) => {
      const rnd = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[rnd]] = [arr[rnd], arr[i]]
    })
  }
}
