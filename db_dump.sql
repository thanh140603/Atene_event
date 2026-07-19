--
-- PostgreSQL database dump
--

\restrict jtFlyQRvcxI0YhEcuu2B9MPgk5J7VS5ZzLJ3z8iBITvyKd1LZpgFmkHPfQbKZf2

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    "creatorName" character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    dates jsonb NOT NULL,
    slots jsonb NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bookings OWNER TO atene;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO atene;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: brands; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    slug character varying NOT NULL,
    name character varying NOT NULL,
    tagline character varying DEFAULT ''::character varying NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    "imageUrl" character varying DEFAULT ''::character varying NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.brands OWNER TO atene;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO atene;

--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: event_info; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.event_info (
    id integer NOT NULL,
    "heroKicker" character varying DEFAULT 'K-BEAUTY POPUP EVENT 2026'::character varying NOT NULL,
    "heroTitle" character varying DEFAULT 'CREATOR SOURCING DAY'::character varying NOT NULL,
    "poweredBy" character varying DEFAULT 'Powered by ATENE'::character varying NOT NULL,
    "heroTagline" text DEFAULT 'Meet Top K-Beauty Brands. Get Exclusive TokuPack Access.'::text NOT NULL,
    "heroTaglineEmphasis" character varying DEFAULT 'Start Your Livestream Journey'::character varying NOT NULL,
    "eventDate" timestamp with time zone NOT NULL,
    venue character varying DEFAULT 'THE STRINGS BY INTERCONTINENTAL SHINAGAWA, TOKYO'::character varying NOT NULL,
    "campaignStart" date NOT NULL,
    "campaignEnd" date NOT NULL,
    "aboutSubtitle" text DEFAULT 'K-BeautyブランドとTikTokクリエイターをつなぐ'::text NOT NULL,
    "aboutBody" text NOT NULL
);


ALTER TABLE public.event_info OWNER TO atene;

--
-- Name: event_info_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.event_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_info_id_seq OWNER TO atene;

--
-- Name: event_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.event_info_id_seq OWNED BY public.event_info.id;


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    question character varying NOT NULL,
    answer text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.faqs OWNER TO atene;

--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faqs_id_seq OWNER TO atene;

