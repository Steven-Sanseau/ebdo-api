export default function createNewsletterStore(logger, NewsletterModel) {
  return {
    async getByEmail(email) {
      const newsletter = await NewsletterModel.findOne({
        where: { email: email }
      })
      return newsletter
    },

    async create(data) {
      const newsletter = await NewsletterModel.build(data).save()
      return { newsletter }
    },

    async update(email, data) {
      const newsletter = await NewsletterModel.update(data, {
        where: { email: email },
        returning: true
      })
      return newsletter
    }
  }
}
