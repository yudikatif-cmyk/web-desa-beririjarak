// assets/js/app.js

// =========================================================
// HELPER FOTO, CADANGAN CITRA SATELIT & TAUTAN GOOGLE MAPS
// =========================================================
function getGoogleMapsSatelit(lat, lng, zoom = 19) {
    const n = Math.pow(2, zoom);
    const x = Math.floor(((lng + 180) / 360) * n);
    const latRad = (lat * Math.PI) / 180;
    const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
    return `https://mt1.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${zoom}`;
}

function getGoogleMapsLink(lat, lng, nama = "") {
    const query = nama ? encodeURIComponent(`${nama} Beririjarak`) : `${lat},${lng}`;
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function parseFotoGoogleMaps(inputUrl) {
    if (!inputUrl || typeof inputUrl !== "string") return "";
    const trimmed = inputUrl.trim();
    if (!trimmed) return "";

    // Otomatis ekstrak link foto jika yang ditempel adalah URL panjang Google Maps (!6shttps...)
    const match = trimmed.match(/!6s(https[^!]+)/);
    if (match && match[1]) {
        const decoded = decodeURIComponent(match[1]);
        return decoded.replace(/=w\d+-h\d+[^&]*/, "=w800-h600-k-no");
    }
    return trimmed;
}

// =========================================================
// 1. DATA SEBARAN LOKASI
//    Anda bisa menempelkan langsung URL panjang dari address bar Google Maps
//    saat foto terbuka, atau link langsung (lh3.googleusercontent.com/...)
// =========================================================
const desaPotensi = [
    // --- FASILITAS PEMERINTAHAN & UMUM ---
    {
        nama: "Kantor Desa Beririjarak",
        kategori: "Fasilitas Publik",
        lat: -8.5231756,
        lng: 116.5336836,
        deskripsi: "Pusat pelayanan administrasi masyarakat Desa Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcc_wAd4zPnX-TOrizsqNrfPmlindiK8dHECkP20HnYZFb4Nfz2znl99hKI1cC7IgPvJQK6JcHUrS0QC7j91xNi6M9GzvXjamRRzy7aY3VLAZRvlfvd5xPXPDyU7mEHu7wFrwA=w408-h274-k-no", // <-- Tempel link foto Google Maps Kantor Desa di sini
        iconFa: "fa-building-columns",
        colorBg: "bg-blue-600",
        colorText: "text-blue-600",
        colorBadge: "bg-blue-100",
        isUtama: true
    },
    {
        nama: "Pasar Jineng Desa Beririjarak",
        kategori: "Fasilitas Publik",
        lat: -8.5226113,
        lng: 116.5408511,
        deskripsi: "Pusat perbelanjaan dan pasar tradisional warga Desa Beririjarak.",
        foto: "", // <-- Tempel link foto Google Maps Pasar Jineng di sini
        iconFa: "fa-store",
        colorBg: "bg-orange-500",
        colorText: "text-orange-500",
        colorBadge: "bg-orange-100"
    },

    // --- FASILITAS PENDIDIKAN ---
    {
        nama: "MAN 2 Lombok Timur",
        kategori: "Pendidikan",
        lat: -8.524340075273223,
        lng: 116.53413286538598,
        deskripsi: "Madrasah Aliyah Negeri 2 Lombok Timur — Beririjarak, Kec. Wanasaba (mandualotim.sch.id).",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcP-M0SGnDWEJu_H-Y5s-G9O02XrpkJLvSOORZWBSmMAo-hhbWMjuO_IBEkTBSJswvygJxKDV0ZuAXVzM7NEBrB_jzOcSJXSjsZBknXIugBKzuzQpnsjdJYj1YB0VcdPCWFdxM4SEzyibi5=w800-h600-k-no",
        iconFa: "fa-school",
        colorBg: "bg-red-500",
        colorText: "text-red-500",
        colorBadge: "bg-red-100"
    },
    {
        nama: "MIS NW 2 Beririjarak",
        kategori: "Pendidikan",
        lat: -8.5250132558081,
        lng: 116.53511785704865,
        deskripsi: "Madrasah Ibtidaiyah Swasta NW 2 Beririjarak.",
        foto: "https://www.google.com/maps/place/MTSN+Wanasaba/@-8.5252513,116.5350611,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICHuIKCUw!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FAABkmLfmWVScFKWHx2VTas0rQexP5XdmaKvS-C4xUp_08pXqHfbv1GYtnp30UEeme86Iy7VA7oGWNIO5z-aKSjsh8BVWf55FfbP8HHTF1eEX4643szYfKvNPDN22LVnTFUvtoYas-cnV%3Dw114-h86-k-no!7i4000!8i3000!4m18!1m10!4m9!1m4!2m2!1d116.5300043!2d-8.5225225!4e1!1m3!2m2!1d116.5351179!2d-8.5250133!3m6!1s0x2dcc3667d7c68aa1:0x250e5d8018c95218!8m2!3d-8.5252513!4d116.5350611!10e5!16s%2Fg%2F11cs5vmrqk?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D#",
        iconFa: "fa-school",
        colorBg: "bg-red-500",
        colorText: "text-red-500",
        colorBadge: "bg-red-100"
    },
    {
        nama: "SDN 1 Beririjarak",
        kategori: "Pendidikan",
        lat: -8.526578009543925,
        lng: 116.53748253870765,
        deskripsi: "Sekolah Dasar Negeri 1 Beririjarak.",
        foto: "https://www.google.com/maps/place/SDN+1+BERIRIJARAK,+Desa+Beririjarak/@-8.5265395,116.5374673,459a,75y,160.67h,90t/data=!3m7!1e1!3m5!1sr070BFEaWEZhvyK0EjQx2g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.clients6.google.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3Dr070BFEaWEZhvyK0EjQx2g%26yaw%3D160.67363!7i16384!8i8192!4m15!1m7!3m6!1s0x2dcc36429e8a14b9:0x2261b1e549b70713!2sSDN+1+BERIRIJARAK,+Desa+Beririjarak!8m2!3d-8.5266629!4d116.537504!16s%2Fg%2F11dxb3cht2!3m6!1s0x2dcc36429e8a14b9:0x2261b1e549b70713!8m2!3d-8.5266629!4d116.537504!10e5!16s%2Fg%2F11dxb3cht2?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D#",
        iconFa: "fa-school",
        colorBg: "bg-red-500",
        colorText: "text-red-500",
        colorBadge: "bg-red-100"
    },
    {
        nama: "SDN 2 Beririjarak",
        kategori: "Pendidikan",
        lat: -8.518290644839052,
        lng: 116.54047020987183,
        deskripsi: "Sekolah Dasar Negeri 3 Beririjarak.",
        foto: "",
        iconFa: "fa-school",
        colorBg: "bg-red-500",
        colorText: "text-red-500",
        colorBadge: "bg-red-100"
    },
    {
        nama: "SDN 3 Beririjarak",
        kategori: "Pendidikan",
        lat: -8.5253592835007,
        lng: 116.53928575772458,
        deskripsi: "Sekolah Dasar Negeri 3 Beririjarak.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=yS-4yebUiaszQlASTyA_IA&cb_client=search.gws-prod.grass&w=408&h=240&yaw=319.5212&pitch=0&thumbfov=100",
        iconFa: "fa-school",
        colorBg: "bg-red-500",
        colorText: "text-red-500",
        colorBadge: "bg-red-100"
    },
    {
        nama: "SDN 4 Beririjarak",
        kategori: "Pendidikan",
        lat: -8.514607974130978,
        lng: 116.53113597341125,
        deskripsi: "Sekolah Dasar Negeri 4 Beririjarak.",
        foto: "https://www.google.com/maps/place/SDN+4+BERIRIJARAK/@-8.5131074,116.5331332,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICxz9XH6QE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9R2ws_KN7iPby1B32H7dRJDM1ue-MxtMLkeLVqwQK-nfYS-8_mRaD2veZhiJ7ffH1Ho6yqyWrpguyYTcLZ6xm19hFdLIgQD1mf5Vd5sd8S2rkNMD47Fvl9EPvoX1SXJhZE2rB9IOA%3Dw203-h270-k-no!7i3468!8i4624!4m7!3m6!1s0x2dcc3689f659e171:0x6f1ec945be766ee4!8m2!3d-8.5146551!4d116.5311234!10e5!16s%2Fg%2F11dxnp4njc?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D#",
        iconFa: "fa-school",
        colorBg: "bg-red-500",
        colorText: "text-red-500",
        colorBadge: "bg-red-100"
    },

    // --- FASILITAS IBADAH ---
    {
        nama: "Masjid Syarul Islam At Toyyibi",
        kategori: "Tempat Ibadah",
        lat: -8.525702795110726,
        lng: 116.53789117308744,
        deskripsi: "Masjid utama di area Beririjarak.",
        foto: "https://www.google.com/maps/place/Masjid+Syiarul+Islam+Attoyyibi+Beririjarak/@-8.525929,116.5378221,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhAGbzzgiSCVIGfapqMADU93!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9T-Id4ghHj_AH3AtaRxdMslSPYlfEYNrTtMD5K34gUapUbOZChHHTadqDBbk7pA7UY50FNz8h02mpxTDsqJRqPqWLJ_fAEzub4ZRz79pI624oF4QQMm78aTscAeedLimPrnRA4LftTsueGm%3Dw203-h270-k-no!7i3000!8i4000!4m18!1m10!4m9!1m4!2m2!1d116.5300043!2d-8.5225225!4e1!1m3!2m2!1d116.5378912!2d-8.5257028!3m6!1s0x2dcc3642a5139c65:0x2473b442bc2ef37d!8m2!3d-8.5258888!4d116.5379164!10e5!16s%2Fg%2F11c719_2wp?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D#",
        iconFa: "fa-mosque",
        colorBg: "bg-yellow-500",
        colorText: "text-yellow-600",
        colorBadge: "bg-yellow-100"
    },
    {
        nama: "Mushola Nurul Huda",
        kategori: "Tempat Ibadah",
        lat: -8.5256657920681,
        lng: 116.53578616498265,
        deskripsi: "Tempat ibadah masyarakat sekitar.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=7Bn8boCZPLqMV3a0r3MxUg&cb_client=search.gws-prod.grass&w=408&h=240&yaw=34.145638&pitch=0&thumbfov=100",
        iconFa: "fa-mosque",
        colorBg: "bg-yellow-500",
        colorText: "text-yellow-600",
        colorBadge: "bg-yellow-100"
    },
    {
        nama: "Mushola Al-Mahdi",
        kategori: "Tempat Ibadah",
        lat: -8.526308875068551,
        lng: 116.53596143701246,
        deskripsi: "Tempat ibadah masyarakat sekitar.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLehfu7h0jdttkWK41U8Ya-UanmAJc7VV9SOpzHYjFgxU_oRGZai1Y3col_TrYXUQ_JQrqVKqaYgnPOtLONQgBAK_ycZnwUFyWnAxYHS_lloO9FmFftnz1KD3i5Meqb0qQ61rcNF=w408-h269-k-no",
        iconFa: "fa-mosque",
        colorBg: "bg-yellow-500",
        colorText: "text-yellow-600",
        colorBadge: "bg-yellow-100"
    },
    {
        nama: "Masjid Ihsan Paok Dangka",
        kategori: "Tempat Ibadah",
        lat: -8.53056,
        lng: 116.54821,
        deskripsi: "Tempat ibadah masyarakat Paok Dangka.",
        foto: "",
        iconFa: "fa-mosque",
        colorBg: "bg-yellow-500",
        colorText: "text-yellow-600",
        colorBadge: "bg-yellow-100"
    },

    // --- POTENSI (UMKM & PERTANIAN) ---
    {
        nama: "produksi jamur tiram hasanuddin",
        kategori: "Pertanian",
        lat: -8.524263368781503,
        lng: 116.53571605299996,
        deskripsi: "Usaha budidaya jamur.",
        foto: "",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-600",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "produksi jamur timur balqis guru mijan",
        kategori: "Pertanian",
        lat: -8.526038643932518,
        lng: 116.53512732970037,
        deskripsi: "Usaha budidaya dan produksi jamur.",
        foto: "",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "budidaya jamur tiram syaqina beririjarak",
        kategori: "Pertanian",
        lat: -8.526222450492341,
        lng: 116.53640076726418,
        deskripsi: "Usaha budidaya jamur.",
        foto: "",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "produksi jamur tiram M.rusriadi",
        kategori: "Pertanian",
        lat: -8.524631215774207,
        lng: 116.5396769083739,
        deskripsi: "Usaha budidaya jamur.",
        foto: "",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "pusat jajanan tradisional inaq se'ah",
        kategori: "Ekonomi & UMKM",
        lat: -8.525918833817938,
        lng: 116.53538534924408,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "pusat kerajinan tas inaq dela",
        kategori: "Ekonomi & UMKM",
        lat: -8.525874638297198,
        lng: 116.53645017696905,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "Mima es teh series beririrjarak",
        kategori: "Ekonomi & UMKM",
        lat: -8.52648607904872,
        lng: 116.53737867766597,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcq9eEwjQMnTWqaNtQ0DYlVJFzOiu_UKm-wYJ6DTitjCvKnmQ_QYcuwZ0FlQZo89X374qj4uS6xTHau-hFdTblNFmUqRDbkNqDlPAImpM3UChXM_DHY2w4J8eXFLD3pQiBtMDf1=w408-h884-k-no",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "pembibitan coklat (kakao)",
        kategori: "Pertanian",
        lat: -8.525153265766614,
        lng: 116.53720909801065,
        deskripsi: "Penyedia bibit serta coklat.",
        foto: "",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "alifa collection",
        kategori: "Ekonomi & UMKM",
        lat: -8.527128796047172,
        lng: 116.5360214695394,
        deskripsi: "Usaha Fashion.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=jZRrMC93zMwR62stOz1stQ&cb_client=search.gws-prod.grass&w=408&h=240&yaw=319.88928&pitch=0&thumbfov=100",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "dapur kopi raut bongkot",
        kategori: "Ekonomi & UMKM",
        lat: -8.5269842077449,
        lng: 116.5363893388037,
        deskripsi: "Usaha kopi warga.",
        foto: "",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "yuland cake",
        kategori: "Ekonomi & UMKM",
        lat: -8.524768734938496,
        lng: 116.53607099040849,
        deskripsi: "Usaha warga lokal.",
        foto: "",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "bale jahit ibu tomi",
        kategori: "Ekonomi & UMKM",
        lat: -8.524817563752713,
        lng: 116.53976200568047,
        deskripsi: "Usaha jasa jahit.",
        foto: "",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "kios latisya",
        kategori: "Ekonomi & UMKM",
        lat: -8.526767099041614,
        lng: 116.53617558481446,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://www.google.com/maps/place/KIOS+LATISYA/@-8.5267974,116.5361789,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICzl6F2!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FAABkmLfqbEL4-fv8pUfsxP2dYyQ6W0sfNH_9pRVgMYDuay1JcY1YC3fhOmeU1GI5zxHmtfdttI-SJhZ8xzctcJMFfIDMNc_pnq2YSOrtnkeUo1Adn98QPz83k9Pi64hXRu2tw-lIGw%3Dw152-h86-k-no!7i1920!8i1080!4m18!1m10!4m9!1m4!2m2!1d116.5300043!2d-8.5225225!4e1!1m3!2m2!1d116.5361756!2d-8.5267671!3m6!1s0x2dcc370056e3bb1b:0x35d32c19ccccfa80!8m2!3d-8.5267974!4d116.5361789!10e5!16s%2Fg%2F11vy563g36?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D#",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "habibah olshop",
        kategori: "Ekonomi & UMKM",
        lat: -8.522821573836707,
        lng: 116.54088863051471,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcOnOiZX8oL4SGpKpjPiVx17HOqfLRvJVfenbTCkDf8ytmyUxCHfVqsHJNNeo_Fn6zadBnxNlnGt9BdryNn_abTWANZrqIeG24JHrn_eZkYqRCyaOf6Qvy1uhjjliy0_KwXq4pc=w408-h306-k-no",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "es batu kristal jineng",
        kategori: "Ekonomi & UMKM",
        lat: -8.521322588748879,
        lng: 116.54167181935843,
        deskripsi: "Usaha produksi es batu.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=DkA7zK7UbJhsxdci8YnAFA&cb_client=search.gws-prod.grass&w=408&h=240&yaw=78.734474&pitch=0&thumbfov=100",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "kios mager paman antok",
        kategori: "Ekonomi & UMKM",
        lat: -8.52016298509199,
        lng: 116.54106337239601,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLddfmGxzWF7shbzxBpq7YgAklyRFanRkN0WsLPKPji_XgeFX8PkqsvUvYls3DwGdLJvroRV73yiFyxTBBv76I-MYnDz5nmTa7Zg8ur8dfjVpUoLIXn1zOKCygOWXYbCXhKlIcA=w426-h240-k-no",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "haura shop",
        kategori: "Ekonomi & UMKM",
        lat: -8.517974244281964,
        lng: 116.5384395712225,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "oke jamur lombok",
        kategori: "Ekonomi & UMKM",
        lat: -8.513366424155585,
        lng: 116.53629065081824,
        deskripsi: "Usaha jamur lokal.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLci4XoB_g3rIJr2x_npGQWl3_aYFE3KCs-A40krkFrdoh3ek7gos-AwFlByHLBCT-xKiBvEafb-ToZ4soiJuMusPa1dNgaCJJrraJVBAUmjvZqgkG_sA7f7ZQQWHIaDOrCaJEQ=w428-h240-k-no",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "sapu lidi oke",
        kategori: "Ekonomi & UMKM",
        lat: -8.512495510081926,
        lng: 116.53566994563198,
        deskripsi: "Usaha kerajinan sapu lidi.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLdLK0Edja_8lft0wXuQE7Hw5YM5aOxjUpkUDKlgTcNKIjHCA9LCetNuJpnGGxtzBJJ6WvZ05DpWMHUbVkSIB9tOg24KXmY7UUFNSAg6zIt7hKZNqj-vWpZmrvZLLy_uNnuVqOT3kw=w408-h906-k-no",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "kios inaq wan",
        kategori: "Ekonomi & UMKM",
        lat: -8.51187165539544,
        lng: 116.53449869435251,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLczrNp8bi9XmoGnGOp2E7p_sXLd6SHE2tsTHvkIM3qA7BniEyyJ8dQUOnc901Y_mSGTRjSELmhcAIwUd27NjYWcaKTbungzOS0sRXIS_4ni_IGPfCkkQlFMYHgGMPLVvrnCCvT1=w408-h244-k-no",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "rumah produksi tape singkong inaq tia",
        kategori: "Ekonomi & UMKM",
        lat: -8.512154653461522,
        lng: 116.53379176612071,
        deskripsi: "Usaha kuliner tape singkong.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=eyDDWpSAMrkVpVmNnC1rMg&cb_client=search.gws-prod.grass&w=408&h=240&yaw=319.2268&pitch=0&thumbfov=100",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "kios putra putri",
        kategori: "Ekonomi & UMKM",
        lat: -8.516239153486488,
        lng: 116.53066335652122,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLfb8Xe0xl26qt8JwUM5aJZBZa7Do80dLXHf_g8oX8egk6vb8pJ0GC4bGfhb-E4l2I2ufOfJDIvpL0vszmRZ7sis_b-2SljKKbDNXPhzdrIteA5-f2jahUUM3s6KAVMx0zO89Mh1_Z6FF26y=w408-h544-k-no",
        iconFa: "fa-store",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    }
];

// Normalisasi otomatis agar peta.html & fasilitas.html selalu mendapat URL foto yang valid
desaPotensi.forEach(item => {
    const fotoParsed = parseFotoGoogleMaps(item.foto);
    item.foto = fotoParsed !== "" ? fotoParsed : getGoogleMapsSatelit(item.lat, item.lng, 19);
    item.googleMapsUrl = getGoogleMapsLink(item.lat, item.lng, item.nama);
});

// =========================================================
// 2. LOGIKA PETA (Hanya berjalan jika elemen <div id="map"> ada di halaman)
// =========================================================
if (document.getElementById('map')) {

    // Suntikkan gaya animasi halus untuk marker utama, pengalih gaya peta, & perbaikan gambar popup
    const mapCustomStyle = document.createElement('style');
    mapCustomStyle.textContent = `
        @keyframes pulseRingDesa {
            0% { transform: scale(0.95); opacity: 0.75; }
            70% { transform: scale(1.65); opacity: 0; }
            100% { transform: scale(1.65); opacity: 0; }
        }
        .marker-pulse-ring {
            position: absolute;
            inset: -4px;
            border-radius: 9999px;
            border: 2px solid #3b82f6;
            animation: pulseRingDesa 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
            pointer-events: none;
        }
        .map-style-btn {
            transition: all 0.2s ease;
        }
        .map-style-btn.active {
            background-color: #022c22;
            color: #ffffff;
            box-shadow: 0 2px 6px rgba(2, 44, 34, 0.25);
        }
        .wi-card-img-container {
            position: relative;
            width: 100%;
            height: 155px;
            overflow: hidden;
            background: #022c22;
        }
        .wi-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .wi-card-body img {
            display: none !important;
        }
    `;
    document.head.appendChild(mapCustomStyle);

    // Inisialisasi Peta
    const map = L.map('map', {
        zoomControl: false
    }).setView([-8.5335, 116.5375], 15);

    // Pane khusus agar urutan lapisan masking putih, batas desa, batas dusun, label, dan marker konsisten
    map.createPane('whiteMaskPane');
    map.getPane('whiteMaskPane').style.zIndex = 350;

    map.createPane('batasDesaGlowPane');
    map.getPane('batasDesaGlowPane').style.zIndex = 405;

    map.createPane('batasDesaPane');
    map.getPane('batasDesaPane').style.zIndex = 410;

    map.createPane('batasDusunPane');
    map.getPane('batasDusunPane').style.zIndex = 420;

    // Pindahkan Zoom Control ke pojok kanan bawah
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Pilihan Layer Peta Dasar
    const basemapLayers = {
        satelit: L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; Google Maps'
        }),
        hybrid: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; Google Maps'
        }),
        bersih: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; Google Maps'
        }),
        topografi: L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; Google Maps'
        })
    };

    let currentBasemapKey = 'satelit';
    basemapLayers[currentBasemapKey].addTo(map);

    // Poligon batas luar Desa Beririjarak [lat, lng] selaras dengan data/batas_desa.geojson
    const batasDesaCustom = [
        [-8.5226, 116.5314],
        [-8.5212, 116.5346],
        [-8.5218, 116.5396],
        [-8.5242, 116.5424],
        [-8.5282, 116.5424],
        [-8.5325, 116.5432],
        [-8.5356, 116.5436],
        [-8.5375, 116.5434],
        [-8.5416, 116.5428],
        [-8.5450, 116.5436],
        [-8.5458, 116.5404],
        [-8.5422, 116.5392],
        [-8.5390, 116.5382],
        [-8.5382, 116.5332],
        [-8.5378, 116.5310],
        [-8.5324, 116.5298],
        [-8.5290, 116.5296],
        [-8.5255, 116.5304]
    ];

    // Fungsi Helper: Mengekstrak seluruh ring [lat, lng] dari GeoJSON
    function extractLatLngRingsFromGeoJson(geojson) {
        const rings = [];

        function walkGeometry(geom) {
            if (!geom) return;
            if (geom.type === 'Polygon' && Array.isArray(geom.coordinates)) {
                geom.coordinates.forEach(ring => {
                    rings.push(ring.map(c => [c[1], c[0]]));
                });
            } else if (geom.type === 'MultiPolygon' && Array.isArray(geom.coordinates)) {
                geom.coordinates.forEach(poly => {
                    poly.forEach(ring => {
                        rings.push(ring.map(c => [c[1], c[0]]));
                    });
                });
            } else if (geom.type === 'GeometryCollection' && Array.isArray(geom.geometries)) {
                geom.geometries.forEach(walkGeometry);
            }
        }

        if (!geojson) return rings;
        if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
            geojson.features.forEach(f => walkGeometry(f.geometry));
        } else if (geojson.type === 'Feature') {
            walkGeometry(geojson.geometry);
        } else {
            walkGeometry(geojson);
        }

        return rings;
    }

    let whiteOutsideMaskLayer = null;
    let batasDesaGlowLayer = null;
    let batasDesaOutlineLayer = null;

    function getMaskStyleForBasemap(basemapKey) {
        if (basemapKey === 'bersih' || basemapKey === 'topografi') {
            return { fillColor: '#e2e8f0', fillOpacity: 0.72 };
        }
        return { fillColor: '#f8fafc', fillOpacity: 0.76 };
    }

    function applyWhiteOutsideMask(innerRings) {
        if (whiteOutsideMaskLayer) {
            map.removeLayer(whiteOutsideMaskLayer);
        }

        const outerWorld = [
            [-90, -180],
            [-90, 180],
            [90, 180],
            [90, -180]
        ];

        const maskStyle = getMaskStyleForBasemap(currentBasemapKey);

        whiteOutsideMaskLayer = L.polygon([outerWorld, ...innerRings], {
            pane: 'whiteMaskPane',
            stroke: false,
            fillColor: maskStyle.fillColor,
            fillOpacity: maskStyle.fillOpacity,
            fillRule: 'evenodd',
            interactive: false
        }).addTo(map);
    }

    function renderDesaOutline(rings) {
        if (batasDesaGlowLayer) {
            map.removeLayer(batasDesaGlowLayer);
        }
        if (batasDesaOutlineLayer) {
            map.removeLayer(batasDesaOutlineLayer);
        }

        batasDesaGlowLayer = L.polygon(rings, {
            pane: 'batasDesaGlowPane',
            color: '#fb7185',
            weight: 8,
            opacity: 0.35,
            fill: false,
            interactive: false
        }).addTo(map);

        batasDesaOutlineLayer = L.polygon(rings, {
            pane: 'batasDesaPane',
            color: '#e11d48',
            weight: 3.5,
            dashArray: '8, 6',
            fill: false,
            interactive: false
        }).addTo(map);
    }

    // Filter URL (jika dibuka dengan ?filter=fasilitas atau ?filter=potensi)
    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get('filter');

    let displayedDesaPotensi = desaPotensi;
    if (activeFilter === 'fasilitas') {
        displayedDesaPotensi = desaPotensi.filter(item => ["Fasilitas Publik", "Pendidikan", "Tempat Ibadah"].includes(item.kategori));
    } else if (activeFilter === 'potensi') {
        displayedDesaPotensi = desaPotensi.filter(item => ["Pertanian", "Ekonomi & UMKM"].includes(item.kategori));
    }

    // Tampilkan semua lokasi tersimpan
    displayedDesaPotensi.forEach(item => {
        const pulseHtml = item.isUtama ? '<span class="marker-pulse-ring"></span>' : '';
        const customMarkerHtml = `
            <div class="flex items-center justify-center w-7 h-7 ${item.colorBg} text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.45)] border-[2px] border-white hover:scale-125 transition-transform duration-300 relative z-10">
                ${pulseHtml}
                <i class="fa-solid ${item.iconFa} text-[12px]"></i>
            </div>
        `;

        const customIcon = L.divIcon({
            html: customMarkerHtml,
            className: 'custom-div-icon', 
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -16]
        });

        const satelitCadangan = getGoogleMapsSatelit(item.lat, item.lng, 19);

        const popupContent = `
            <div class="wi-card">
                <div class="wi-card-img-container">
                    <img src="${item.foto}" 
                         class="wi-card-img" 
                         alt="${item.nama}" 
                         referrerpolicy="no-referrer"
                         onerror="if(this.src !== '${satelitCadangan}'){ this.src='${satelitCadangan}'; } else { this.style.display='none'; }">
                    <a href="${item.googleMapsUrl}" target="_blank" rel="noopener noreferrer"
                       class="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors">
                        <i class="fa-brands fa-google text-[#fbbf24]"></i> Foto di Maps
                    </a>
                </div>
                <div class="wi-card-body">
                    <div class="wi-category"><i class="fa-solid ${item.iconFa}"></i> ${item.kategori}</div>
                    <h3 class="wi-title">${item.nama}</h3>
                    <p class="wi-desc">${item.deskripsi}</p>
                    <div class="wi-footer">
                        <div class="wi-coord"><i class="fa-solid fa-location-crosshairs"></i> ${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}</div>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" rel="noopener noreferrer" class="wi-btn-rute">
                            <i class="fa-solid fa-route"></i> Rute
                        </a>
                    </div>
                </div>
            </div>
        `;

        const marker = L.marker([item.lat, item.lng], { icon: customIcon })
            .bindTooltip(item.nama, {
                direction: 'top',
                offset: [0, -16],
                className: 'label-lokasi'
            })
            .bindPopup(popupContent)
            .addTo(map);
            
        item.marker = marker; 
    });

    // Terapkan poligon batasDesaCustom sebagai dasar, lalu sinkronkan dengan data/batas_desa.geojson
    applyWhiteOutsideMask([batasDesaCustom]);
    renderDesaOutline([batasDesaCustom]);

    fetch('data/batas_desa.geojson')
        .then(res => {
            if (!res.ok) throw new Error('GeoJSON not found');
            return res.json();
        })
        .then(data => {
            const rings = extractLatLngRingsFromGeoJson(data);
            if (rings.length > 0) {
                applyWhiteOutsideMask(rings);
                renderDesaOutline(rings);
            }
        })
        .catch(() => {});

    // Fitur Pencarian (Search Bar Logic)
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const keyword = this.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            
            if (keyword === '') {
                searchResults.classList.add('hidden');
                return;
            }

            const filteredData = displayedDesaPotensi.filter(item => 
                item.nama.toLowerCase().includes(keyword) || 
                item.kategori.toLowerCase().includes(keyword)
            );

            if (filteredData.length > 0) {
                searchResults.classList.remove('hidden');
                filteredData.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'px-4 py-3 hover:bg-green-50 cursor-pointer text-sm border-b border-gray-50 flex items-center gap-3 transition-colors';
                    li.innerHTML = `
                        <div class="w-8 h-8 rounded-full ${item.colorBadge} ${item.colorText} flex items-center justify-center shrink-0">
                            <i class="fa-solid ${item.iconFa}"></i>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-800">${item.nama}</span>
                            <span class="text-[10px] text-gray-500 uppercase">${item.kategori}</span>
                        </div>
                    `;
                    
                    li.addEventListener('click', () => {
                        map.flyTo([item.lat, item.lng], 18, {
                            animate: true,
                            duration: 1.5
                        });
                        if (item.marker) item.marker.openPopup();
                        searchResults.classList.add('hidden');
                        searchInput.value = item.nama;
                    });
                    searchResults.appendChild(li);
                });
            } else {
                searchResults.classList.remove('hidden');
                searchResults.innerHTML = '<li class="px-4 py-3 text-sm text-gray-500 italic text-center">Lokasi tidak ditemukan</li>';
            }
        });

        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }

    // Garis Pembagi 9 Dusun
    const garisBatasDusun = [
        [[-8.5220, 116.5326], [-8.5288, 116.5348], [-8.5325, 116.5368]],
        [[-8.5213, 116.5346], [-8.5295, 116.5372], [-8.5318, 116.5384]],
        [[-8.5216, 116.5374], [-8.5292, 116.5392]],
        [[-8.5292, 116.5392], [-8.5282, 116.5424]],
        [[-8.5295, 116.5372], [-8.5318, 116.5408], [-8.5325, 116.5432]],
        [[-8.5292, 116.5392], [-8.5348, 116.5416], [-8.5356, 116.5436]],
        [[-8.5324, 116.5298], [-8.5325, 116.5368]],
        [[-8.5325, 116.5368], [-8.5368, 116.5392], [-8.5396, 116.5404]],
        [[-8.5325, 116.5368], [-8.5362, 116.5415], [-8.5375, 116.5434]],
        [[-8.5396, 116.5404], [-8.5416, 116.5428]]
    ];

    garisBatasDusun.forEach(garis => {
        L.polyline(garis, {
            pane: 'batasDusunPane',
            color: '#fda4af',
            weight: 2,
            dashArray: '5, 5',
            opacity: 0.95,
            interactive: false
        }).addTo(map);
    });

    // Label Nama 9 Dusun & Desa Tetangga
    const daftarLabelWilayah = [
        { nama: "DS. SENGANTON", lat: -8.5295, lng: 116.5318, tipe: "dusun" },
        { nama: "DS. OTAK KEBON BARAT", lat: -8.5270, lng: 116.5344, tipe: "dusun" },
        { nama: "DS. OTAK KEBON", lat: -8.5224, lng: 116.5363, tipe: "dusun" },
        { nama: "DS. OTAK KEBON TIMUR", lat: -8.5248, lng: 116.5406, tipe: "dusun" },
        { nama: "DS. AMBENGAN TIMUR", lat: -8.5314, lng: 116.5398, tipe: "dusun" },
        { nama: "DS. AMBENGAN", lat: -8.5338, lng: 116.5394, tipe: "dusun" },
        { nama: "DS. BERIRIJARAK TIMUR", lat: -8.5356, lng: 116.5405, tipe: "dusun" },
        { nama: "DS. BERIRIJARAK UTARA", lat: -8.5363, lng: 116.5338, tipe: "dusun" },
        { nama: "DS. BERIRIJARAK SELATAN", lat: -8.5438, lng: 116.5418, tipe: "dusun" },

        { nama: "TAMAN NASIONAL GUNUNG RENJANI", lat: -8.5185, lng: 116.5365, tipe: "tetangga" },
        { nama: "DESA KEMBANG KERANG", lat: -8.5315, lng: 116.5245, tipe: "tetangga" },
        { nama: "DESA KARANG BARU UTARA", lat: -8.5425, lng: 116.5335, tipe: "tetangga" },
        { nama: "DESA JENENG", lat: -8.5410, lng: 116.5472, tipe: "tetangga" },
        { nama: "DESA BEBIDAS", lat: -8.5312, lng: 116.5478, tipe: "tetangga" }
    ];

    daftarLabelWilayah.forEach(wil => {
        const classCss = wil.tipe === "dusun" ? "label-dusun" : "label-tetangga";
        L.marker([wil.lat, wil.lng], {
            icon: L.divIcon({
                className: '',
                html: `<span class="${classCss}">${wil.nama}</span>`,
                iconSize: [140, 22],
                iconAnchor: [70, 11]
            }),
            interactive: false,
            zIndexOffset: 1000
        }).addTo(map);
    });

    // Legenda Peta Desa (Pojok Kiri Bawah)
    const legendaPeta = L.control({ position: 'bottomleft' });
    legendaPeta.onAdd = function () {
        const div = L.DomUtil.create('div', 'bg-white/95 backdrop-blur-md px-3.5 py-3 rounded-2xl shadow-lg border border-stone-200 text-[11px] text-stone-700 space-y-1.5 mb-2 ml-2');
        div.innerHTML = `
            <div class="font-bold text-[#022c22] uppercase tracking-wider text-[10px] border-b border-stone-200 pb-1">Legenda Peta Desa</div>
            <div class="flex items-center gap-2">
                <span class="w-4 h-0 border-t-[3px] border-dashed border-[#e11d48] inline-block"></span>
                <span>Batas Desa</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-4 h-0 border-t-2 border-dashed border-[#fda4af] inline-block"></span>
                <span>Batas Dusun</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 rounded-sm bg-[#f8fafc] border border-stone-400 inline-block"></span>
                <span>Bagian Putih di Luar Desa</span>
            </div>
        `;
        return div;
    };
    legendaPeta.addTo(map);

    // Panel Kontrol Kanan Atas: Penunjuk Arah Utara + Pengalih Tampilan Peta
    const topRightControl = L.control({ position: 'topright' });
    topRightControl.onAdd = function () {
        const container = L.DomUtil.create('div', 'flex flex-col items-end gap-2 mt-14 mr-2');
        L.DomEvent.disableClickPropagation(container);

        container.innerHTML = `
            <div class="bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-stone-200 flex flex-col items-center">
                <span class="font-black text-gray-900 text-sm leading-none mb-1">U</span>
                <i class="fa-solid fa-arrow-up-long text-gray-900 text-xl"></i>
            </div>
            <div class="bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-stone-200 flex flex-col gap-1 text-[11px] font-semibold text-stone-700">
                <button type="button" data-basemap="satelit" class="map-style-btn active px-2.5 py-1.5 rounded-xl text-left flex items-center gap-2">
                    <i class="fa-solid fa-satellite w-3.5 text-center"></i> Satelit
                </button>
                <button type="button" data-basemap="hybrid" class="map-style-btn px-2.5 py-1.5 rounded-xl text-left flex items-center gap-2 hover:bg-stone-100">
                    <i class="fa-solid fa-road w-3.5 text-center"></i> Hybrid
                </button>
                <button type="button" data-basemap="bersih" class="map-style-btn px-2.5 py-1.5 rounded-xl text-left flex items-center gap-2 hover:bg-stone-100">
                    <i class="fa-solid fa-map w-3.5 text-center"></i> Peta Bersih
                </button>
                <button type="button" data-basemap="topografi" class="map-style-btn px-2.5 py-1.5 rounded-xl text-left flex items-center gap-2 hover:bg-stone-100">
                    <i class="fa-solid fa-mountain w-3.5 text-center"></i> Topografi
                </button>
            </div>
        `;

        const buttons = container.querySelectorAll('.map-style-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedKey = btn.getAttribute('data-basemap');
                if (!selectedKey || selectedKey === currentBasemapKey) return;

                map.removeLayer(basemapLayers[currentBasemapKey]);
                basemapLayers[selectedKey].addTo(map);
                currentBasemapKey = selectedKey;

                if (whiteOutsideMaskLayer) {
                    whiteOutsideMaskLayer.setStyle(getMaskStyleForBasemap(selectedKey));
                }

                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        return container;
    };
    topRightControl.addTo(map);

} // <-- Penutup blok logika peta