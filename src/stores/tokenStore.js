export default function createOfferStore(logger, TokenModel) {
  return {
    async getByIdAndClientId(id, clientId) {
      const token = await TokenModel.findOne({
        where: { token_id: id, client_id: clientId }
      })
      return token
    },

    async getByStripeTokenId(stripeTokenId) {
      const token = await TokenModel.findOne({
        where: { stripe_token_id: stripeTokenId }
      })
      return token
    },

    async create(data) {
      const token = await TokenModel.build(data).save()
      return token
    },

    async update(id, data) {
      const token = await TokenModel.update(data, {
        where: { token_id: id },
        returning: true
      })
      return token
    }
  }
}
