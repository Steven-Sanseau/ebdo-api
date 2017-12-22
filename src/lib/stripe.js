import { env } from './env'
import stripe from 'stripe'

const stripeProvider = stripe(env.STRIPE_SECRET_API_KEY)
export default stripeProvider
