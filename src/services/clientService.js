import db from '../config/sequelize'

export default class ClassService {
  findAll() {
    return new Promise((resolve, reject) => {
      return resolve(db.Client.findAll({}))
    })
  }
}
