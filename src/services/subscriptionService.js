import { NotFound, BadRequest } from 'fejl'
import { pick } from 'lodash'

export default class Subscription {
  constructor(subscriptionStore) {
    this.subscriptionStore = subscriptionStore
  }

  async findSubscriptionsForClient(abowebClientId) {
    BadRequest.assert(abowebClientId, 'No abowebClientId given')

    const subscriptions = await this.subscriptionStore.getByAbowebClientId(abowebClientId);
    return { subscriptions: subscriptions || [] }
  }
}
