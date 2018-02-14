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

    async getGiftCheckoutAllFromDate(fromDate, endDate) {
      const checkout = await CheckoutModel.findAll({
        where: {
          is_gift: true,
          is_free: false,
          created_at: { gte: fromDate, lte: endDate }
        }
      })
      return checkout
    },

    async create(data) {
      const checkout = await CheckoutModel.build(data).save()
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
