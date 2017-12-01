import db from '../config/sequelize'

export default class AdressService {
  findAll(limit, offset) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Adress.findAll({ limit: limit, offset: offset }))
      } catch (e) {
        reject(e)
      }
    })
  }

  countAll() {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Adress.count({}))
      } catch (e) {
        reject(e)
      }
    })
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Adress.findById(id))
      } catch (e) {
        reject(e)
      }
    })
  }

  create(adress) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Adress.build(adress).save())
      } catch (e) {
        console.log(reject)
        reject(e)
      }
    })
  }

  update(id, adress) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(
          db.adress.update(adress, { where: { id: id }, returning: true })
        )
      } catch (e) {
        reject(e)
      }
    })
  }
}
