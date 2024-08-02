CREATE ROLE luckberry WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  NOREPLICATION
  BYPASSRLS
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:wfvExB4dWLrs4XkS61kTqw==$8Z91RxxBPUcmLdx4O1r7xxUFH1vibU0stWQn2JHP3XY=:10BoaIP05XN2N3fPEcNtbEr/30/ZnUJJ4HHSaIEk3G0=';
-- CREATE USER luckberry WITH PASSWORD 'pgpass';
ALTER DATABASE luckberry OWNER TO luckberry;
GRANT ALL PRIVILEGES ON DATABASE luckberry TO luckberry;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO newuser;
CREATE TABLE IF NOT EXISTS lb_devices (
    device_id integer NOT NULL,
    level_id integer NOT NULL,
    pin smallint NOT NULL,
    type smallint NOT NULL,
    name character varying(255) NOT NULL,
    "from" smallint,
    "to" smallint,
    addr character varying(255),
    "tgNotify" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 216 (class 1259 OID 16446)
-- Name: lb_devices_device_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_devices ALTER COLUMN device_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_devices_device_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16447)
-- Name: lb_ferm_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_ferm_settings (
    setting_id integer NOT NULL,
    name character varying(255) NOT NULL,
    get_temp_timeout smallint NOT NULL,
    get_time_timeout smallint NOT NULL,
    post_timeout integer NOT NULL,
    get_timeout smallint NOT NULL,
    update_levels_timeout smallint NOT NULL,
    update_messages_timeout smallint NOT NULL,
    update_oled_timeout smallint NOT NULL,
    update_sensors_timeout smallint NOT NULL,
    save_scenario boolean DEFAULT true NOT NULL,
    "tgNotify" boolean DEFAULT false NOT NULL,
    "tgChatId" character varying(9),
    ferma_id integer NOT NULL,
    restart_if_offline integer DEFAULT 0 NOT NULL,
    reconnect_if_offline integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 218 (class 1259 OID 16454)
-- Name: lb_ferm_settings_setting_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_ferm_settings ALTER COLUMN setting_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_ferm_settings_setting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16455)
-- Name: lb_ferms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_ferms (
    ferma_id integer NOT NULL,
    user_id integer NOT NULL,
    last_update timestamp without time zone NOT NULL,
    last_request timestamp without time zone,
    key character varying(16) DEFAULT 0 NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16459)
