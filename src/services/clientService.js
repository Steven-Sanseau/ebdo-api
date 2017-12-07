import db from '../config/sequelize'

export default class ClientService {
  findAll(limit, offset) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Client.findAll({ limit: limit, offset: offset }))
      } catch (e) {
        reject(e)
      }
    })
  }

  countAll() {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Client.count({}))
      } catch (e) {
        reject(e)
      }
    })
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Client.findById(id))
      } catch (e) {
        reject(e)
      }
    })
  }

  create(client) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Client.build(client).save())
      } catch (e) {
        reject(e)
      }
    })
  }

  update(id, client) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(
          db.Client.update(client, {
            where: { client_id: id },
            returning: true
          })
        )
      } catch (e) {
        reject(e)
      }
    })
  }
}
