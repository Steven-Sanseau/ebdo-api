export default function createClientStore(logger, ClientModel) {
  return {
    async count(params) {
      const nbClient = await ClientModel.findAndCountAll({})

      return { count: nbClient.count }
    },

    async getByEmail(email) {
      const client = await ClientModel.findOne({
        where: { email: email }
      })
      return client
    },

    async getByEmailAndCode(email, code) {
      const client = await ClientModel.findOne({
        where: { email, login_code: code }
      })
      return client
    },

    async getById(id) {
      const client = await ClientModel.findOne({
        where: { client_id: id }
      })
      return client
    },

    async create(data) {
      const client = await ClientModel.build(data).save()
      return client
    },

    async update(id, data) {
      const client = await ClientModel.update(data, {
        where: { client_id: id },
        returning: true
      })
      return client
    }
  }
}