-- Name: lb_ferms_ferma_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_ferms ALTER COLUMN ferma_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_ferms_ferma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16460)
-- Name: lb_firmwares; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_firmwares (
    begda timestamp without time zone NOT NULL,
    endda timestamp without time zone NOT NULL,
    ferma_id integer DEFAULT 0 NOT NULL,
    version integer NOT NULL,
    path character varying(50) NOT NULL,
    "deleteAllScenarios" boolean DEFAULT false NOT NULL,
    force boolean DEFAULT false NOT NULL,
    "resetLoginData" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 222 (class 1259 OID 16467)
-- Name: lb_levels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_levels (
    level_id integer NOT NULL,
    ferma_id integer NOT NULL,
    "tgNotify" boolean DEFAULT false NOT NULL,
    level_num smallint NOT NULL,
    level_name character varying(255),
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 223 (class 1259 OID 16471)
-- Name: lb_levels_level_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_levels ALTER COLUMN level_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_levels_level_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16472)
-- Name: lb_rule_periods; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_rule_periods (
    period_id integer NOT NULL,
    rule_id integer NOT NULL,
    start integer,
    "end" integer,
    every integer,
    every_duration integer,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 225 (class 1259 OID 16475)
-- Name: lb_rule_references; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_rule_references (
    reference_id integer NOT NULL,
    rule_id integer NOT NULL,
    device_id integer NOT NULL,
    level_id integer NOT NULL,
    "from" smallint,
    "to" smallint,
    type smallint NOT NULL,
    variable smallint,
    min_work_time integer,
    block integer,
    max_work_time integer,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 226 (class 1259 OID 16478)
-- Name: lb_rules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_rules (
    rule_id integer NOT NULL,
    level_id integer NOT NULL,
    device_id integer NOT NULL,
    rule_type smallint NOT NULL,
    power smallint NOT NULL,
    "smoothEnd" smallint,
    "smoothStart" smallint,
    "runAfter" timestamp without time zone,
    "runBefore" timestamp without time zone,
    "tgNotify" boolean DEFAULT false NOT NULL,
    power_start smallint,
    power_end smallint,
    status smallint DEFAULT 1 NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 227 (class 1259 OID 16483)
-- Name: lb_rules_periods_period_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_rule_periods ALTER COLUMN period_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_rules_periods_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 16484)
-- Name: lb_rules_references_reference_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_rule_references ALTER COLUMN reference_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_rules_references_reference_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 16485)
-- Name: lb_rules_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_rules ALTER COLUMN rule_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_rules_rule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16486)
-- Name: lb_sensors_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_sensors_data (
    id integer NOT NULL,
    ferma_id integer NOT NULL,
    device_id integer NOT NULL,
    subty smallint DEFAULT 0 NOT NULL,
    value integer,
    created timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 16491)
-- Name: lb_sensors_data_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_sensors_data ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_sensors_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 16492)
-- Name: lb_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_users (
    user_id integer NOT NULL,
    user_login character varying(255) NOT NULL,
    user_pass character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_role character varying(255) NOT NULL,
    user_lastlogin timestamp without time zone NOT NULL,
    user_phone character varying(255),
    user_status smallint DEFAULT 1 NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


--
-- TOC entry 233 (class 1259 OID 16498)
-- Name: lb_users_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS lb_users_tokens (
    user_id integer NOT NULL,
    token character varying(40) NOT NULL,
    token_type smallint NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    expires timestamp without time zone NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 16502)
-- Name: lb_users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE lb_users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME lb_users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3312 (class 2606 OID 16504)
-- Name: lb_devices lb_devices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_devices
    ADD CONSTRAINT lb_devices_pkey PRIMARY KEY (device_id);


--
-- TOC entry 3314 (class 2606 OID 16506)
-- Name: lb_ferm_settings lb_ferm_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_ferm_settings
    ADD CONSTRAINT lb_ferm_settings_pkey PRIMARY KEY (setting_id);


--
-- TOC entry 3316 (class 2606 OID 16508)
-- Name: lb_ferms lb_ferms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_ferms
    ADD CONSTRAINT lb_ferms_pkey PRIMARY KEY (ferma_id);


--
-- TOC entry 3318 (class 2606 OID 16510)
-- Name: lb_firmwares lb_firmwares_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_firmwares
    ADD CONSTRAINT lb_firmwares_pkey PRIMARY KEY (begda, endda);


--
-- TOC entry 3320 (class 2606 OID 16512)
-- Name: lb_levels lb_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_levels
    ADD CONSTRAINT lb_levels_pkey PRIMARY KEY (level_id);


--
-- TOC entry 3322 (class 2606 OID 16514)
-- Name: lb_rule_periods lb_rules_periods_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_rule_periods
    ADD CONSTRAINT lb_rules_periods_pkey PRIMARY KEY (period_id);


--
-- TOC entry 3326 (class 2606 OID 16516)
-- Name: lb_rules lb_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_rules
    ADD CONSTRAINT lb_rules_pkey PRIMARY KEY (rule_id);


--
-- TOC entry 3324 (class 2606 OID 16518)
-- Name: lb_rule_references lb_rules_references_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_rule_references
    ADD CONSTRAINT lb_rules_references_pkey PRIMARY KEY (reference_id);


--
-- TOC entry 3328 (class 2606 OID 16520)
-- Name: lb_sensors_data lb_sensors_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_sensors_data
    ADD CONSTRAINT lb_sensors_data_pkey PRIMARY KEY (id);


--
-- TOC entry 3330 (class 2606 OID 16522)
-- Name: lb_users lb_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_users
    ADD CONSTRAINT lb_users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3332 (class 2606 OID 16524)
-- Name: lb_users_tokens lb_users_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_users_tokens
    ADD CONSTRAINT lb_users_tokens_pkey PRIMARY KEY (created, token_type, user_id);


--
-- TOC entry 3339 (class 2606 OID 16525)
-- Name: lb_rules fk_devices_rules; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_rules
    ADD CONSTRAINT fk_devices_rules FOREIGN KEY (device_id) REFERENCES lb_devices(device_id);


--
-- TOC entry 3335 (class 2606 OID 16530)
-- Name: lb_ferms fk_user_ferms; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_ferms
    ADD CONSTRAINT fk_user_ferms FOREIGN KEY (user_id) REFERENCES lb_users(user_id);


--
-- TOC entry 3333 (class 2606 OID 16535)
-- Name: lb_devices lb_devices_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_devices
    ADD CONSTRAINT lb_devices_level_id_fkey FOREIGN KEY (level_id) REFERENCES lb_levels(level_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3334 (class 2606 OID 16540)
-- Name: lb_ferm_settings lb_ferm_settings_ferma_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_ferm_settings
    ADD CONSTRAINT lb_ferm_settings_ferma_id_fkey FOREIGN KEY (ferma_id) REFERENCES lb_ferms(ferma_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3336 (class 2606 OID 16545)
-- Name: lb_levels lb_levels_ferma_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_levels
    ADD CONSTRAINT lb_levels_ferma_id_fkey FOREIGN KEY (ferma_id) REFERENCES lb_ferms(ferma_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3337 (class 2606 OID 16550)
-- Name: lb_rule_periods lb_rule_periods_rule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_rule_periods
    ADD CONSTRAINT lb_rule_periods_rule_id_fkey FOREIGN KEY (rule_id) REFERENCES lb_rules(rule_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3338 (class 2606 OID 16555)
-- Name: lb_rule_references lb_rule_references_rule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_rule_references
    ADD CONSTRAINT lb_rule_references_rule_id_fkey FOREIGN KEY (rule_id) REFERENCES lb_rules(rule_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3340 (class 2606 OID 16560)
-- Name: lb_rules lb_rules_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_rules
    ADD CONSTRAINT lb_rules_level_id_fkey FOREIGN KEY (level_id) REFERENCES lb_levels(level_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3341 (class 2606 OID 16565)
-- Name: lb_sensors_data lb_sensors_data_device_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_sensors_data
    ADD CONSTRAINT lb_sensors_data_device_fkey FOREIGN KEY (device_id) REFERENCES lb_devices(device_id);


--
-- TOC entry 3342 (class 2606 OID 16570)
-- Name: lb_sensors_data lb_sensors_data_ferma_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lb_sensors_data
    ADD CONSTRAINT lb_sensors_data_ferma_fkey FOREIGN KEY (ferma_id) REFERENCES lb_ferms(ferma_id);


-- Completed on 2024-08-01 22:32:50 UTC

--
-- PostgreSQL database dump complete
--

