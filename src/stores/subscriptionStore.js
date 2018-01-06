export default function createSubscriptionStore(logger, SubscriptionModel) {
  return {
    async getByAbowebClientId(clientId) {
      return SubscriptionModel.findAll({
        where: { aboweb_client_id: clientId }
      })
    },
  }
}
