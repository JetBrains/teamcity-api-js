import {getRandomInt} from '../../../utils/random'

const RANDOM_DATE_MODIFIER = 1000

export default class BasicError extends Error {
  dateTimeId: number
  message: string
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, BasicError.prototype)
    this.message = message
    this.dateTimeId = Date.now() * RANDOM_DATE_MODIFIER + getRandomInt(0, RANDOM_DATE_MODIFIER - 1)
  }
}
