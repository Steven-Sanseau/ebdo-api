'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
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
    
INSERT INTO "Offer" VALUES (1, 'abo-duree-determinee-0-euro-france-gratuit', 'F-EB-GRABW-000-1-DD', 0, 0, 'Offre essaie envoi 1 numéro gratuit en france', true, 1, 'FR', 0, false, true, true, 0, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (2, 'abo-duree-libre-5-euro-france-cb', 'F-EB-500-4-DL-CB', 500, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison en france', false, 0, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (3, 'abo-duree-libre-5-euro-france-sepa', 'F-EB-500-4-DL-P', 500, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison en france', false, 0, 'FR', 0, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (4, 'abo-duree-libre-5-euro-belgique-sepa', 'F-EB-ETR1-900-4-DL-P', 900, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison en belgique', false, 0, 'BE', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (5, 'abo-duree-libre-5-euro-suisse-sepa', 'F-EB-ETR1-900-4-DL-P', 500, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison en suisse', false, 0, 'CH', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (6, 'abo-duree-libre-5-euro-luxembourg-sepa', 'F-EB-ETR1-900-4-DL-P', 500, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par SEPA, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (7, 'abo-duree-libre-5-euro-belgique-cb', 'F-EB-ETR1-900-4-DL-CB', 900, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison en belgique', false, 0, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (8, 'abo-duree-libre-5-euro-suisse-cb', 'F-EB-ETR1-900-4-DL-CB', 900, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison en suisse', false, 0, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (9, 'abo-duree-libre-5-euro-luxembourg-cb', 'F-EB-ETR1-900-4-DL-CB', 900, 5, 'Abonnement personnel à durée libre, 4 numéro par mois pour 5€ par mois paiement par CB, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (10, 'abo-duree-libre-10-euro-france-cb', 'F-EB-1000-4-DL-CB', 1000, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison en france', false, 0, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (11, 'abo-duree-libre-10-euro-france-sepa', 'F-EB-1000-4-DL-P', 1000, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison en france', false, 0, 'FR', 0, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (12, 'abo-duree-libre-10-euro-belgique-sepa', 'F-EB-ETR1-1400-4-DL-P', 1400, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison en belgique', false, 0, 'BE', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (13, 'abo-duree-libre-10-euro-suisse-sepa', 'F-EB-ETR1-1400-4-DL-P', 1400, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison en suisse', false, 0, 'CH', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (14, 'abo-duree-libre-10-euro-luxembourg-sepa', 'F-EB-ETR1-1400-4-DL-P', 1400, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par SEPA, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (15, 'abo-duree-libre-10-euro-belgique-cb', 'F-EB-ETR1-1400-4-DL-CB', 1400, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison en belgique', false, 0, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (16, 'abo-duree-libre-10-euro-suisse-cb', 'F-EB-ETR1-1400-4-DL-CB', 1400, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison en suisse', false, 0, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (17, 'abo-duree-libre-10-euro-luxembourg-cb', 'F-EB-ETR1-1400-4-DL-CB', 1400, 10, 'Abonnement personnel à durée libre, 4 numéro par mois pour 10€ par mois paiement par CB, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (18, 'abo-duree-libre-15-euro-france-cb', 'F-EB-1500-4-DL-CB', 1500, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison en france', false, 0, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (19, 'abo-duree-libre-15-euro-france-sepa', 'F-EB-1500-4-DL-P', 1500, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison en france', false, 0, 'FR', 0, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (20, 'abo-duree-libre-15-euro-belgique-sepa', 'F-EB-ETR1-1900-4-DL-P', 1900, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison en belgique', false, 0, 'BE', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (21, 'abo-duree-libre-15-euro-suisse-sepa', 'F-EB-ETR1-1900-4-DL-P', 1900, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison en suisse', false, 0, 'CH', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (22, 'abo-duree-libre-15-euro-luxembourg-sepa', 'F-EB-ETR1-1900-4-DL-P', 1900, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par SEPA, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (23, 'abo-duree-libre-15-euro-belgique-cb', 'F-EB-ETR1-1900-4-DL-CB', 1900, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison en belgique', false, 0, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (24, 'abo-duree-libre-15-euro-suisse-cb', 'F-EB-ETR1-1900-4-DL-CB', 1900, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison en suisse', false, 0, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (25, 'abo-duree-libre-15-euro-luxembourg-cb', 'F-EB-ETR1-1900-4-DL-CB', 1900, 15, 'Abonnement personnel à durée libre, 4 numéro par mois pour 15€ par mois paiement par CB, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (26, 'abo-duree-libre-20-euro-france-cb', 'F-EB-2000-4-DL-CB', 2000, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison en france', false, 0, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (27, 'abo-duree-libre-20-euro-france-sepa', 'F-EB-2000-4-DL-P', 2000, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison en france', false, 0, 'FR', 0, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (28, 'abo-duree-libre-20-euro-belgique-sepa', 'F-EB-ETR1-2400-4-DL-P', 2400, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison en belgique', false, 0, 'BE', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (29, 'abo-duree-libre-20-euro-suisse-sepa', 'F-EB-ETR1-2400-4-DL-P', 2400, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison en suisse', false, 0, 'CH', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (30, 'abo-duree-libre-20-euro-luxembourg-sepa', 'F-EB-ETR1-2400-4-DL-P', 2400, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par SEPA, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 1, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (31, 'abo-duree-libre-20-euro-belgique-cb', 'F-EB-ETR1-2400-4-DL-CB', 2400, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison en belgique', false, 0, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (32, 'abo-duree-libre-20-euro-suisse-cb', 'F-EB-ETR1-2400-4-DL-CB', 2400, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison en suisse', false, 0, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (33, 'abo-duree-libre-24-euro-luxembourg-cb', 'F-EB-ETR1-2400-4-DL-CB', 2400, 20, 'Abonnement personnel à durée libre, 4 numéro par mois pour 20€ par mois paiement par CB, livraison au luxembourg', false, 0, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (34, 'abo-duree-determinee-3-mois-5-euro-france-cb', 'F-EB-1500-12-DD-0', 1500, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (35, 'abo-duree-determinee-3-mois-5-euro-belgique-cb', 'F-EB-ETR1-2700-12-DD-0', 2700, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en belgique', true, 12, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (36, 'abo-duree-determinee-3-mois-5-euro-suisse-cb', 'F-EB-2700-12-DD-0', 2700, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en suisse', true, 12, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (37, 'abo-duree-determinee-3-mois-5-euro-luxembourg-cb', 'F-EB-2700-12-DD-0', 2700, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison au luxembourg', true, 12, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (38, 'abo-duree-determinee-3-mois-10-euro-france-cb', 'F-EB-3000-12-DD-0', 3000, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (39, 'abo-duree-determinee-3-mois-10-euro-belgique-cb', 'F-EB-ETR1-4200-12-DD-0', 4200, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en belgique', true, 12, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (40, 'abo-duree-determinee-3-mois-10-euro-suisse-cb', 'F-EB-ETR1-4200-12-DD-0', 4200, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en suisse', true, 12, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (41, 'abo-duree-determinee-3-mois-10-euro-luxembourg-cb', 'F-EB-ETR1-4200-12-DD-0', 4200, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison au luxembourg', true, 12, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (42, 'abo-duree-determinee-3-mois-15-euro-france-cb', 'F-EB-4500-12-DD-0', 4500, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (43, 'abo-duree-determinee-3-mois-15-euro-belgique-cb', 'F-EB-ETR1-5700-12-DD-0', 5700, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en belgique', true, 12, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (44, 'abo-duree-determinee-3-mois-15-euro-suisse-cb', 'F-EB-ETR1-5700-12-DD-0', 5700, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en suisse', true, 12, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (45, 'abo-duree-determinee-3-mois-15-euro-luxembourg-cb', 'F-EB-ETR1-5700-12-DD-0', 5700, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison au luxembourg', true, 12, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (46, 'abo-duree-determinee-3-mois-20-euro-france-cb', 'F-EB-6000-12-DD-0', 6000, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (47, 'abo-duree-determinee-3-mois-20-euro-belgique-cb', 'F-EB-ETR1-7200-12-DD-0', 7200, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en belgique', true, 12, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (48, 'abo-duree-determinee-3-mois-20-euro-suisse-cb', 'F-EB-ETR1-7200-12-DD-0', 7200, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en suisse', true, 12, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (49, 'abo-duree-determinee-3-mois-20-euro-luxembourg-cb', 'F-EB-ETR1-7200-12-DD-0', 7200, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison au luxembourg', true, 12, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (50, 'abo-duree-determinee-6-mois-5-euro-france-cb', 'F-EB-3000-24-DD-0', 3000, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (51, 'abo-duree-determinee-6-mois-5-euro-belgique-cb', 'F-EB-ETR1-5400-24-DD-0', 5400, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en belgique', true, 24, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (52, 'abo-duree-determinee-6-mois-5-euro-suisse-cb', 'F-EB-5400-24-DD-0', 5400, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en suisse', true, 24, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (53, 'abo-duree-determinee-6-mois-5-euro-luxembourg-cb', 'F-EB-5400-24-DD-0', 5400, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison au luxembourg', true, 24, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (54, 'abo-duree-determinee-6-mois-10-euro-france-cb', 'F-EB-6000-24-DD-0', 6000, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (55, 'abo-duree-determinee-6-mois-10-euro-belgique-cb', 'F-EB-ETR1-8400-24-DD-0', 8400, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en belgique', true, 24, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (56, 'abo-duree-determinee-6-mois-10-euro-suisse-cb', 'F-EB-ETR1-8400-24-DD-0', 8400, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en suisse', true, 24, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (57, 'abo-duree-determinee-6-mois-10-euro-luxembourg-cb', 'F-EB-ETR1-8400-24-DD-0', 8400, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison au luxembourg', true, 24, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (58, 'abo-duree-determinee-6-mois-15-euro-france-cb', 'F-EB-9000-24-DD-0', 9000, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (59, 'abo-duree-determinee-6-mois-15-euro-belgique-cb', 'F-EB-ETR1-11400-24-DD-0', 11400, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en belgique', true, 24, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (60, 'abo-duree-determinee-6-mois-15-euro-suisse-cb', 'F-EB-ETR1-11400-24-DD-0', 11400, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en suisse', true, 24, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (61, 'abo-duree-determinee-6-mois-15-euro-luxembourg-cb', 'F-EB-ETR1-11400-24-DD-0', 11400, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison au luxembourg', true, 24, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (62, 'abo-duree-determinee-6-mois-20-euro-france-cb', 'F-EB-12000-24-DD-0', 12000, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (63, 'abo-duree-determinee-6-mois-20-euro-belgique-cb', 'F-EB-ETR1-14400-24-DD-0', 14400, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en belgique', true, 24, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (64, 'abo-duree-determinee-6-mois-20-euro-suisse-cb', 'F-EB-ETR1-14400-24-DD-0', 14400, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en suisse', true, 24, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (65, 'abo-duree-determinee-6-mois-20-euro-luxembourg-cb', 'F-EB-ETR1-14400-24-DD-0', 14400, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison au luxembourg', true, 24, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (66, 'abo-duree-determinee-12-mois-5-euro-france-cb', 'F-EB-24000-48-DD-0', 24000, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (67, 'abo-duree-determinee-12-mois-5-euro-belgique-cb', 'F-EB-ETR1-10800-48-DD-0', 10800, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en belgique', true, 48, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (68, 'abo-duree-determinee-12-mois-5-euro-suisse-cb', 'F-EB-10800-48-DD-0', 10800, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en suisse', true, 48, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (69, 'abo-duree-determinee-12-mois-5-euro-luxembourg-cb', 'F-EB-10800-48-DD-0', 10800, 5, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison au luxembourg', true, 48, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (70, 'abo-duree-determinee-12-mois-10-euro-france-cb', 'F-EB-24000-48-DD-0', 24000, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (71, 'abo-duree-determinee-12-mois-10-euro-belgique-cb', 'F-EB-ETR1-16800-48-DD-0', 16800, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en belgique', true, 48, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (72, 'abo-duree-determinee-12-mois-10-euro-suisse-cb', 'F-EB-ETR1-16800-48-DD-0', 16800, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en suisse', true, 48, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (73, 'abo-duree-determinee-12-mois-10-euro-luxembourg-cb', 'F-EB-ETR1-16800-48-DD-0', 16800, 10, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison au luxembourg', true, 48, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (74, 'abo-duree-determinee-12-mois-15-euro-france-cb', 'F-EB-18000-48-DD-0', 18000, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (75, 'abo-duree-determinee-12-mois-15-euro-belgique-cb', 'F-EB-ETR1-22800-48-DD-0', 22800, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en belgique', true, 48, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (76, 'abo-duree-determinee-12-mois-15-euro-suisse-cb', 'F-EB-ETR1-22800-48-DD-0', 22800, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en suisse', true, 48, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (77, 'abo-duree-determinee-12-mois-15-euro-luxembourg-cb', 'F-EB-ETR1-22800-48-DD-0', 22800, 15, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison au luxembourg', true, 48, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (78, 'abo-duree-determinee-12-mois-20-euro-france-cb', 'F-EB-24000-48-DD-0', 24000, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (79, 'abo-duree-determinee-12-mois-20-euro-belgique-cb', 'F-EB-ETR1-28800-48-DD-0', 28800, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en belgique', true, 48, 'BE', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (80, 'abo-duree-determinee-12-mois-20-euro-suisse-cb', 'F-EB-ETR1-28800-48-DD-0', 28800, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en suisse', true, 48, 'CH', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (81, 'abo-duree-determinee-12-mois-20-euro-luxembourg-cb', 'F-EB-ETR1-28800-48-DD-0', 28800, 20, 'Abonnement personnel à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison au luxembourg', true, 48, 'LU', 1, false, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (82, 'abo-duree-determinee-offre-parrain-3-mois-5-euro-france-cb', 'F-EB-PAR-1500-12-DD-0', 1500, 5, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 5€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (83, 'abo-duree-determinee-offre-parrain-3-mois-10-euro-france-cb', 'F-EB-PAR-3000-12-DD-0', 3000, 10, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 10€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (84, 'abo-duree-determinee-offre-parrain-3-mois-15-euro-france-cb', 'F-EB-PAR-4500-12-DD-0', 4500, 15, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 15€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (85, 'abo-duree-determinee-offre-parrain-3-mois-20-euro-france-cb', 'F-EB-PAR-6000-12-DD-0', 6000, 20, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 20€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (86, 'abo-duree-determinee-offre-parrain-6-mois-5-euro-france-cb', 'F-EB-PAR-3000-24-DD-0', 3000, 5, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (87, 'abo-duree-determinee-offre-parrain-6-mois-10-euro-france-cb', 'F-EB-PAR-6000-24-DD-0', 6000, 10, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (88, 'abo-duree-determinee-offre-parrain-6-mois-15-euro-france-cb', 'F-EB-PAR-9000-24-DD-0', 9000, 15, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (89, 'abo-duree-determinee-offre-parrain-6-mois-20-euro-france-cb', 'F-EB-PAR-12000-24-DD-0', 12000, 20, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (90, 'abo-duree-determinee-offre-parrain-12-mois-5-euro-france-cb', 'F-EB-PAR-24000-48-DD-0', 24000, 5, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 5€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (91, 'abo-duree-determinee-offre-parrain-12-mois-10-euro-france-cb', 'F-EB-PAR-24000-48-DD-0', 24000, 10, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 10€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (92, 'abo-duree-determinee-offre-parrain-12-mois-15-euro-france-cb', 'F-EB-PAR-18000-48-DD-0', 18000, 15, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 15€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (93, 'abo-duree-determinee-offre-parrain-12-mois-20-euro-france-cb', 'F-EB-PAR-24000-48-DD-0', 24000, 20, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 20€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, false, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (94, 'abo-duree-determinee-offre-filleul-3-mois-5-euro-france-cb', 'F-EB-FIL-1500-12-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (95, 'abo-duree-determinee-offre-filleul-3-mois-10-euro-france-cb', 'F-EB-FIL-3000-12-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (96, 'abo-duree-determinee-offre-filleul-3-mois-15-euro-france-cb', 'F-EB-FIL-4500-12-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (97, 'abo-duree-determinee-offre-filleul-3-mois-20-euro-france-cb', 'F-EB-FIL-6000-12-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 3 mois pour 0€ par mois paiement par CB, livraison en france', true, 12, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (98, 'abo-duree-determinee-offre-filleul-6-mois-5-euro-france-cb', 'F-EB-FIL-3000-24-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (99, 'abo-duree-determinee-offre-filleul-6-mois-10-euro-france-cb', 'F-EB-FIL-6000-24-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (100, 'abo-duree-determinee-offre-filleul-6-mois-15-euro-france-cb', 'F-EB-FIL-9000-24-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (101, 'abo-duree-determinee-offre-filleul-6-mois-20-euro-france-cb', 'F-EB-FIL-12000-24-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 24, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (102, 'abo-duree-determinee-offre-filleul-12-mois-5-euro-france-cb', 'F-EB-FIL-24000-48-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (103, 'abo-duree-determinee-offre-filleul-12-mois-10-euro-france-cb', 'F-EB-FIL-24000-48-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (104, 'abo-duree-determinee-offre-filleul-12-mois-15-euro-france-cb', 'F-EB-FIL-18000-48-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
INSERT INTO "Offer" VALUES (105, 'abo-duree-determinee-offre-filleul-12-mois-20-euro-france-cb', 'F-EB-FIL-24000-48-DD-0', 0, 0, 'Abonnement offert à durée déterminée, 4 numéro par mois pendant 6 mois pour 0€ par mois paiement par CB, livraison en france', true, 48, 'FR', 0, true, true, false, 2, '2018-01-10 12:01:44.439+01', '2018-01-10 12:01:44.439+01', NULL);
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
