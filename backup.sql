--
-- PostgreSQL database dump
--

\restrict gCvBWLmEeHoZ4pA6eXC7BXWnuT1Y0Et9N9GfoyAp3uzYKGL9FwDSQuQIXVvCRrz

-- Dumped from database version 17.9
-- Dumped by pg_dump version 17.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: artikel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artikel (
    id integer NOT NULL,
    slug character varying(200) NOT NULL,
    judul character varying(300) NOT NULL,
    author character varying(150) NOT NULL,
    author_initial character varying(10),
    author_role character varying(150),
    daerah character varying(150),
    excerpt text,
    content text,
    menit_baca integer,
    badge character varying(100),
    image_color character varying(50),
    diterbitkan boolean,
    kategori_id integer,
    komunitas_id integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.artikel OWNER TO postgres;

--
-- Name: artikel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artikel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artikel_id_seq OWNER TO postgres;

--
-- Name: artikel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artikel_id_seq OWNED BY public.artikel.id;


--
-- Name: kategori; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kategori (
    id integer NOT NULL,
    slug character varying(100) NOT NULL,
    nama character varying(150) NOT NULL,
    deskripsi text,
    warna character varying(50),
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.kategori OWNER TO postgres;

--
-- Name: kategori_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kategori_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kategori_id_seq OWNER TO postgres;

--
-- Name: kategori_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kategori_id_seq OWNED BY public.kategori.id;


--
-- Name: komunitas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.komunitas (
    id integer NOT NULL,
    slug character varying(150) NOT NULL,
    nama character varying(200) NOT NULL,
    deskripsi text,
    jumlah_anggota integer,
    link_whatsapp character varying(500),
    warna character varying(50),
    rules text,
    moderator character varying,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.komunitas OWNER TO postgres;

--
-- Name: komunitas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.komunitas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.komunitas_id_seq OWNER TO postgres;

--
-- Name: komunitas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.komunitas_id_seq OWNED BY public.komunitas.id;


--
-- Name: submission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.submission (
    id integer NOT NULL,
    tipe character varying(50),
    penulis_nama character varying(150) NOT NULL,
    penulis_daerah character varying(150),
    judul character varying(300) NOT NULL,
    konten text NOT NULL,
    kategori character varying(150),
    status character varying(50),
    catatan_kurator text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.submission OWNER TO postgres;

--
-- Name: submission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.submission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.submission_id_seq OWNER TO postgres;

--
-- Name: submission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.submission_id_seq OWNED BY public.submission.id;


--
-- Name: artikel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artikel ALTER COLUMN id SET DEFAULT nextval('public.artikel_id_seq'::regclass);


--
-- Name: kategori id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategori ALTER COLUMN id SET DEFAULT nextval('public.kategori_id_seq'::regclass);


--
-- Name: komunitas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komunitas ALTER COLUMN id SET DEFAULT nextval('public.komunitas_id_seq'::regclass);


--
-- Name: submission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submission ALTER COLUMN id SET DEFAULT nextval('public.submission_id_seq'::regclass);


--
-- Data for Name: artikel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artikel (id, slug, judul, author, author_initial, author_role, daerah, excerpt, content, menit_baca, badge, image_color, diterbitkan, kategori_id, komunitas_id, created_at) FROM stdin;
1	pewarna-alami-tenun-endek	Pewarna Alami untuk Tenun Endek: Dari Indigo sampai Soga	Ibu Ayu Kartini	A	Pengrajin Tenun	Sidemen, Karangasem	Dulu, sebelum pewarna kimia masuk ke desa kami, semua benang tenun endek diwarnai dengan tumbuhan dari kebun sendiri...	Dulu, sebelum pewarna kimia masuk ke desa kami, semua benang tenun endek diwarnai dengan tumbuhan dari kebun sendiri. Saya belajar dari ibu saya, dan ibu saya belajar dari neneknya. Pengetahuan ini hampir hilang ketika generasi muda lebih memilih pewarna sintetis yang lebih cepat.\n\n## Indigo: si biru yang sabar\n\nIndigo dari daun tarum membutuhkan waktu fermentasi tujuh sampai sepuluh hari. Banyak yang menyerah karena prosesnya lama, tapi warna birunya tidak tertandingi pewarna sintetis manapun. Kami menggunakan kapur sirih sebagai pengikat, dengan perbandingan satu banding lima dari berat daun.\n\n> "Pewarna alami itu mengajarkan kita sabar — sama seperti budaya kita."\n\nSoga dari kulit kayu mahoni memberikan warna cokelat hangat yang khas pada motif Patra. Untuk takaran satu meter kain, kami biasanya menggunakan dua kilogram kulit kayu yang sudah dikeringkan selama dua minggu di bawah matahari pagi.\n\n## Mengapa pewarna alami penting hari ini\n\nPasar internasional, terutama Eropa dan Jepang, kini lebih menghargai produk dengan pewarna alami karena ramah lingkungan. Endek dengan pewarna alami bisa dijual 2-3 kali lipat dibanding pewarna sintetis di pasar Etsy. Ini bukan hanya soal melestarikan tradisi, tapi juga peluang ekonomi yang nyata.	5	Teknik & Bahan	green	t	\N	\N	2026-05-10 00:44:27.373194+07
2	patung-kayu-pertama-ekspor-jepang	Patung Kayu Pertama yang Dikirim ke Jepang	Pak Wayan Sudana	W	Pengrajin Ukir Kayu	Mas, Gianyar	Cerita ekspor pertama patung kayu Bali ke kolektor di Kyoto — dari kemasan yang hancur hingga dokumen fumigasi.	Tahun 2019, saya menerima email dari seorang kolektor di Kyoto. Dia melihat foto patung Garuda saya di Instagram dan menanyakan harga pengiriman ke Jepang. Saat itu saya tidak tahu apa-apa soal ekspor, tidak tahu bea cukai, tidak tahu dokumen, tidak tahu cara mengemas supaya patung tidak retak di perjalanan.\n\n## Pelajaran pertama: kemasan itu segalanya\n\nPatung kayu pertama yang saya kirim hancur di bagian sayapnya. Saya mengemas dengan kardus biasa dan bubble wrap tipis. Setelah itu saya belajar bahwa kayu perlu ruang untuk bernapas — terlalu rapat malah bikin retak karena perubahan suhu dan kelembaban di dalam kargo pesawat.\n\n> "Ekspor pertama itu mahal — tapi pelajarannya tidak ternilai."\n\nSekarang saya menggunakan peti kayu custom dengan foam EVA di setiap sisi, dan selalu menyertakan silica gel untuk mengontrol kelembaban. Biaya kemasan naik tiga kali lipat, tapi tidak ada lagi keluhan kerusakan.\n\n## Dokumen yang wajib disiapkan\n\nUntuk ekspor ke Jepang, dokumen yang paling penting adalah Certificate of Origin dari Dinas Perdagangan dan invoice dalam bahasa Inggris. Jepang juga mensyaratkan fumigasi untuk produk kayu. Sertifikat fumigasi bisa didapat dari jasa pengiriman internasional besar seperti DHL atau Fedex.\n\n## Harga yang adil\n\nKesalahan terbesar pengrajin baru adalah menjual terlalu murah karena takut tidak laku. Kolektor internasional justru curiga dengan harga terlalu rendah — mereka mengira kualitasnya buruk. Hitung biaya bahan, waktu pengerjaan, kemasan, dan pengiriman, lalu tambah margin 40 persen. Itu harga yang adil untuk kedua pihak.	1	Pasar & Bisnis	terracotta	t	\N	\N	2026-05-10 06:40:49.055381+07
3	mencari-rekan-desain-untuk-koleksi-perak-modern	Mencari Rekan Desain untuk Koleksi Perak Modern	Made Karya	M	Pengrajin	Celu, Gianyar	Saya pengrajin perak generasi ketiga di Celuk. Kakek saya membuat perhiasan untuk upacara adat, ayah saya mulai menjual ...	Saya pengrajin perak generasi ketiga di Celuk. Kakek saya membuat perhiasan untuk upacara adat, ayah saya mulai menjual ke turis, dan saya ingin membawa perak Celuk ke pasar yang lebih luas, tapi saya butuh bantuan di bagian desain. Masalah yang saya hadapi. Teknik filigree dan granulasi yang saya kuasai sangat kuat secara tradisional, tapi desain produk saya masih terasa "kuno" menurut buyer dari Jakarta dan Singapura. Mereka suka craftsmanship-nya tapi merasa desainnya kurang cocok untuk gaya hidup urban modern. "Saya bisa membuat apa yang digambar. Yang saya butuhkan adalah orang yang bisa menggambar masa depan perak Celuk. "Saya mencari desainer produk atau desainer perhiasan yang mau berkolaborasi. Bukan menjual desain, tapi benar-benar jadi mitra — kamu desain, saya produksi, keuntungan dibagi. Saya terbuka untuk model bagi hasil atau retainer bulanan. Apa yang saya tawarkan. Akses ke teknik tradisional yang sudah diwariskan tiga generasi, workshop di Celuk yang bisa dikunjungi, dan jaringan pembeli yang sudah ada di Bali, Jakarta, dan beberapa buyer dari Australia. Produk pertama bisa selesai dalam dua minggu setelah desain disetujui. Hubungi saya kalau kamu desainer atau tahu seseorang yang cocok, silakan bergabung di komunitas Kolaborasi Kriya di bawah atau kirim pesan langsung. Saya serius mencari mitra jangka panjang, bukan proyek satu kali.	1	Teknik & Bahan	green	t	\N	\N	2026-05-10 06:44:29.934385+07
\.


--
-- Data for Name: kategori; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kategori (id, slug, nama, deskripsi, warna, created_at) FROM stdin;
\.


--
-- Data for Name: komunitas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.komunitas (id, slug, nama, deskripsi, jumlah_anggota, link_whatsapp, warna, rules, moderator, created_at) FROM stdin;
\.


--
-- Data for Name: submission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.submission (id, tipe, penulis_nama, penulis_daerah, judul, konten, kategori, status, catatan_kurator, created_at) FROM stdin;
2	\N	string	string	string	string	string	pending	\N	2026-05-10 06:27:15.943401+07
1	story	Pak Wayan Sudana	Mas, Gianyar	Patung Kayu Pertama yang Dikirim ke Jepang	Tahun 2019, saya menerima email dari seorang kolektor di Kyoto. Dia melihat foto patung Garuda saya di Instagram dan menanyakan harga pengiriman ke Jepang. Saat itu saya tidak tahu apa-apa soal ekspor, tidak tahu bea cukai, tidak tahu dokumen, tidak tahu cara mengemas supaya patung tidak retak di perjalanan. Pelajaran pertama: kemasan itu segalanya\\n\\nPatung kayu pertama yang saya kirim hancur di bagian sayapnya. Saya mengemas dengan kardus biasa dan bubble wrap tipis. Setelah itu saya belajar bahwa kayu perlu ruang untuk bernapas — terlalu rapat malah bikin retak karena perubahan suhu dan kelembaban di dalam kargo pesawat. "Ekspor pertama itu mahal — tapi pelajarannya tidak ternilai. "Sekarang saya menggunakan peti kayu custom dengan foam EVA di setiap sisi, dan selalu menyertakan silica gel untuk mengontrol kelembaban. Biaya kemasan naik tiga kali lipat, tapi tidak ada lagi keluhan kerusakan. Dokumen yang wajib disiapkan untuk ekspor ke Jepang, dokumen yang paling penting adalah Certificate of Origin dari Dinas Perdagangan dan invoice dalam bahasa Inggris. Jepang juga mensyaratkan fumigasi untuk produk kayu. Sertifikat fumigasi bisa didapat dari jasa pengiriman internasional besar seperti DHL atau Fedex. Harga yang adil\\n\\nKesalahan terbesar pengrajin baru adalah menjual terlalu murah karena takut tidak laku. Kolektor internasional justru curiga dengan harga terlalu rendah. Mereka mengira kualitasnya buruk. Hitung biaya bahan, waktu pengerjaan, kemasan, dan pengiriman, lalu tambah margin 40 persen. Itu harga yang adil untuk kedua pihak.	pasar	approved	null	2026-05-10 00:49:20.030717+07
3	\N	string	string	string	string	string	pending	\N	2026-05-10 06:40:33.725678+07
4	story	Made Karya	Celu, Gianyar	Mencari Rekan Desain untuk Koleksi Perak Modern	Saya pengrajin perak generasi ketiga di Celuk. Kakek saya membuat perhiasan untuk upacara adat, ayah saya mulai menjual ke turis, dan saya ingin membawa perak Celuk ke pasar yang lebih luas, tapi saya butuh bantuan di bagian desain. Masalah yang saya hadapi. Teknik filigree dan granulasi yang saya kuasai sangat kuat secara tradisional, tapi desain produk saya masih terasa "kuno" menurut buyer dari Jakarta dan Singapura. Mereka suka craftsmanship-nya tapi merasa desainnya kurang cocok untuk gaya hidup urban modern. "Saya bisa membuat apa yang digambar. Yang saya butuhkan adalah orang yang bisa menggambar masa depan perak Celuk. "Saya mencari desainer produk atau desainer perhiasan yang mau berkolaborasi. Bukan menjual desain, tapi benar-benar jadi mitra — kamu desain, saya produksi, keuntungan dibagi. Saya terbuka untuk model bagi hasil atau retainer bulanan. Apa yang saya tawarkan. Akses ke teknik tradisional yang sudah diwariskan tiga generasi, workshop di Celuk yang bisa dikunjungi, dan jaringan pembeli yang sudah ada di Bali, Jakarta, dan beberapa buyer dari Australia. Produk pertama bisa selesai dalam dua minggu setelah desain disetujui. Hubungi saya kalau kamu desainer atau tahu seseorang yang cocok, silakan bergabung di komunitas Kolaborasi Kriya di bawah atau kirim pesan langsung. Saya serius mencari mitra jangka panjang, bukan proyek satu kali.	kolaborasi	approved	\N	2026-05-10 06:44:04.415451+07
\.


--
-- Name: artikel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artikel_id_seq', 3, true);


--
-- Name: kategori_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kategori_id_seq', 1, false);


--
-- Name: komunitas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.komunitas_id_seq', 1, false);


--
-- Name: submission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.submission_id_seq', 4, true);


--
-- Name: artikel artikel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artikel
    ADD CONSTRAINT artikel_pkey PRIMARY KEY (id);


--
-- Name: kategori kategori_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategori
    ADD CONSTRAINT kategori_pkey PRIMARY KEY (id);


--
-- Name: komunitas komunitas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komunitas
    ADD CONSTRAINT komunitas_pkey PRIMARY KEY (id);


--
-- Name: submission submission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submission
    ADD CONSTRAINT submission_pkey PRIMARY KEY (id);


--
-- Name: ix_artikel_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_artikel_id ON public.artikel USING btree (id);


--
-- Name: ix_artikel_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_artikel_slug ON public.artikel USING btree (slug);


--
-- Name: ix_kategori_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_kategori_id ON public.kategori USING btree (id);


--
-- Name: ix_kategori_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_kategori_slug ON public.kategori USING btree (slug);


--
-- Name: ix_komunitas_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_komunitas_id ON public.komunitas USING btree (id);


--
-- Name: ix_komunitas_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_komunitas_slug ON public.komunitas USING btree (slug);


--
-- Name: ix_submission_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_submission_id ON public.submission USING btree (id);


--
-- Name: artikel artikel_kategori_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artikel
    ADD CONSTRAINT artikel_kategori_id_fkey FOREIGN KEY (kategori_id) REFERENCES public.kategori(id);


--
-- Name: artikel artikel_komunitas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artikel
    ADD CONSTRAINT artikel_komunitas_id_fkey FOREIGN KEY (komunitas_id) REFERENCES public.komunitas(id);


--
-- PostgreSQL database dump complete
--

\unrestrict gCvBWLmEeHoZ4pA6eXC7BXWnuT1Y0Et9N9GfoyAp3uzYKGL9FwDSQuQIXVvCRrz

