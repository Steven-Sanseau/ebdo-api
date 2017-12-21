export default function createOfferStore(logger, TokenModel) {
  return {
    async create(data) {
      const token = await TokenModel.build(data).save()
      return token
    }
  }
}
