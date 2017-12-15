export default function createAdressStore(logger, AdressModel) {
  return {
    async getById(id) {
      const adress = await AdressModel.findById(id)
      return adress
    },

    async create(data) {
      const adress = await AdressModel.build(data).save()
      return adress
    },

    async update(email, data) {
      const adress = await AdressModel.update(data, {
        where: { email: email },
        returning: true
      })
      return adress
    }
  }
}
