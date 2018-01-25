export default function createAddressStore(logger, AddressModel) {
  return {
    async getById(id) {
      const address = await AddressModel.findById(id)
      return address
    },

    async getByIdAndClientId(id, clientId) {
      const address = await AddressModel.findOne({
        where: { address_id: id, client_id: clientId }
      })
      return address
    },

    async getByTypeAndClientId(type, clientId) {
      const address = await AddressModel.findOne({
        where: { type_address: type, client_id: clientId }
      })
      return { address }
    },

    async create(data) {
      const address = await AddressModel.build(data).save()
      return address
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
