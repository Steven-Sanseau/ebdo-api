export default function createSponsorStore(logger, SponsorModel) {
  return {
    async getByEmail(email) {
      const sponsor = await SponsorModel.findOne({
        where: { email: email }
      })
      return sponsor
    },

    async create(data) {
      const sponsor = await SponsorModel.build(data).save()
      return sponsor
    },

    async update(email, data) {
      const sponsor = await SponsorModel.update(data, {
        where: { email: email },
        returning: true
      })
      return sponsor
    }
  }
}
