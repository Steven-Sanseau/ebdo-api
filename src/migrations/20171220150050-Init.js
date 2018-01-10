'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Address" ("address_id"  SERIAL , "last_name" VARCHAR(255), "first_name" VARCHAR(255), "address" VARCHAR(255) NOT NULL, "address_post" VARCHAR(255), "address_pre" VARCHAR(255), "city" VARCHAR(255) NOT NULL, "phone" VARCHAR(255), "postal_code" VARCHAR(255) NOT NULL, "country" VARCHAR(255) NOT NULL, "company" VARCHAR(255), "type_address" VARCHAR(255), "address_equal" BOOLEAN, "aboweb_address_id" VARCHAR(255) UNIQUE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "client_id" INTEGER NOT NULL REFERENCES "Client" ("client_id") ON DELETE NO ACTION ON UPDATE CASCADE, UNIQUE ("aboweb_address_id"), PRIMARY KEY ("address_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Token" ("token_id"  SERIAL , "token_type" VARCHAR(255), "aboweb_id" VARCHAR(255), "stripe_token_id" VARCHAR(255), "stripe_customer_id" VARCHAR(255), "stripe_card_id" VARCHAR(255), "stripe_card_country" VARCHAR(255), "stripe_card_brand" VARCHAR(255), "stripe_card_cvc_check" VARCHAR(255), "stripe_card_exp_month" INTEGER, "stripe_card_exp_year" INTEGER, "stripe_card_last4" VARCHAR(255), "slimpay_rum_id" VARCHAR(255), "slimpay_token_id" VARCHAR(255), "slimpay_bic" VARCHAR(255), "slimpay_iban" VARCHAR(255), "slimpay_rum_code" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "client_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("token_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Offer" ("offer_id"  SERIAL , "name" VARCHAR(255), "aboweb_id" VARCHAR(255), "price_ttc" FLOAT, "monthly_price_ttc" FLOAT, "description" TEXT, "time_limited" BOOLEAN, "duration" INTEGER, "country_shipping" VARCHAR(255), "shipping_cost" FLOAT, "is_gift" BOOLEAN, "is_free" BOOLEAN, "is_free_gift" BOOLEAN, "payment_method" INTEGER, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("offer_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Checkout" ("checkout_id"  SERIAL , "checkout_step" INTEGER, "aboweb_client_id" INTEGER, "aboweb_subscribe_id" INTEGER UNIQUE, "payment_method" INTEGER, "is_gift" BOOLEAN, "status" VARCHAR(255), "cgv_accepted" BOOLEAN, "source" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "address_id" INTEGER REFERENCES "Address" ("address_id") ON DELETE SET NULL ON UPDATE CASCADE, "client_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "godson_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "token_id" INTEGER REFERENCES "Token" ("token_id") ON DELETE SET NULL ON UPDATE CASCADE, "invoice_address_id" INTEGER REFERENCES "Address" ("address_id") ON DELETE SET NULL ON UPDATE CASCADE, "delivery_address_id" INTEGER REFERENCES "Address" ("address_id") ON DELETE SET NULL ON UPDATE CASCADE, "offer_id" INTEGER REFERENCES "Offer" ("offer_id") ON DELETE SET NULL ON UPDATE CASCADE, UNIQUE ("aboweb_subscribe_id"), PRIMARY KEY ("checkout_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Cron" ("cron_id"  SERIAL , "type" VARCHAR(255), "data" JSON, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("cron_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Newsletter" ("email" VARCHAR(255) NOT NULL , "name" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("email"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Voucher" ("voucher_id"  SERIAL , "aboweb_id" INTEGER, "voucher" VARCHAR(255) NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE, "end_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("voucher_id"));`
    )

    return queryInterface
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users`);
    */
  }
}
