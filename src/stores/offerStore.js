export default function createOfferStore(logger, OfferModel) {
  return {
    async getOfferFromParams(params) {
      const offer = await OfferModel.findOne({ where: params })
      console.log(offer)
      return offer
    },

    async getById(id) {
      const offer = await OfferModel.findOne({
        where: { offer_id: id }
      })
      return offer
    },

    async create(data) {
      const offer = await OfferModel.build(data).save()
      return offer
    },

    async update(id, data) {
      const offer = await OfferModel.update(data, {
        where: { offer_id: id },
        returning: true
      })
      return offer
    }
  }
}
