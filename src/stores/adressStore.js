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

    async update(id, data) {
      const adress = await AdressModel.update(data, {
        where: { adress_id: id },
        returning: true
      })
      return adress
    }
  }
}
