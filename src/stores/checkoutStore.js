export default function createCheckoutStore(CheckoutModel) {
  return {
    async getCheckoutFromParams(params) {
      const checkout = await CheckoutModel.findOne({ where: params })
      return checkout
    },

    async getById(id) {
      const checkout = await CheckoutModel.findOne({
        where: { checkout_id: id }
      })
      return checkout
    },

    async create(data) {
      const checkout = await CheckoutModel.build(data).save()
      return checkout
    },

    async build(data) {
      const checkout = await CheckoutModel.build(data)
      return checkout
    },

    async update(id, data) {
      const checkout = await CheckoutModel.update(data, {
        where: { checkout_id: id },
        returning: true
      })
      return checkout
    }
  }
}
