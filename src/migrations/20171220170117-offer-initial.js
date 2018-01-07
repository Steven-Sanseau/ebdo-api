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
        description: 'Offre essai envoi 1 numéro gratuit une fois',
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
        price_ttc: 500,
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
        price_ttc: 500,
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
        price_ttc: 500,
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

      // ADD 5€
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

      // ADD 5€ Pays etranger
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

      // ADD 10€
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

      // ADD 10€ Pays etranger
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
      {
        // NUM GRATUIT 0€
        name: 'abo-duree-determinee-0-euro-france-gratuit',
        aboweb_id: 'F-EB-GRABW-000-1-DD',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description: 'Offre essai envoi 1 numéro gratuit une fois',
        time_limited: true,
        duration: 1,
        shipping_cost: 0,
        is_gift: false,
        is_free: true,
        is_free_gift: true,
        country_shipping: 'FR',
        payment_method: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // J'offre  3 mois 10€ / mois
      {
        name: 'abo-duree-determinee-offre-parrain-3-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-3000-12-DD-0-PAR',
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

      // JE reçois 3 mois 10€ / mois
      {
        name: 'abo-duree-determinee-offre-parrain-3-mois-10-euro-france-cb',
        aboweb_id: 'F-EB-0000-12-DD-0-GRA-PARR',
        price_ttc: 0,
        monthly_price_ttc: 0,
        description:
          'Abonnement gratuit offert par un parrain à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par Code parrain, livraison en france',
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
      }
      // {
      //   name: 'abo-duree-determinee-3-month-5-euro-belgique-cb',
      //   aboweb_id: 'EB-1500-12-DD-1-BE',
      //   price_ttc: 3300,
      //   monthly_price_ttc: 5,
      //   description:
      //     'Abonnement personnel 3 mois, 12 numéro pour 5€ par mois payement par CB, belgique',
      //   time_limited: true,
      //   duration: 12,
      //   shipping_cost: 1.5,
      //   is_gift: false,
      //   country_shipping: 'BE',
      //   payment_method: 2,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: 'offre-duree-determinee-3-month-5-euro-france-cb',
      //   aboweb_id: 'EB-1250-12-DD-1-FR',
      //   price_ttc: 1500,
      //   monthly_price_ttc: 5,
      //   description:
      //     'Offre abonnement, 3 mois, 12 numéro pour 5€ par mois payement par CB, france',
      //   time_limited: true,
      //   duration: 12,
      //   shipping_cost: 0,
      //   is_gift: true,
      //   country_shipping: 'FR',
      //   payment_method: 2,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: 'offre-duree-libre-3-month-5-euro-france-cb',
      //   aboweb_id: 'EB-500-4-DL-1-FR',
      //   price_ttc: 500,
      //   monthly_price_ttc: 5,
      //   description:
      //     'Offre abonnement, durée libre, 4 numéro /mois pour 5€ par mois payement par CB, france',
      //   time_limited: false,
      //   duration: 0,
      //   shipping_cost: 0,
      //   is_gift: false,
      //   country_shipping: 'FR',
      //   payment_method: 2,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: 'offre-duree-libre-3-month-5-euro-france-sepa',
      //   aboweb_id: 'EB-500-4-DL-0-FR',
      //   price_ttc: 500,
      //   monthly_price_ttc: 5,
      //   description:
      //     'Offre abonnement, durée libre, 4 numéro /mois pour 5€ par mois payement par SEPA, france',
      //   time_limited: false,
      //   duration: 0,
      //   shipping_cost: 0,
      //   is_gift: false,
      //   country_shipping: 'FR',
      //   payment_method: 1,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // }
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
