import db from '../config/sequelize'

export default class ClassService {
  findAll() {
    return new Promise((resolve, reject) => {
      return resolve(db.Client.findAll({}))
    })
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      return resolve(db.Client.findById(id))
    })
  }

  create(client) {
    return new Promise((resolve, reject) => {
      client = _.pick(object, ['a', 'c'])
      return resolve(db.Client.create(client))
    })
  }
}
