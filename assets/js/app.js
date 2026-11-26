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

    const match = trimmed.match(/!6s(https[^!]+)/);
    if (match && match[1]) {
        const decoded = decodeURIComponent(match[1]);
        return decoded.replace(/=w\d+-h\d+[^&]*/, "=w800-h600-k-no");
    }
    return trimmed;
}

// =========================================================
// 1. DATA SEBARAN LOKASI (44 TITIK TERDATA)
// =========================================================
const desaPotensi = [
    // --- FASILITAS PEMERINTAHAN & UMUM ---
    {
        nama: "Kantor Desa Beririjarak",
        kategori: "Fasilitas Publik",
        lat: -8.5231756,
        lng: 116.5336836,
        deskripsi: "Pusat pelayanan administrasi masyarakat Desa Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcc_wAd4zPnX-TOrizsqNrfPmlindiK8dHECkP20HnYZFb4Nfz2znl99hKI1cC7IgPvJQK6JcHUrS0QC7j91xNi6M9GzvXjamRRzy7aY3VLAZRvlfvd5xPXPDyU7mEHu7wFrwA=w408-h274-k-no",
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
        foto: "",
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
        deskripsi: "Sekolah Dasar Negeri 2 Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLdTOa3sviuw5TVyQ1RR216SIgTfHyE7HwGwQnY0mESZDy4VDVpQYfrypYXtTbluRnmEdDfHjsMZhzH_CGG5pgdq7cpdbr80Q-n4on-ERBYY4ndLsEAlXPD1smr5-_EzZtr92U47=w408-h306-k-no",
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
    {
        nama: "Ponpes ASWAJA NW LOTIM",
        kategori: "Pendidikan",
        lat: -8.5140514,
        lng: 116.5317384,
        deskripsi: "Ponpes di Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcivR0MhTRJReG7d0asUo1BVLDDkCcjz0kXx41MYABypGbAdr55-SfkghDHJ32Rq5gmxO6WB5qPRRljFCsqqPnbisO2K9638TmEyB-W77CtvILjKdfGCVQirbfs3qjLjhl_xXT8Z-Yk0cbP=w408-h306-k-no",
        iconFa: "fa-school",
        colorBg: "bg-red-500",
        colorText: "text-red-500",
        colorBadge: "bg-red-100"
    },
    {
        nama: "Ponpes Khairul Fatihin NW",
        kategori: "Pendidikan",
        lat: -8.5221607,
        lng: 116.5417078,
        deskripsi: "Ponpes di Beririjarak.",
        foto: "https://www.google.com/maps/place/Pondok+Pesantren+Khairul+Fatihin+NW/@-8.5221607,116.5417078,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDx1qPKZQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FAABkmLci9SC1JNNqUmFLyoDHAEm04BiCyYnwfb3qlWJmo5udI9LBc9iXvZZc0shRBTm0iZ60UQQUJzTHj5_YtIlB1XTrSr0Ywuaijcuzissl88WSiCTVpDnrbafUv80whziGRpy67-Y%3Dw152-h86-k-no!7i3840!8i2160!4m18!1m10!4m9!1m4!2m2!1d116.5300043!2d-8.5225225!4e1!1m3!2m2!1d116.5416718!2d-8.5213226!3m6!1s0x2dcc376208e05441:0xf93da6e83b203a32!8m2!3d-8.5221607!4d116.5417078!10e5!16s%2Fg%2F11h64m3fk7?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D#",
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
        nama: "Masjid Nurul Iman Otak Kebon",
        kategori: "Tempat Ibadah",
        lat: -8.5122953,
        lng: 116.5341881,
        deskripsi: "Masjid utama di area Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLeqLGVT7lIwn2awFBMbw10YuRtGGJf0TMvShh0OLIPxly1tq5CRA1JinMo5_GAKYcua5WqzdgU6EttJm1JA-Ggpl_du2mx8jdLNoh2goRNBtZGoyd7IDQxnylAsAlW-9rWQupwb=w408-h680-k-no",
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

    // --- POTENSI (UMKM & PERTANIAN) ---
    {
        nama: "produksi jamur tiram hasanuddin",
        kategori: "Pertanian",
        lat: -8.524263368781503,
        lng: 116.53571605299996,
        deskripsi: "Usaha budidaya jamur.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=z-2qWlvuCaGuXbILbE7jSA&cb_client=search.gws-prod.grass&w=408&h=240&yaw=340.98474&pitch=0&thumbfov=100",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T1QgRsin3FmxTDhRMXmvfFpXodGydqUP5tdEZW1CpaT-GfM_Sxw7NnB6RgrIAiZoDHABGQ815gHTigLGafLn1yBE3BP0qSl4Q8cCc-FnBjZ5K1HfWbmLN7geJDx-m9PRAGrOgLuw=w224-h298-n-k-no",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TZ65Rc8KxWrpMkLfCRFYdtzspH51TYrCkyLg77DCsAyH0dbvIr1-hbofjeVNQvaAxmKUMKxW5n7qBcS-1X2-ivoWEe4u-Q1YbEv84FgEXaVIP40kV02U1pPRKj8Q76dAJDXIfyTQ=w224-h298-n-k-no",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QlgtE402zCW8l_LCpCxl2QXJPTn7cK3XsD-1Y97tE46RZhyBzxodvxOKBur90pp6exwE4RbGMbMc-6CbbArqepQE3fX1Ok7I0w8oYENIffFtx_93bW18qrbfu1y0HAW-EQny9-=w224-h298-n-k-no",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q3pKcffAo0xQTPJNDtjo9a4hzjzCRQC3FVuAMfe5d1IuDWyR-SNL-jCLzwYjxTbY0oHSdmJUcumdTSWrOO9PcsoFLWT9fkt3gdSzpKWhhzaGc9W7mlNJlc6yZeB3QVVN-jl8FN2g=w224-h298-n-k-no",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TRJBp2-fm915v2w7gyMDlJvjx-pNNlM5lxc6QYrn2-i4nwRGovmDgJbrUq7OGq1rRcojOEIrhw2aKKgaAS8tDBZ0-DZbdg1wsT43jlxRNjx0G3V_2MyXbf1-ygqeOG8voe0P8=w224-h298-n-k-no",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sp8W-UpSCuzNGrRGW9aDVsxGTnFwRJhreCmteAOVW8Wd_XZKMY-_JVoEKhTpRx-3vmDW7G946ds55dKX-Y2WxKXfwYH-NP704eLWjGQPZn_7mviyItLHOBtqTHuGSmhR3BmJFC=w224-h298-n-k-no",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QuoWn8qJ32-MekRuGQvwUV7stczB1ZMewa9iQvxrRpuU8vTaPXN_jMzVtSpQ2ZyNk8OStJInvMCFyjUzWuXOCqSVcq7ZowCvKKPManoXvZ61FUL0nbFmmpNJn72_V60ygjQsWSp7byV4s=w224-h298-n-k-no",
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
        foto: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TmOwDWEzHZ2EfBLNz1mvU8S1UjT_SQfR3vs8p0wn05HtoSMQxcV50goQVrTLDrZNaqmrCWE205EPQeZd4UWNzv5V-hgryB6JmJK3vJ2OKTxN8WeAYmPROsjuJ5TNcYgQudg6Rp=w224-h298-n-k-no",
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
    },
    {
        nama: "bengkel tiara",
        kategori: "Ekonomi & UMKM",
        lat: -8.512800816450316,
        lng: 116.5348364808584,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=sNA5_sEdvpyaPQn-fMfpsQ&cb_client=search.gws-prod.grass&w=408&h=240&yaw=244.65369&pitch=0&thumbfov=100",
        iconFa: "fa-wrench",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "bengkel",
        kategori: "Ekonomi & UMKM",
        lat: -8.5120326981145,
        lng: 116.5342195822751,
        deskripsi: "UMKM Otomotif.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLdgp3w_zr0XADdK9k9qGoX83FkFqP1RwyUsQzk9zMjdlVG-6uDy9ddrDajV8VhAe-ujs1RElQ8qmLfe_BJyohwH17KlUG9JF1YZQO1YlgK4gnihgdx4QNJH6LO1AihS8EOVWvA=w408-h544-k-no",
        iconFa: "fa-wrench",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "bengkel",
        kategori: "Ekonomi & UMKM",
        lat: -8.511921026106494,
        lng: 116.53435682067642,
        deskripsi: "UMKM Otomotif.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Pu5xaPg1LAVeeGphtr1Pfg&cb_client=search.gws-prod.grass&w=408&h=240&yaw=228.58185&pitch=0&thumbfov=100",
        iconFa: "fa-wrench",
        colorBg: "bg-emerald-600",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "Tempat pupuk organik",
        kategori: "Pertanian",
        lat: -8.511082733062356,
        lng: 116.53496200578806,
        deskripsi: "Usaha dagang lokal warga.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=94vo0rW1c8RcJZHSkXdfxg&cb_client=search.gws-prod.grass&w=408&h=240&yaw=171.45648&pitch=0&thumbfov=100",
        iconFa: "fa-seedling",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "Kelompok Tani Ternak Sapi Montong Mentangi",
        kategori: "Pertanian",
        lat: -8.517384958168067,
        lng: 116.5319207362032,
        deskripsi: "Usaha pertanian dan peternakan lokal warga.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLdYfvaCiV2fF9cdcHa-QlkoqteUdAUBBgr9YS1J3Z8xe4b9TBk7uRG9EFXbD9VLzFZS8mzTVr5uT1c3C4qS1l78wbGL36DcAI4NcYoDGkfX8FyWYu5C1-U83LEsQ0mYxyMvzJs-=w408-h272-k-no",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "Kelompok ternak Berkah Desa Beririjarak",
        kategori: "Pertanian",
        lat: -8.521318698736351,
        lng: 116.53080303143798,
        deskripsi: "Usaha pertanian dan peternakan lokal warga.",
        foto: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Pq2Pp8gmAx7IvU703f4b2Q&cb_client=search.gws-prod.grass&w=408&h=240&yaw=238.70074&pitch=0&thumbfov=100",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },
    {
        nama: "Hulti Rias",
        kategori: "Ekonomi & UMKM",
        lat: -8.5173273,
        lng: 116.5307862,
        deskripsi: "Usaha pertanian dan peternakan lokal warga.",
        foto: "https://www.google.com/maps/place/Hulti+Rias/@-8.517369,116.5308155,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhADs9Ubre6JW1sg6eAcTPOW!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9T0WiiNMDC4DkZvrJM1kbVoReArqlR7YrLvhf_Cqh6OmvreO1rjmFlhiy2eXEMs-Rmt57hodn1I8wOOYH3qqwP9NTL54jSo-4cgc3sXMz9y3gXJ3DkPqrTK94G34Mzr1JzyFee9LrO8j32w%3Dw203-h342-k-no!7i1536!8i2594!4m18!1m10!4m9!1m4!2m2!1d116.5300043!2d-8.5225225!4e1!1m3!2m2!1d116.5306634!2d-8.5162392!3m6!1s0x2dcc37003fe38eb3:0x73e519425f7f33bd!8m2!3d-8.5173273!4d116.5307862!10e5!16s%2Fg%2F11zcrkjlhp?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D#",
        iconFa: "fa-store",
        colorBg: "bg-emerald-500",
        colorText: "text-emerald-700",
        colorBadge: "bg-emerald-100"
    },
    {
        nama: "Oke Jamur Lombok",
        kategori: "Pertanian",
        lat: -8.5134091,
        lng: 116.5362968,
        deskripsi: "Usaha pertanian dan peternakan lokal warga.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLeECpuTCMFANCyZEG6-OjmN-VoSR4tUOP5tVQhx-Xe7Qas_p549hnPUuDH9FEYD08_DaRuASAsA3X5XoShTcpXI0UPN6sfjTVj_YduyDCiOiZjzF-LLkwgHZ3r0Jsb3IO3P11Q=w428-h240-k-no",
        iconFa: "fa-leaf",
        colorBg: "bg-purple-500",
        colorText: "text-purple-700",
        colorBadge: "bg-purple-100"
    },

    // --- POTENSI WISATA (Hapus tanda /* dan */ di bawah lalu isi nama & koordinat wisata) ---

    {
        nama: "CAMPING GROUND EKOWISATA GAWAR GONG",
        kategori: "Wisata",
        lat: -8.506427866388107,
        lng: 116.53413907639701,
        deskripsi: "Wisata alam di Desa Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLdCDG525HB8RislS42rSsdFKAxCPTGqrhzGEESF_h3o5Xjd48rcJYgTGoC-UTG4j3NVqHG8dv9QYie_w5uH9fBumUAfXdKB7_MbVkIo97rOm74khVRCwQ1ZEFqmtnXVUD_u5Kk4=w426-h240-k-no",
        iconFa: "fa-mountain-sun",
        colorBg: "bg-teal-600",
        colorText: "text-teal-700",
        colorBadge: "bg-teal-100"
    },
    {
        nama: "Aik numpas",
        kategori: "Wisata",
        lat: -8.505844271345419,
        lng: 116.53485790837715,
        deskripsi: "Wisata alam di Desa Beririjarak.",
        foto: "",
        iconFa: "fa-mountain-sun",
        colorBg: "bg-teal-600",
        colorText: "text-teal-700",
        colorBadge: "bg-teal-100"
    },
    {
        nama: "Gawar Gong ",
        kategori: "Wisata",
        lat: -8.506077709469173,
        lng: 116.53373138064705,
        deskripsi: "Wisata alam di Desa Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcpEleXTHNGlkffIHgOE-Kzo1xZ7ZDU8NRpPkrQxgZZYr3e_iI8-UTe6_hx5sJ8F7NksBMJCWPNB5jTqbW9A-zwnewer72gKTU550L9aJW96o25UEco9bI4ai_wAz7_V4IMiqy-Wg=w408-h725-k-no",
        iconFa: "fa-mountain-sun",
        colorBg: "bg-teal-600",
        colorText: "text-teal-700",
        colorBadge: "bg-teal-100"
    },
    {
        nama: "HUTAN LINDUNG GAWAR GONG",
        kategori: "Wisata",
        lat: -8.503386628842145,
        lng: 116.53329360595737,
        deskripsi: "Wisata alam di Desa Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLcYI8sbXsFPTmtuo0ZlZJ7GutDjOG8vK8yz2LwDjUISOBRYcFHfGXhiTj3ar8RgpTVfJB56RWh_gC3QNpdXSYG_KqllTOUcomfD5_s0QafetJmo-eh9l1lbVatPkYT8LtqiEmPoaw=w408-h306-k-no",
        iconFa: "fa-mountain-sun",
        colorBg: "bg-teal-600",
        colorText: "text-teal-700",
        colorBadge: "bg-teal-100"
    },
    {
        nama: "Orong Landang Gamang",
        kategori: "Wisata",
        lat: -8.502229771321495, 
        lng: 116.52833182977727,
        deskripsi: "Wisata alam di Desa Beririjarak.",
        foto: "https://lh3.googleusercontent.com/grass-cs/AABkmLfb3q2A7siC1VQcuyk7W8OnQManN-zhQtxG7_MaBu5oh__oJNxWFGxP2o_8oxefqJcXoCzmb_7-ZoGlZBHTO6B2-11Mc2qQgyhJ3GoF7UqtUdchnjO-dW2iSo5PqQwXKuUM-d5o=w408-h244-k-no",
        iconFa: "fa-mountain-sun",
        colorBg: "bg-teal-600",
        colorText: "text-teal-700",
        colorBadge: "bg-teal-100"
    },


];

// =========================================================
// SINKRONISASI OTOMATIS LOKASI TAMBAHAN DARI LOCALSTORAGE WEB
// =========================================================
(function sinkronLokasiBrowser() {
    const kunciPenyimpanan = ["desaPotensiCustom", "lokasiTambahan", "lokasiBaruDesa"];
    kunciPenyimpanan.forEach(kunci => {
        try {
            const raw = localStorage.getItem(kunci);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return;

            parsed.forEach(baru => {
                if (!baru || !baru.nama || typeof baru.lat !== "number" || typeof baru.lng !== "number") return;
                const sudahAda = desaPotensi.some(
                    lama => lama.nama.toLowerCase() === baru.nama.toLowerCase() &&
                            Math.abs(lama.lat - baru.lat) < 0.00005 &&
                            Math.abs(lama.lng - baru.lng) < 0.00005
                );
                if (!sudahAda) {
                    const isWisata = (baru.kategori || "").toLowerCase().includes("wisata");
                    desaPotensi.push({
                        nama: baru.nama,
                        kategori: baru.kategori || "Ekonomi & UMKM",
                        lat: baru.lat,
                        lng: baru.lng,
                        deskripsi: baru.deskripsi || "Lokasi terdata di Desa Beririjarak.",
                        foto: baru.foto || "",
                        iconFa: baru.iconFa || (isWisata ? "fa-mountain-sun" : "fa-location-dot"),
                        colorBg: baru.colorBg || (isWisata ? "bg-teal-600" : "bg-emerald-600"),
                        colorText: baru.colorText || (isWisata ? "text-teal-700" : "text-emerald-700"),
                        colorBadge: baru.colorBadge || (isWisata ? "bg-teal-100" : "bg-emerald-100")
                    });
                }
            });
        } catch (e) {}
    });
})();

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

    // Inisialisasi Peta Penuh tanpa batas administrasi desa maupun dusun
    const map = L.map('map', {
        zoomControl: false
    }).setView([-8.5180, 116.5360], 14);

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

    // Filter URL (jika dibuka dengan ?filter=fasilitas atau ?filter=potensi)
    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get('filter');

    let displayedDesaPotensi = desaPotensi;
    if (activeFilter === 'fasilitas') {
        displayedDesaPotensi = desaPotensi.filter(item => ["Fasilitas Publik", "Pendidikan", "Tempat Ibadah"].includes(item.kategori));
    } else if (activeFilter === 'potensi') {
        displayedDesaPotensi = desaPotensi.filter(item => ["Pertanian", "Ekonomi & UMKM", "Wisata"].includes(item.kategori));
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

                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        return container;
    };
    topRightControl.addTo(map);

} // <-- Penutup blok logika peta