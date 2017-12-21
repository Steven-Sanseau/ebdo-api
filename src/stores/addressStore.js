export default function createAddressStore(logger, AddressModel) {
  return {
    async getById(id) {
      const address = await AddressModel.findById(id)
      return address
    },

    async create(data) {
      const address = await AddressModel.build(data).save()
      return { address }
    },

    async update(id, data) {
      const address = await AddressModel.update(data, {
        where: { address_id: id },
        returning: true
      })
      return address
    }
  }
}