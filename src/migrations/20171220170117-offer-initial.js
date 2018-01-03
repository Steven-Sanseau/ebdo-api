'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Offer', [
      {
        name: 'abo-duree-determinee-3-month-5-euro-france-cb',
        aboweb_id: 'EB-3125-1-DD-0',
        price_ttc: 1500,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel 3 mois, 12 numéro pour 5€ par mois payement par CB, france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-month-5-euro-belgique-cb',
        aboweb_id: 'EB-1500-12-DD-1-BE',
        price_ttc: 3300,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel 3 mois, 12 numéro pour 5€ par mois payement par CB, belgique',
        time_limited: true,
        duration: 12,
        shipping_cost: 1.5,
        is_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'offre-duree-determinee-3-month-5-euro-france-cb',
        aboweb_id: 'EB-1250-12-DD-1-FR',
        price_ttc: 1500,
        monthly_price_ttc: 5,
        description:
          'Offre abonnement, 3 mois, 12 numéro pour 5€ par mois payement par CB, france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'offre-duree-libre-3-month-5-euro-france-cb',
        aboweb_id: 'EB-500-4-DL-1-FR',
        price_ttc: 500,
        monthly_price_ttc: 5,
        description:
          'Offre abonnement, durée libre, 4 numéro /mois pour 5€ par mois payement par CB, france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'offre-duree-libre-3-month-5-euro-france-sepa',
        aboweb_id: 'EB-500-4-DL-0-FR',
        price_ttc: 500,
        monthly_price_ttc: 5,
        description:
          'Offre abonnement, durée libre, 4 numéro /mois pour 5€ par mois payement par SEPA, france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        country_shipping: 'FR',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