--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: how_it_works_steps; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.how_it_works_steps (
    id integer NOT NULL,
    "stepNumber" integer NOT NULL,
    title character varying NOT NULL,
    subtitle character varying NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.how_it_works_steps OWNER TO atene;

--
-- Name: how_it_works_steps_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.how_it_works_steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.how_it_works_steps_id_seq OWNER TO atene;

--
-- Name: how_it_works_steps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.how_it_works_steps_id_seq OWNED BY public.how_it_works_steps.id;


--
-- Name: social_links; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.social_links (
    id integer NOT NULL,
    platform character varying NOT NULL,
    label character varying NOT NULL,
    handle character varying NOT NULL,
    url character varying DEFAULT '#'::character varying NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.social_links OWNER TO atene;

--
-- Name: social_links_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.social_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_links_id_seq OWNER TO atene;

--
-- Name: social_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.social_links_id_seq OWNED BY public.social_links.id;


--
-- Name: stats; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.stats (
    id integer NOT NULL,
    value character varying NOT NULL,
    label character varying NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.stats OWNER TO atene;

--
-- Name: stats_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stats_id_seq OWNER TO atene;

--
-- Name: stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.stats_id_seq OWNED BY public.stats.id;


--
-- Name: tokupack_applications; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.tokupack_applications (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    "preferredBrand" character varying DEFAULT ''::character varying NOT NULL,
    "preferredBrandOther" character varying DEFAULT ''::character varying NOT NULL,
    "liveCommerceBrands" jsonb DEFAULT '[]'::jsonb NOT NULL,
    comment text DEFAULT ''::text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tokupack_applications OWNER TO atene;

--
-- Name: tokupack_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.tokupack_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tokupack_applications_id_seq OWNER TO atene;

--
-- Name: tokupack_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.tokupack_applications_id_seq OWNED BY public.tokupack_applications.id;


--
-- Name: tokupacks; Type: TABLE; Schema: public; Owner: atene
--

CREATE TABLE public.tokupacks (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    price integer DEFAULT 0 NOT NULL,
    "brandId" integer
);


ALTER TABLE public.tokupacks OWNER TO atene;

--
-- Name: tokupacks_id_seq; Type: SEQUENCE; Schema: public; Owner: atene
--

CREATE SEQUENCE public.tokupacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tokupacks_id_seq OWNER TO atene;

--
-- Name: tokupacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: atene
--

ALTER SEQUENCE public.tokupacks_id_seq OWNED BY public.tokupacks.id;


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: event_info id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.event_info ALTER COLUMN id SET DEFAULT nextval('public.event_info_id_seq'::regclass);


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: how_it_works_steps id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.how_it_works_steps ALTER COLUMN id SET DEFAULT nextval('public.how_it_works_steps_id_seq'::regclass);


--
-- Name: social_links id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.social_links ALTER COLUMN id SET DEFAULT nextval('public.social_links_id_seq'::regclass);


--
-- Name: stats id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.stats ALTER COLUMN id SET DEFAULT nextval('public.stats_id_seq'::regclass);


--
-- Name: tokupack_applications id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.tokupack_applications ALTER COLUMN id SET DEFAULT nextval('public.tokupack_applications_id_seq'::regclass);


--
-- Name: tokupacks id; Type: DEFAULT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.tokupacks ALTER COLUMN id SET DEFAULT nextval('public.tokupacks_id_seq'::regclass);


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.bookings (id, "creatorName", email, dates, slots, "createdAt") FROM stdin;
1			["2026-07-29"]	[{"end": "15:00", "date": "2026-07-29", "start": "13:00"}]	2026-07-19 10:02:32.65082+00
2			["2026-07-31"]	[]	2026-07-19 18:32:06.175114+00
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.brands (id, slug, name, tagline, description, "imageUrl", "sortOrder") FROM stdin;
1	purito-seoul	Purito Seoul	From Soil to Seoul	Purito Seoul — From Soil to Seoul		1
2	vt-cosmetics	VT Cosmetics	In - Vogue and Timeless	VT Cosmetics — In - Vogue and Timeless		2
3	beplain	Beplain	Enjoy plain skin, beplain	Beplain — Enjoy plain skin, beplain		3
4	dr-deep	Dr.Deep	Designing today's depth for the skin's tomorrow	Dr.Deep — Designing today's depth for the skin's tomorrow		4
5	lubylab	LUBYLAB	The Home-Surgical Approach	LUBYLAB — The Home-Surgical Approach		5
6	dailyweekly	DAILYWEEKLY	Daily Delight, Weekly Wonders	DAILYWEEKLY — Daily Delight, Weekly Wonders		6
7	torhop	Torhop	Sauna-Inspired Warming Care	Torhop — Sauna-Inspired Warming Care		7
8	babaco	Babaco	Beauty begins with real care.	Babaco — Beauty begins with real care.		8
9	quadthera	Quadthera	Science-led daily therapy	Quadthera — Science-led daily therapy		9
10	atike	ATIKE	Ritual care, refined	ATIKE — Ritual care, refined		10
11	zipiel	ZIPIEL	Sealed freshness, radiant skin	ZIPIEL — Sealed freshness, radiant skin		11
\.


--
-- Data for Name: event_info; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.event_info (id, "heroKicker", "heroTitle", "poweredBy", "heroTagline", "heroTaglineEmphasis", "eventDate", venue, "campaignStart", "campaignEnd", "aboutSubtitle", "aboutBody") FROM stdin;
1	K-BEAUTY POPUP EVENT 2026	CREATOR SOURCING DAY	Powered by ATENE	Meet Top K-Beauty Brands. Get Exclusive TokuPack Access.	Start Your Livestream Journey	2026-07-23 04:00:00+00	THE STRINGS BY INTERCONTINENTAL SHINAGAWA, TOKYO	2026-07-27	2026-08-26	K-BeautyブランドとTikTokクリエイターをつなぐ	TokuPackとは、ATENE主催の「Creator Sourcing Day」イベント限定で提供される、各ブランドが厳選した特別な限定セットです。
\.


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.faqs (id, question, answer, "sortOrder") FROM stdin;
1	How do I receive my TokuPack?	A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……	1
2	Who can join Creator Sourcing Day?	A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……	2
3	When is the livestream campaign period?	A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……	3
4	How do I book a livestream slot?	A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……	4
5	What rewards can creators earn?	A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……	5
6	Where is the offline event held?	A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……	6
\.


--
-- Data for Name: how_it_works_steps; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.how_it_works_steps (id, "stepNumber", title, subtitle, "sortOrder") FROM stdin;
1	1	Offline Event	July 23th	1
2	2	Receive Tokupack	At The Event	2
3	3	Try Product	At Home	3
4	4	Book Livestream	Jul 27 - Aug 26	4
5	5	Go Live	Scheduled Slot	5
6	6	Reward	Per Sale	6
\.


--
-- Data for Name: social_links; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.social_links (id, platform, label, handle, url, "sortOrder") FROM stdin;
1	instagram	ATENE	@atene_cosmetics.jp	https://instagram.com/atene_cosmetics.jp	1
2	instagram	TokuPack	@tokupack.official	https://instagram.com/tokupack.official	2
3	tiktok	ATENE	@atene_cosmetics.jp	https://tiktok.com/@atene_cosmetics.jp	3
\.


--
-- Data for Name: stats; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.stats (id, value, label, "sortOrder") FROM stdin;
1	10+	人気K-Beautyブランド	1
2	20+	限定セット・トクパック	2
3	最強セット	各ブランド厳選の特別構成	3
4	限定販売	TikTok限定・数量限定	4
\.


--
-- Data for Name: tokupack_applications; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.tokupack_applications (id, name, email, "preferredBrand", "preferredBrandOther", "liveCommerceBrands", comment, "createdAt") FROM stdin;
1	?? ??	hanako@example.com	Purito		["VT Cosmetics", "Dr.DEEP"]	?????????	2026-07-19 16:48:17.224321+00
\.


--
-- Data for Name: tokupacks; Type: TABLE DATA; Schema: public; Owner: atene
--

COPY public.tokupacks (id, name, description, price, "brandId") FROM stdin;
1	Purito Seoul TokuPack 1	Curated Purito Seoul set — Creator Sourcing Day exclusive.	0	1
2	Purito Seoul TokuPack 2	Curated Purito Seoul set — Creator Sourcing Day exclusive.	0	1
3	Purito Seoul TokuPack 3	Curated Purito Seoul set — Creator Sourcing Day exclusive.	0	1
4	VT Cosmetics TokuPack 1	Curated VT Cosmetics set — Creator Sourcing Day exclusive.	0	2
5	VT Cosmetics TokuPack 2	Curated VT Cosmetics set — Creator Sourcing Day exclusive.	0	2
6	VT Cosmetics TokuPack 3	Curated VT Cosmetics set — Creator Sourcing Day exclusive.	0	2
7	Beplain TokuPack 1	Curated Beplain set — Creator Sourcing Day exclusive.	0	3
8	Dr.Deep TokuPack 1	Curated Dr.Deep set — Creator Sourcing Day exclusive.	0	4
9	LUBYLAB TokuPack 1	Curated LUBYLAB set — Creator Sourcing Day exclusive.	0	5
10	DAILYWEEKLY TokuPack 1	Curated DAILYWEEKLY set — Creator Sourcing Day exclusive.	0	6
11	Torhop TokuPack 1	Curated Torhop set — Creator Sourcing Day exclusive.	0	7
12	Babaco TokuPack 1	Curated Babaco set — Creator Sourcing Day exclusive.	0	8
13	Quadthera TokuPack 1	Curated Quadthera set — Creator Sourcing Day exclusive.	0	9
14	ATIKE TokuPack 1	Curated ATIKE set — Creator Sourcing Day exclusive.	0	10
15	ZIPIEL TokuPack 1	Curated ZIPIEL set — Creator Sourcing Day exclusive.	0	11
\.


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.bookings_id_seq', 2, true);


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.brands_id_seq', 11, true);


--
-- Name: event_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.event_info_id_seq', 1, true);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.faqs_id_seq', 6, true);


--
-- Name: how_it_works_steps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.how_it_works_steps_id_seq', 6, true);


--
-- Name: social_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.social_links_id_seq', 3, true);


--
-- Name: stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.stats_id_seq', 4, true);


--
-- Name: tokupack_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.tokupack_applications_id_seq', 1, true);


--
-- Name: tokupacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: atene
--

SELECT pg_catalog.setval('public.tokupacks_id_seq', 15, true);


--
-- Name: faqs PK_2ddf4f2c910f8e8fa2663a67bf0; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY (id);


--
-- Name: how_it_works_steps PK_3697151f2462e5749aae77bf951; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.how_it_works_steps
    ADD CONSTRAINT "PK_3697151f2462e5749aae77bf951" PRIMARY KEY (id);


--
-- Name: social_links PK_50d32c67ddd71c09d372b02167f; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.social_links
    ADD CONSTRAINT "PK_50d32c67ddd71c09d372b02167f" PRIMARY KEY (id);


--
-- Name: event_info PK_6d10e4edf845e1993d203a03835; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.event_info
    ADD CONSTRAINT "PK_6d10e4edf845e1993d203a03835" PRIMARY KEY (id);


--
-- Name: tokupacks PK_7150b3093491fa99daf3c725a09; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.tokupacks
    ADD CONSTRAINT "PK_7150b3093491fa99daf3c725a09" PRIMARY KEY (id);


--
-- Name: tokupack_applications PK_74a6a15f5bb6032301d31e09e8e; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.tokupack_applications
    ADD CONSTRAINT "PK_74a6a15f5bb6032301d31e09e8e" PRIMARY KEY (id);


--
-- Name: brands PK_b0c437120b624da1034a81fc561; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY (id);


--
-- Name: bookings PK_bee6805982cc1e248e94ce94957; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY (id);


--
-- Name: stats PK_c76e93dfef28ba9b6942f578ab1; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY (id);


--
-- Name: brands UQ_b15428f362be2200922952dc268; Type: CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT "UQ_b15428f362be2200922952dc268" UNIQUE (slug);


--
-- Name: tokupacks FK_2787a9388282f8fa4cc5a85331d; Type: FK CONSTRAINT; Schema: public; Owner: atene
--

ALTER TABLE ONLY public.tokupacks
    ADD CONSTRAINT "FK_2787a9388282f8fa4cc5a85331d" FOREIGN KEY ("brandId") REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict jtFlyQRvcxI0YhEcuu2B9MPgk5J7VS5ZzLJ3z8iBITvyKd1LZpgFmkHPfQbKZf2

