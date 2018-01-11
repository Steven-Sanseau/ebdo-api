'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
CREATE TABLE "Address" (
    address_id integer NOT NULL,
    last_name character varying(255),
    first_name character varying(255),
    address character varying(255) NOT NULL,
    address_post character varying(255),
    address_pre character varying(255),
    city character varying(255) NOT NULL,
    phone character varying(255),
    postal_code character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    company character varying(255),
    type_address character varying(255),
    address_equal boolean,
    aboweb_address_id character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    client_id integer NOT NULL
);

CREATE SEQUENCE "Address_address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Address_address_id_seq" OWNED BY "Address".address_id;

CREATE TABLE "Charge" (
    charge_id integer NOT NULL,
    stripe_charge_return json,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    checkout_id integer,
    token_id integer,
    client_id integer
);

CREATE SEQUENCE "Charge_charge_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "Charge_charge_id_seq" OWNED BY "Charge".charge_id;

CREATE TABLE "Checkout" (
    checkout_id integer NOT NULL,
    checkout_step integer,
    aboweb_client_id integer,
    aboweb_subscribe_id integer,
    payment_method integer,
    is_gift boolean,
    status character varying(255),
    cgv_accepted boolean,
    source character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    client_id integer,
    token_id integer,
    invoice_address_id integer,
    delivery_address_id integer,
    offer_id integer
);

CREATE SEQUENCE "Checkout_checkout_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Checkout_checkout_id_seq" OWNED BY "Checkout".checkout_id;

CREATE TABLE "Client" (
    client_id integer NOT NULL,
    aboweb_client_id integer,
    email character varying(255) NOT NULL,
    type_client integer,
    first_name character varying(255),
    last_name character varying(255),
    login_code integer,
    login_code_created_at timestamp with time zone,
    is_godson boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    id_client_god_father integer
);

CREATE SEQUENCE "Client_client_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Client_client_id_seq" OWNED BY "Client".client_id;

