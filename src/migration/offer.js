import db from '../lib/sequelize'

const offer = db.Offer

export default function buildOffers() {
  offer
    .build({
      name: 'periode-3month-5',
      aboweb_id: '3MP5',
      price_ht: 44.6655,
      price_ttc: 15,
      monthly_price_ttc: 15,
      description: 'Abonnement 3 mois, 12 numéro pour 15€ par mois',
      ref: 1,
      time_limited: true,
      duration: 12,
      shipping_cost: 0,
      is_gift: false
    })
    .save()
}
