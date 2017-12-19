export default function createOfferStore(logger, OfferModel) {
  return {
    async getAll() {
      const offers = await OfferModel.findAndCountAll({})
      return { data: offers.rows, count: offers.count }
    },

    async getByEmail(email) {
      const offer = await OfferModel.findOne({
        where: { email: email }
      })
      return offer
    },

    async create(data) {
      const offer = await OfferModel.build(data).save()
      return offer
    },

    async update(email, data) {
      const offer = await OfferModel.update(data, {
        where: { email: email },
        returning: true
      })
      return offer
    }
  }
}
