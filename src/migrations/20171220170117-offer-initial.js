'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Offer', [
      {
        // NUM GRATUIT 0€
        name: 'abo-duree-determinee-0-euro-france-gratuit',
        aboweb_id: 'F-EB-GRABW-000-1-DD',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description: 'Offre essaie envoi 1 numéro gratuit en france',
        time_limited: true,
        duration: 1,
        shipping_cost: 0,
        is_gift: false,
        is_free: true,
        is_free_gift: true,
        country_shipping: 'FR',
        payment_method: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // ADL 5€
        name: 'abo-duree-libre-5-euro-france-cb',
        aboweb_id: 'F-EB-500-4-DL-CB',
        price_ttc: 500,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-5-euro-france-sepa',
        aboweb_id: 'F-EB-500-4-DL-P',
        price_ttc: 500,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      // ADL 5€ Pays etranger
      {
        name: 'abo-duree-libre-5-euro-belgique-sepa',
        aboweb_id: 'F-EB-ETR1-900-4-DL-P',
        price_ttc: 900,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-5-euro-suisse-sepa',
        aboweb_id: 'F-EB-ETR1-900-4-DL-P',
        price_ttc: 500,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-5-euro-luxembourg-sepa',
        aboweb_id: 'F-EB-ETR1-900-4-DL-P',
        price_ttc: 500,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-5-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-900-4-DL-CB',
        price_ttc: 900,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-5-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-900-4-DL-CB',
        price_ttc: 900,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-5-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-900-4-DL-CB',
        price_ttc: 900,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADL 10€
      {
        name: 'abo-duree-libre-10-euro-france-cb',
        aboweb_id: 'F-EB-1000-4-DL-CB',
        price_ttc: 1000,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-10-euro-france-sepa',
        aboweb_id: 'F-EB-1000-4-DL-P',
        price_ttc: 1000,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADL 10€ Pays etranger
      {
        name: 'abo-duree-libre-10-euro-belgique-sepa',
        aboweb_id: 'F-EB-ETR1-1400-4-DL-P',
        price_ttc: 1400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-10-euro-suisse-sepa',
        aboweb_id: 'F-EB-ETR1-1400-4-DL-P',
        price_ttc: 1400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-10-euro-luxembourg-sepa',
        aboweb_id: 'F-EB-ETR1-1400-4-DL-P',
        price_ttc: 1400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-10-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-1400-4-DL-CB',
        price_ttc: 1400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-10-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-1400-4-DL-CB',
        price_ttc: 1400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-10-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-1400-4-DL-CB',
        price_ttc: 1400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADL 15€
      {
        name: 'abo-duree-libre-15-euro-france-cb',
        aboweb_id: 'F-EB-1500-4-DL-CB',
        price_ttc: 1500,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-15-euro-france-sepa',
        aboweb_id: 'F-EB-1500-4-DL-P',
        price_ttc: 1500,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADL 15€ Pays etranger
      {
        name: 'abo-duree-libre-15-euro-belgique-sepa',
        aboweb_id: 'F-EB-ETR1-1900-4-DL-P',
        price_ttc: 1900,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-15-euro-suisse-sepa',
        aboweb_id: 'F-EB-ETR1-1900-4-DL-P',
        price_ttc: 1900,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-15-euro-luxembourg-sepa',
        aboweb_id: 'F-EB-ETR1-1900-4-DL-P',
        price_ttc: 1900,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-15-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-1900-4-DL-CB',
        price_ttc: 1900,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-15-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-1900-4-DL-CB',
        price_ttc: 1900,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-15-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-1900-4-DL-CB',
        price_ttc: 1900,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADL 20€
      {
        name: 'abo-duree-libre-20-euro-france-cb',
        aboweb_id: 'F-EB-2000-4-DL-CB',
        price_ttc: 2000,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-20-euro-france-sepa',
        aboweb_id: 'F-EB-2000-4-DL-P',
        price_ttc: 2000,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison en france',
        time_limited: false,
        duration: 0,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADL 20€ Pays etranger
      {
        name: 'abo-duree-libre-20-euro-belgique-sepa',
        aboweb_id: 'F-EB-ETR1-2400-4-DL-P',
        price_ttc: 2400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-20-euro-suisse-sepa',
        aboweb_id: 'F-EB-ETR1-2400-4-DL-P',
        price_ttc: 2400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-20-euro-luxembourg-sepa',
        aboweb_id: 'F-EB-ETR1-2400-4-DL-P',
        price_ttc: 2400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-20-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-2400-4-DL-CB',
        price_ttc: 2400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison en belgique',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-20-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-2400-4-DL-CB',
        price_ttc: 2400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison en suisse',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-libre-24-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-2400-4-DL-CB',
        price_ttc: 2400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison au luxembourg',
        time_limited: false,
        duration: 0,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 5€
      {
        name: 'abo-duree-determinee-3-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-1500-12-DD-0',
        price_ttc: 1500,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 5€ Pays etranger
      {
        name: 'abo-duree-determinee-3-mois-5-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-2700-12-DD-0',
        price_ttc: 2700,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-5-euro-suisse-cb',
        aboweb_id: 'F-EB-2700-12-DD-0',
        price_ttc: 2700,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-5-euro-luxembourg-cb',
        aboweb_id: 'F-EB-2700-12-DD-0',
        price_ttc: 2700,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 10€
      {
        name: 'abo-duree-determinee-3-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-3000-12-DD-0',
        price_ttc: 3000,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 10€ Pays etranger
      {
        name: 'abo-duree-determinee-3-mois-10-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-4200-12-DD-0',
        price_ttc: 4200,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-10-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-4200-12-DD-0',
        price_ttc: 4200,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-10-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-4200-12-DD-0',
        price_ttc: 4200,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 15€
      {
        name: 'abo-duree-determinee-3-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-4500-12-DD-0',
        price_ttc: 4500,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 15€ Pays etranger
      {
        name: 'abo-duree-determinee-3-mois-15-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-5700-12-DD-0',
        price_ttc: 5700,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-15-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-5700-12-DD-0',
        price_ttc: 5700,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-15-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-5700-12-DD-0',
        price_ttc: 5700,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 20€
      {
        name: 'abo-duree-determinee-3-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-6000-12-DD-0',
        price_ttc: 6000,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 3MOIS 20€ Pays etranger
      {
        name: 'abo-duree-determinee-3-mois-20-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-7200-12-DD-0',
        price_ttc: 7200,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-20-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-7200-12-DD-0',
        price_ttc: 7200,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-3-mois-20-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-7200-12-DD-0',
        price_ttc: 7200,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 12,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 5€
      {
        name: 'abo-duree-determinee-6-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-3000-24-DD-0',
        price_ttc: 3000,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 5€ Pays etranger
      {
        name: 'abo-duree-determinee-6-mois-5-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-5400-24-DD-0',
        price_ttc: 5400,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-5-euro-suisse-cb',
        aboweb_id: 'F-EB-5400-24-DD-0',
        price_ttc: 5400,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-5-euro-luxembourg-cb',
        aboweb_id: 'F-EB-5400-24-DD-0',
        price_ttc: 5400,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 10€
      {
        name: 'abo-duree-determinee-6-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-6000-24-DD-0',
        price_ttc: 6000,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 10€ Pays etranger
      {
        name: 'abo-duree-determinee-6-mois-10-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-8400-24-DD-0',
        price_ttc: 8400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-10-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-8400-24-DD-0',
        price_ttc: 8400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-10-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-8400-24-DD-0',
        price_ttc: 8400,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 15€
      {
        name: 'abo-duree-determinee-6-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-9000-24-DD-0',
        price_ttc: 9000,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 15€ Pays etranger
      {
        name: 'abo-duree-determinee-6-mois-15-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-11400-24-DD-0',
        price_ttc: 11400,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-15-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-11400-24-DD-0',
        price_ttc: 11400,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-15-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-11400-24-DD-0',
        price_ttc: 11400,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 20€
      {
        name: 'abo-duree-determinee-6-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-12000-24-DD-0',
        price_ttc: 12000,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 6MOIS 20€ Pays etranger
      {
        name: 'abo-duree-determinee-6-mois-20-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-14400-24-DD-0',
        price_ttc: 14400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-20-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-14400-24-DD-0',
        price_ttc: 14400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-6-mois-20-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-14400-24-DD-0',
        price_ttc: 14400,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 24,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 5€
      {
        name: 'abo-duree-determinee-12-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-24000-48-DD-0',
        price_ttc: 24000,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 5€ Pays etranger
      {
        name: 'abo-duree-determinee-12-mois-5-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-10800-48-DD-0',
        price_ttc: 10800,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-5-euro-suisse-cb',
        aboweb_id: 'F-EB-10800-48-DD-0',
        price_ttc: 10800,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-5-euro-luxembourg-cb',
        aboweb_id: 'F-EB-10800-48-DD-0',
        price_ttc: 10800,
        monthly_price_ttc: 5,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 10€
      {
        name: 'abo-duree-determinee-12-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-24000-48-DD-0',
        price_ttc: 24000,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 10€ Pays etranger
      {
        name: 'abo-duree-determinee-12-mois-10-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-16800-48-DD-0',
        price_ttc: 16800,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-10-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-16800-48-DD-0',
        price_ttc: 16800,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-10-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-16800-48-DD-0',
        price_ttc: 16800,
        monthly_price_ttc: 10,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 15€
      {
        name: 'abo-duree-determinee-12-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-18000-48-DD-0',
        price_ttc: 18000,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 15€ Pays etranger
      {
        name: 'abo-duree-determinee-12-mois-15-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-22800-48-DD-0',
        price_ttc: 22800,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-15-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-22800-48-DD-0',
        price_ttc: 22800,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-15-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-22800-48-DD-0',
        price_ttc: 22800,
        monthly_price_ttc: 15,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 20€
      {
        name: 'abo-duree-determinee-12-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-24000-48-DD-0',
        price_ttc: 24000,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD 12MOIS 20€ Pays etranger
      {
        name: 'abo-duree-determinee-12-mois-20-euro-belgique-cb',
        aboweb_id: 'F-EB-ETR1-28800-48-DD-0',
        price_ttc: 28800,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en belgique',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'BE',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-20-euro-suisse-cb',
        aboweb_id: 'F-EB-ETR1-28800-48-DD-0',
        price_ttc: 28800,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en suisse',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'CH',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'abo-duree-determinee-12-mois-20-euro-luxembourg-cb',
        aboweb_id: 'F-EB-ETR1-28800-48-DD-0',
        price_ttc: 28800,
        monthly_price_ttc: 20,
        description:
          'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison au luxembourg',
        time_limited: true,
        duration: 48,
        shipping_cost: 1,
        is_gift: false,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'LU',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 3MOIS 5€
      {
        name: 'abo-duree-determinee-offre-parrain-3-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-PAR-1500-12-DD-0',
        price_ttc: 1500,
        monthly_price_ttc: 5,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // ADD PARRAIN OFFRE 3MOIS 10€
      {
        name: 'abo-duree-determinee-offre-parrain-3-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-PAR-3000-12-DD-0',
        price_ttc: 3000,
        monthly_price_ttc: 10,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // ADD PARRAIN OFFRE 3MOIS 15€
      {
        name: 'abo-duree-determinee-offre-parrain-3-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-PAR-4500-12-DD-0',
        price_ttc: 4500,
        monthly_price_ttc: 15,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // ADD PARRAIN OFFRE 3MOIS 20€
      {
        name: 'abo-duree-determinee-offre-parrain-3-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-PAR-6000-12-DD-0',
        price_ttc: 6000,
        monthly_price_ttc: 20,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 6MOIS 5€
      {
        name: 'abo-duree-determinee-offre-parrain-6-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-PAR-3000-24-DD-0',
        price_ttc: 3000,
        monthly_price_ttc: 5,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 6MOIS 10€
      {
        name: 'abo-duree-determinee-offre-parrain-6-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-PAR-6000-24-DD-0',
        price_ttc: 6000,
        monthly_price_ttc: 10,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 6MOIS 15€
      {
        name: 'abo-duree-determinee-offre-parrain-6-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-PAR-9000-24-DD-0',
        price_ttc: 9000,
        monthly_price_ttc: 15,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 6MOIS 20€
      {
        name: 'abo-duree-determinee-offre-parrain-6-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-PAR-12000-24-DD-0',
        price_ttc: 12000,
        monthly_price_ttc: 20,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 12MOIS 5€
      {
        name: 'abo-duree-determinee-offre-parrain-12-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-PAR-24000-48-DD-0',
        price_ttc: 24000,
        monthly_price_ttc: 5,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 12MOIS 10€
      {
        name: 'abo-duree-determinee-offre-parrain-12-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-PAR-24000-48-DD-0',
        price_ttc: 24000,
        monthly_price_ttc: 10,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 12MOIS 15€
      {
        name: 'abo-duree-determinee-offre-parrain-12-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-PAR-18000-48-DD-0',
        price_ttc: 18000,
        monthly_price_ttc: 15,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD PARRAIN OFFRE 12MOIS 20€
      {
        name: 'abo-duree-determinee-offre-parrain-12-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-PAR-24000-48-DD-0',
        price_ttc: 24000,
        monthly_price_ttc: 20,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: false,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 3MOIS 5€
      {
        name: 'abo-duree-determinee-offre-filleul-3-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-FIL-1500-12-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // ADD FILLEUL OFFRE 3MOIS 10€
      {
        name: 'abo-duree-determinee-offre-filleul-3-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-FIL-3000-12-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // ADD FILLEUL OFFRE 3MOIS 15€
      {
        name: 'abo-duree-determinee-offre-filleul-3-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-FIL-4500-12-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // ADD FILLEUL OFFRE 3MOIS 20€
      {
        name: 'abo-duree-determinee-offre-filleul-3-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-FIL-6000-12-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 12,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 6MOIS 5€
      {
        name: 'abo-duree-determinee-offre-filleul-6-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-FIL-3000-24-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 6MOIS 10€
      {
        name: 'abo-duree-determinee-offre-filleul-6-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-FIL-6000-24-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 6MOIS 15€
      {
        name: 'abo-duree-determinee-offre-filleul-6-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-FIL-9000-24-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 6MOIS 20€
      {
        name: 'abo-duree-determinee-offre-filleul-6-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-FIL-12000-24-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 24,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 12MOIS 5€
      {
        name: 'abo-duree-determinee-offre-filleul-12-mois-5-euro-france-cb',
        aboweb_id: 'F-EB-FIL-24000-48-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 12MOIS 10€
      {
        name: 'abo-duree-determinee-offre-filleul-12-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-FIL-24000-48-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 12MOIS 15€
      {
        name: 'abo-duree-determinee-offre-filleul-12-mois-15-euro-france-cb',
        aboweb_id: 'F-EB-FIL-18000-48-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ADD FILLEUL OFFRE 12MOIS 20€
      {
        name: 'abo-duree-determinee-offre-filleul-12-mois-20-euro-france-cb',
        aboweb_id: 'F-EB-FIL-24000-48-DD-0',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france',
        time_limited: true,
        duration: 48,
        shipping_cost: 0,
        is_gift: true,
        is_free: true,
        is_free_gift: false,
        country_shipping: 'FR',
        payment_method: 2,
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