CREATE TABLE "Cron" (
    cron_id integer NOT NULL,
    type character varying(255),
    data json,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

CREATE SEQUENCE "Cron_cron_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE "Newsletter" (
    email character varying(255) NOT NULL,
    name character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

CREATE TABLE "Offer" (
    offer_id integer NOT NULL,
    name character varying(255),
    aboweb_id character varying(255),
    price_ttc double precision,
    monthly_price_ttc double precision,
    description text,
    time_limited boolean,
    duration integer,
    country_shipping character varying(255),
    shipping_cost double precision,
    is_gift boolean,
    is_free boolean,
    is_free_gift boolean,
    payment_method integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

CREATE SEQUENCE "Offer_offer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "Offer_offer_id_seq" OWNED BY "Offer".offer_id;

CREATE TABLE "Sponsor" (
    sponsor_id integer NOT NULL,
    code character varying(255),
    has_been_used boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    godfather_id integer,
    godson_id integer,
    subscription_id integer,
    token_id integer,
    checkout_id integer
);

CREATE SEQUENCE "Sponsor_sponsor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Sponsor_sponsor_id_seq" OWNED BY "Sponsor".sponsor_id;

CREATE TABLE "Subscription" (
    subscription_id integer NOT NULL,
    aboweb_subscription_id integer,
    aboweb_client_id integer,
    aboweb_offer_id character varying(255),
    first_number_delivered integer,
    last_number_delivered integer,
    is_invoiced boolean,
    is_suspended boolean,
    is_resubscription boolean,
    free_subscription boolean,
    number_of_copy integer,
    order_number character varying(255),
    begin_at timestamp with time zone,
    end_at timestamp with time zone,
    invoiced_number character varying(255),
    status character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);


CREATE SEQUENCE "Subscription_subscription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Subscription_subscription_id_seq" OWNED BY "Subscription".subscription_id;

CREATE TABLE "Token" (
    token_id integer NOT NULL,
    token_type character varying(255),
    aboweb_id character varying(255),
    stripe_token_id character varying(255),
    stripe_customer_id character varying(255),
    stripe_card_id character varying(255),
    stripe_card_country character varying(255),
    stripe_card_brand character varying(255),
    stripe_card_cvc_check character varying(255),
    stripe_card_exp_month integer,
    stripe_card_exp_year integer,
    stripe_card_last4 character varying(255),
    slimpay_rum_id character varying(255),
    slimpay_token_id character varying(255),
    slimpay_bic character varying(255),
    slimpay_iban character varying(255),
    slimpay_rum_code character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    client_id integer
);

CREATE SEQUENCE "Token_token_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "Token_token_id_seq" OWNED BY "Token".token_id;

CREATE TABLE "Voucher" (
    voucher_id integer NOT NULL,
    aboweb_id integer,
    voucher character varying(255) NOT NULL,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

CREATE SEQUENCE "Voucher_voucher_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "Voucher_voucher_id_seq" OWNED BY "Voucher".voucher_id;

--
-- Name: Address address_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Address" ALTER COLUMN address_id SET DEFAULT nextval('"Address_address_id_seq"'::regclass);


--
-- Name: Charge charge_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Charge" ALTER COLUMN charge_id SET DEFAULT nextval('"Charge_charge_id_seq"'::regclass);


--
-- Name: Checkout checkout_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Checkout" ALTER COLUMN checkout_id SET DEFAULT nextval('"Checkout_checkout_id_seq"'::regclass);


--
-- Name: Client client_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Client" ALTER COLUMN client_id SET DEFAULT nextval('"Client_client_id_seq"'::regclass);


--
-- Name: Cron cron_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Cron" ALTER COLUMN cron_id SET DEFAULT nextval('"Cron_cron_id_seq"'::regclass);


--
-- Name: Offer offer_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Offer" ALTER COLUMN offer_id SET DEFAULT nextval('"Offer_offer_id_seq"'::regclass);


--
-- Name: Sponsor sponsor_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Sponsor" ALTER COLUMN sponsor_id SET DEFAULT nextval('"Sponsor_sponsor_id_seq"'::regclass);


--
-- Name: Subscription subscription_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Subscription" ALTER COLUMN subscription_id SET DEFAULT nextval('"Subscription_subscription_id_seq"'::regclass);


--
-- Name: Token token_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Token" ALTER COLUMN token_id SET DEFAULT nextval('"Token_token_id_seq"'::regclass);


--
-- Name: Voucher voucher_id; Type: DEFAULT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Voucher" ALTER COLUMN voucher_id SET DEFAULT nextval('"Voucher_voucher_id_seq"'::regclass);

--
-- Name: Address_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Address_address_id_seq"', 1, false);


--
-- Name: Charge_charge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Charge_charge_id_seq"', 1, false);


--
-- Name: Checkout_checkout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Checkout_checkout_id_seq"', 1, false);


--
-- Name: Client_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Client_client_id_seq"', 1, false);


--
-- Name: Cron_cron_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Cron_cron_id_seq"', 1, false);


--
-- Name: Offer_offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Offer_offer_id_seq"', 105, true);


--
-- Name: Sponsor_sponsor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Sponsor_sponsor_id_seq"', 1, false);


--
-- Name: Subscription_subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Subscription_subscription_id_seq"', 1, false);


--
-- Name: Token_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Token_token_id_seq"', 1, false);


--
-- Name: Voucher_voucher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thibz
--

SELECT pg_catalog.setval('"Voucher_voucher_id_seq"', 1, false);


--
-- Name: Address Address_aboweb_address_id_key; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Address"
    ADD CONSTRAINT "Address_aboweb_address_id_key" UNIQUE (aboweb_address_id);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (address_id);


--
-- Name: Charge Charge_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Charge"
    ADD CONSTRAINT "Charge_pkey" PRIMARY KEY (charge_id);


--
-- Name: Checkout Checkout_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Checkout"
    ADD CONSTRAINT "Checkout_pkey" PRIMARY KEY (checkout_id);


--
-- Name: Client Client_email_key; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Client"
    ADD CONSTRAINT "Client_email_key" UNIQUE (email);


--
-- Name: Client Client_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Client"
    ADD CONSTRAINT "Client_pkey" PRIMARY KEY (client_id);


--
-- Name: Cron Cron_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Cron"
    ADD CONSTRAINT "Cron_pkey" PRIMARY KEY (cron_id);


--
-- Name: Newsletter Newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Newsletter"
    ADD CONSTRAINT "Newsletter_pkey" PRIMARY KEY (email);


--
-- Name: Offer Offer_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY (offer_id);


--
-- Name: Sponsor Sponsor_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Sponsor"
    ADD CONSTRAINT "Sponsor_pkey" PRIMARY KEY (sponsor_id);


--
-- Name: Subscription Subscription_aboweb_subscription_id_key; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Subscription"
    ADD CONSTRAINT "Subscription_aboweb_subscription_id_key" UNIQUE (aboweb_subscription_id);


--
-- Name: Subscription Subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (subscription_id);


--
-- Name: Token Token_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Token"
    ADD CONSTRAINT "Token_pkey" PRIMARY KEY (token_id);


--
-- Name: Voucher Voucher_pkey; Type: CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Voucher"
    ADD CONSTRAINT "Voucher_pkey" PRIMARY KEY (voucher_id);


--
-- Name: aboweb_client_id; Type: INDEX; Schema: public; Owner: thibz
--

CREATE UNIQUE INDEX aboweb_client_id ON "Client" USING btree (aboweb_client_id);


--
-- Name: email_client; Type: INDEX; Schema: public; Owner: thibz
--

CREATE UNIQUE INDEX email_client ON "Client" USING btree (email);


--
-- Name: Address Address_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Address"
    ADD CONSTRAINT "Address_client_id_fkey" FOREIGN KEY (client_id) REFERENCES "Client"(client_id) ON UPDATE CASCADE;


--
-- Name: Charge Charge_checkout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Charge"
    ADD CONSTRAINT "Charge_checkout_id_fkey" FOREIGN KEY (checkout_id) REFERENCES "Checkout"(checkout_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Charge Charge_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Charge"
    ADD CONSTRAINT "Charge_client_id_fkey" FOREIGN KEY (client_id) REFERENCES "Client"(client_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Charge Charge_token_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Charge"
    ADD CONSTRAINT "Charge_token_id_fkey" FOREIGN KEY (token_id) REFERENCES "Token"(token_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Checkout Checkout_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Checkout"
    ADD CONSTRAINT "Checkout_client_id_fkey" FOREIGN KEY (client_id) REFERENCES "Client"(client_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Checkout Checkout_delivery_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Checkout"
    ADD CONSTRAINT "Checkout_delivery_address_id_fkey" FOREIGN KEY (delivery_address_id) REFERENCES "Address"(address_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Checkout Checkout_invoice_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Checkout"
    ADD CONSTRAINT "Checkout_invoice_address_id_fkey" FOREIGN KEY (invoice_address_id) REFERENCES "Address"(address_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Checkout Checkout_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Checkout"
    ADD CONSTRAINT "Checkout_offer_id_fkey" FOREIGN KEY (offer_id) REFERENCES "Offer"(offer_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Checkout Checkout_token_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Checkout"
    ADD CONSTRAINT "Checkout_token_id_fkey" FOREIGN KEY (token_id) REFERENCES "Token"(token_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Sponsor Sponsor_checkout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Sponsor"
    ADD CONSTRAINT "Sponsor_checkout_id_fkey" FOREIGN KEY (checkout_id) REFERENCES "Checkout"(checkout_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Sponsor Sponsor_godfather_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Sponsor"
    ADD CONSTRAINT "Sponsor_godfather_id_fkey" FOREIGN KEY (godfather_id) REFERENCES "Client"(client_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Sponsor Sponsor_godson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Sponsor"
    ADD CONSTRAINT "Sponsor_godson_id_fkey" FOREIGN KEY (godson_id) REFERENCES "Client"(client_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Sponsor Sponsor_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Sponsor"
    ADD CONSTRAINT "Sponsor_subscription_id_fkey" FOREIGN KEY (subscription_id) REFERENCES "Subscription"(subscription_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Sponsor Sponsor_token_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Sponsor"
    ADD CONSTRAINT "Sponsor_token_id_fkey" FOREIGN KEY (token_id) REFERENCES "Token"(token_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Token Token_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thibz
--

ALTER TABLE ONLY "Token"
    ADD CONSTRAINT "Token_client_id_fkey" FOREIGN KEY (client_id) REFERENCES "Client"(client_id) ON UPDATE CASCADE ON DELETE SET NULL;
`)

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
