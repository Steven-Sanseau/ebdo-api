import db from '../config/sequelize'

export default class PaymentService {
  findAll(limit, offset) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Payment.findAll({ limit: limit, offset: offset }))
      } catch (e) {
        reject(e)
      }
    })
  }

  countAll() {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Payment.count({}))
      } catch (e) {
        reject(e)
      }
    })
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Payment.findById(id))
      } catch (e) {
        reject(e)
      }
    })
  }

  create(Payment) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Payment.build(Payment).save())
      } catch (e) {
        reject(e)
      }
    })
  }

  update(id, Payment) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(
          db.Payment.update(Payment, { where: { id: id }, returning: true })
        )
      } catch (e) {
        reject(e)
      }
    })
  }
}
