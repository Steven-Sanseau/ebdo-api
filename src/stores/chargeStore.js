export default function createChargeStore(ChargeModel) {
  return {
    async getById(id) {
      const charge = await ChargeModel.findOne({
        where: { charge_id: id }
      })
      return charge
    },

    async create(data) {
      const charge = await ChargeModel.build(data).save()
      return charge
    },

    async update(id, data) {
      const charge = await ChargeModel.update(data, {
        where: { charge_id: id },
        returning: true
      })
      return charge
    }
  }
}
