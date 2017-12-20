export default function createAdressStore(logger, AdressModel) {
  return {
    async getById(id) {
      const address = await AdressModel.findById(id)
      return address
    },

    async create(data) {
      const address = await AdressModel.build(data).save()
      return { address }
    },

    async update(id, data) {
      const address = await AdressModel.update(data, {
        where: { address_id: id },
        returning: true
      })
      return address
    }
  }
}
