import { NotFound, BadRequest } from 'fejl'
import { pick } from 'lodash'

export default class Subscription {
  constructor(subscriptionStore) {
    this.subscriptionStore = subscriptionStore
  }

  async findSubscriptionsForClient(abowebClientId) {
    const subscriptions = abowebClientId ? await this.subscriptionStore.getByAbowebClientId(abowebClientId) : [];
    return { subscriptions: subscriptions || [] }
  }
}
