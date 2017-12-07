export default function createAdressStore(logger, AdressModel) {
  return {
    async getByEmail(email) {
      const adress = await AdressModel.findOne({
        where: { email: email }
      })
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
