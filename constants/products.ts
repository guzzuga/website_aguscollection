     1|import type { Category, Product } from '@/types';
     2|
     3|export const categories: Category[] = [
     4|  {
     5|    slug: 'seragam-sekolah',
     6|    name: 'Seragam Sekolah',
     7|    description:
     8|      'Seragam siswa dan siswi dengan bahan nyaman, tahan lama, dan sesuai standar sekolah.',
     9|    image:
    10|      '/images/categories/seragam-sekolah.jpg',
    11|    icon: 'GraduationCap',
    12|    productCount: 13,
    13|  },
    14|  {
    15|    slug: 'seragam-perusahaan',
    16|    name: 'Seragam Perusahaan',
    17|    description:
    18|      'Seragam kerja profesional yang merepresentasikan identitas brand perusahaan Anda.',
    19|    image:
    20|      '/images/categories/seragam-perusahaan.jpg',
    21|    icon: 'Building2',
    22|    productCount: 9,
    23|  },
    24|  {
    25|    slug: 'kaos-custom',
    26|    name: 'Kaos Custom',
    27|    description:
    28|      'Kaos sablon custom dengan teknik sablon premium dan bahan katun combed berkualitas.',
    29|    image:
    30|      '/images/categories/kaos-custom.jpg',
    31|    icon: 'Shirt',
    32|    productCount: 15,
    33|  },
    34|  {
    35|    slug: 'fashion-stylish',
    36|    name: 'Fashion Stylish',
    37|    description:
    38|      'Busana muslim modern dan pakaian stylish dengan desain kekinian dan bahan premium.',
    39|    image:
    40|      '/images/categories/fashion-stylish.jpg',
    41|    icon: 'Sparkles',
    42|    productCount: 5,
    43|  },
    44|
    45|  {
    46|    slug: 'polo-shirt',
    47|    name: 'Polo Shirt',
    48|    description:
    49|      'Polo shirt premium dengan bordir logo atau sablon untuk seragam kerja dan komunitas.',
    50|    image:
    51|      '/images/categories/polo-shirt.jpg',
    52|    icon: 'Shirt',
    53|    productCount: 10,
    54|  },
    55|  {
    56|    slug: 'wearpack',
    57|    name: 'Wearpack',
    58|    description:
    59|      'Wearpack industri dan lapangan dengan bahan ripstop yang kuat, aman, dan nyaman dipakai.',
    60|    image:
    61|      '/images/categories/wearpack.jpg',
    62|    icon: 'HardHat',
    63|    productCount: 8,
    64|  },
    65|  {
    66|    slug: 'almamater',
    67|    name: 'Almamater & Jaz',
    68|    description:
    69|      'Koleksi almamater dan jaket premium dengan desain eksklusif dan bahan berkualitas tinggi. Cocok untuk wisuda, organisasi, komunitas, dan acara spesial.',
    70|    image:
    71|      '/images/categories/almamater.jpg',
    72|    icon: 'Wind',
    73|    productCount: 7,
    74|  },
    75|  {
    76|    slug: 'bahan-kain',
    77|    name: 'Bahan Kain',
    78|    description:
    79|      'Aneka bahan kain grade A: katun combed, drill, polyester, dan lainnya dengan harga grosir.',
    80|    image:
    81|      '/images/categories/bahan-kain.jpg',
    82|    icon: 'Layers',
    83|    productCount: 20,
    84|  },
    85|  {
    86|    slug: 'atribut-sekolah',
    87|    name: 'Atribut Sekolah',
    88|    description:
    89|      'Dasi, topi, dompet, tali nama, sabuk, dan atribut sekolah lengkap dengan kualitas terjamin.',
    90|    image:
    91|      '/images/categories/atribut-sekolah.jpg',
    92|    icon: 'Star',
    93|    productCount: 18,
    94|  },
    95|];
    96|
    97|export const products: Product[] = [
    98|  // ─── SERAGAM SEKOLAH ───────────────────────────────────────────────────────
    99|  {
   100|    slug: 'seragam-sekolah-standar',
   101|    name: 'Seragam Sekolah Standar',
   102|    category: 'seragam-sekolah',
   103|    categoryLabel: 'Seragam Sekolah',
   104|    shortDescription: 'Seragam siswa lengkap dengan bahan adem dan jahitan rapi.',
   105|    description:
   106|      'Seragam sekolah standar dengan bahan katun twill premium yang adem, tidak menerawang, dan tahan lama. Jahitan rantai di area kritikal memastikan ketahanan saat dicuci berulang. Tersedia untuk SD, SMP, dan SMA dengan warna sesuai standar sekolah.',
   107|    images: [
   108|      '/images/products/seragam-sekolah-standar/foto-1.jpg',
   109|      '/images/products/seragam-sekolah-standar/foto-2.jpg',
   110|      '/images/products/seragam-sekolah-standar/foto-3.jpg',
   111|      '/images/products/seragam-sekolah-standar/foto-4.jpg',
   112|    ],
   113|    basePrice: 102500,
   114|    educationPricing: [
   115|      { level: 'SD', basePrice: 105000, label: 'Sekolah Dasar' },
   116|      { level: 'SMP', basePrice: 120000, label: 'Sekolah Menengah Pertama' },
   117|      { level: 'SMA', basePrice: 135000, label: 'Sekolah Menengah Atas' },
   118|    ],
   119|    priceTiers: [
   120|      { minQty: 10, maxQty: 49, discount: 0, label: '10–49 pcs' },
   121|      { minQty: 50, maxQty: 99, discount: 1000, label: '50–99 pcs' },
   122|      { minQty: 100, maxQty: 199, discount: 1500, label: '100–199 pcs' },
   123|      { minQty: 200, maxQty: 500, discount: 2500, label: '200–500 pcs' },
   124|    ],
   125|    colors: [
   126|      { name: 'Putih', hex: '#f8fafc' },
   127|      { name: 'Navy', hex: '#0a0a2e' },
   128|      { name: 'Merah Maroon', hex: '#7f1d1d' },
   129|      { name: 'Abu', hex: '#64748b' },
   130|    ],
   131|    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   132|    rating: 4.9,
   133|    reviewCount: 128,
   134|    badge: 'Best Seller',
   135|    features: [
   136|      'Bahan katun twill premium, adem dan tidak menerawang',
   137|      'Jahitan rantai di area kritikal untuk ketahanan ekstra',
   138|      'Tersedia warna sesuai standar sekolah',
   139|      'Bordir nama sekolah gratis (min. 50 pcs)',
   140|      'Quality control ketat sebelum pengiriman',
   141|    ],
   142|    specifications: [
   143|      { label: 'Bahan', value: 'Katun Twill 30s' },
   144|      { label: 'Tebal Kain', value: '180–200 gsm' },
   145|      { label: 'Teknik Bordir', value: 'Computerized Embroidery' },
   146|      { label: 'MOQ', value: '10 pcs' },
   147|      { label: 'Estimasi Produksi', value: '7–10 hari kerja' },
   148|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   149|    ],
   150|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   151|  },
   152|  {
   153|    slug: 'seragam-olahraga-sekolah',
   154|    name: 'Seragam Olahraga Sekolah',
   155|    category: 'seragam-sekolah',
   156|    categoryLabel: 'Seragam Sekolah',
   157|    shortDescription: 'Baju olahraga sekolah bahan drifit breathable, anti keringat.',
   158|    description:
   159|      'Seragam olahraga sekolah dengan bahan drifit polyester yang menyerap keringat cepat, ringan, dan nyaman dipakai aktivitas tinggi. Sablon nama sekolah dan logo dengan teknik heat transfer premium. Tersedia untuk SD, SMP, dan SMA.',
   160|    images: [
   161|      '/images/products/seragam-olahraga-sekolah/foto-1.jpg',
   162|      '/images/products/seragam-olahraga-sekolah/foto-2.jpg',
   163|      '/images/products/seragam-olahraga-sekolah/foto-3.jpg',
   164|      '/images/products/seragam-olahraga-sekolah/foto-4.jpg',
   165|    ],
   166|    basePrice: 58000,
   167|    educationPricing: [
   168|      { level: 'SD', basePrice: 60000, label: 'Sekolah Dasar' },
   169|      { level: 'SMP', basePrice: 70000, label: 'Sekolah Menengah Pertama' },
   170|      { level: 'SMA', basePrice: 80000, label: 'Sekolah Menengah Atas' },
   171|    ],
   172|    priceTiers: [
   173|      { minQty: 10, maxQty: 49, discount: 0, label: '10–49 pcs' },
   174|      { minQty: 50, maxQty: 99, discount: 1000, label: '50–99 pcs' },
   175|      { minQty: 100, maxQty: 199, discount: 1500, label: '100–199 pcs' },
   176|      { minQty: 200, maxQty: 500, discount: 2500, label: '200–500 pcs' },
   177|    ],
   178|    colors: [
   179|      { name: 'Putih', hex: '#f8fafc' },
   180|      { name: 'Navy', hex: '#0a0a2e' },
   181|      { name: 'Merah', hex: '#dc2626' },
   182|      { name: 'Hijau', hex: '#16a34a' },
   183|    ],
   184|    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   185|    rating: 4.8,
   186|    reviewCount: 94,
   187|    badge: 'Populer',
   188|    features: [
   189|      'Bahan drifit polyester, menyerap keringat cepat',
   190|      'Ringan dan elastis untuk aktivitas tinggi',
   191|      'Sablon heat transfer tahan lama',
   192|      'Jahitan flatlock yang nyaman di kulit',
   193|      'Quality control ketat sebelum pengiriman',
   194|    ],
   195|    specifications: [
   196|      { label: 'Bahan', value: 'Drifit Polyester' },
   197|      { label: 'Tebal Kain', value: '140–160 gsm' },
   198|      { label: 'Teknik Sablon', value: 'Heat Transfer' },
   199|      { label: 'MOQ', value: '10 pcs' },
   200|      { label: 'Estimasi Produksi', value: '5–7 hari kerja' },
   201|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   202|    ],
   203|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   204|  },
   205|  {
   206|    slug: 'celana-sekolah',
   207|    name: 'Celana Sekolah Standar',
   208|    category: 'seragam-sekolah',
   209|    categoryLabel: 'Seragam Sekolah',
   210|    shortDescription: 'Celana sekolah bahan drill premium dengan ketahanan tinggi.',
   211|    description:
   212|      'Celana sekolah dengan bahan drill yang tidak mudah kusut, tahan lama, dan nyaman dipakai seharian. Jahitan rantai di area kritikal untuk ketahanan ekstra. Tersedia untuk SD, SMP, dan SMA dengan warna sesuai standar sekolah.',
   213|    images: [
   214|      '/images/products/celana-sekolah/foto-1.jpg',
   215|      '/images/products/celana-sekolah/foto-2.jpg',
   216|      '/images/products/celana-sekolah/foto-3.jpg',
   217|      '/images/products/celana-sekolah/foto-4.jpg',
   218|    ],
   219|    basePrice: 75000,
   220|    educationPricing: [
   221|      { level: 'SD', basePrice: 75000, label: 'Sekolah Dasar' },
   222|      { level: 'SMP', basePrice: 85000, label: 'Sekolah Menengah Pertama' },
   223|      { level: 'SMA', basePrice: 95000, label: 'Sekolah Menengah Atas' },
   224|    ],
   225|    priceTiers: [
   226|      { minQty: 10, maxQty: 49, discount: 0, label: '10–49 pcs' },
   227|      { minQty: 50, maxQty: 99, discount: 1000, label: '50–99 pcs' },
   228|      { minQty: 100, maxQty: 199, discount: 1500, label: '100–199 pcs' },
   229|      { minQty: 200, maxQty: 500, discount: 2500, label: '200–500 pcs' },
   230|    ],
   231|    colors: [
   232|      { name: 'Abu', hex: '#64748b' },
   233|      { name: 'Navy', hex: '#0a0a2e' },
   234|      { name: 'Hitam', hex: '#0f172a' },
   235|    ],
   236|    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   237|    rating: 4.8,
   238|    reviewCount: 87,
   239|    features: [
   240|      'Bahan drill premium, tidak mudah kusut',
   241|      'Jahitan rantai di area kritikal',
   242|      'Tersedia warna sesuai standar sekolah',
   243|      'Bordir nama sekolah gratis (min. 50 pcs)',
   244|      'Quality control ketat sebelum pengiriman',
   245|    ],
   246|    specifications: [
   247|      { label: 'Bahan', value: 'Drill 200 gsm' },
   248|      { label: 'Model', value: 'Celana Pendek / Panjang' },
   249|      { label: 'MOQ', value: '10 pcs' },
   250|      { label: 'Estimasi Produksi', value: '7–10 hari kerja' },
   251|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   252|    ],
   253|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   254|  },
   255|  {
   256|    slug: 'kaos-kaki-custom',
   257|    name: 'Kaos Kaki Custom',
   258|    category: 'atribut-sekolah',
   259|    categoryLabel: 'Atribut Sekolah',
   260|    shortDescription: 'Kaos kaki custom dengan bahan katun combed breathable dan sablon logo.',
   261|    description:
   262|      'Kaos kaki custom dengan bahan katun combed 30s yang breathable, menyerap keringat, dan nyaman dipakai seharian. Sablon logo atau tulisan dengan teknik screen printing premium yang tidak mudah luntur. Tersedia berbagai ukuran dan warna custom sesuai kebutuhan sekolah atau komunitas.',
   263|    images: [
   264|      '/images/products/kaos-kaki-custom/foto-1.jpg',
   265|      '/images/products/kaos-kaki-custom/foto-2.jpg',
   266|    ],
   267|    basePrice: 7500,
   268|    educationPricing: [
   269|      { level: 'Kecil', basePrice: 7500, label: 'Ukuran Kecil (SD)' },
   270|      { level: 'Dewasa', basePrice: 8500, label: 'Ukuran Dewasa (SMP-SMA)' },
   271|    ],
   272|    priceTiers: [
   273|      { minQty: 50, maxQty: 99, discount: 0, label: '50–99 pcs' },
   274|      { minQty: 100, maxQty: 199, discount: 500, label: '100–199 pcs' },
   275|      { minQty: 200, maxQty: 499, discount: 1000, label: '200–499 pcs' },
   276|      { minQty: 500, maxQty: 1000, discount: 1500, label: '500–1000 pcs' },
   277|    ],
   278|    colors: [
   279|      { name: 'Putih', hex: '#f8fafc' },
   280|      { name: 'Hitam', hex: '#0a0a0a' },
   281|      { name: 'Navy', hex: '#0a0a2e' },
   282|      { name: 'Abu', hex: '#64748b' },
   283|      { name: 'Custom', hex: '#d4af37' },
   284|    ],
   285|    sizes: ['Kecil (SD)', 'Dewasa (SMP-SMA)'],
   286|    rating: 4.8,
   287|    reviewCount: 42,
   288|    features: [
   289|      'Bahan katun combed 30s breathable',
   290|      'Menyerap keringat dengan baik',
   291|      'Sablon logo custom tidak mudah luntur',
   292|      'Elastis dan nyaman dipakai',
   293|      'Quality control ketat sebelum pengiriman',
   294|    ],
   295|    specifications: [
   296|      { label: 'Bahan', value: 'Katun Combed 30s' },
   297|      { label: 'Model', value: 'Kaos Kaki Custom' },
   298|      { label: 'MOQ', value: '50 pcs' },
   299|      { label: 'Estimasi Produksi', value: '5–7 hari kerja' },
   300|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   301|    ],
   302|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   303|  },
   304|  {
   305|    slug: 'jas-labschool',
   306|    name: 'Jas Labschool Premium',
   307|    category: 'seragam-sekolah',
   308|    categoryLabel: 'Seragam Sekolah',
   309|    shortDescription: 'Jas lab seragam sekolah dengan bahan yang tahan kimia dan mudah dicuci.',
   310|    description:
   311|      'Jas lab seragam sekolah dengan bahan drill tahan kimia dan mudah dicuci. Model kancing depan, saku fungsional, dan kantong pensil. Cocok untuk praktikum IPA, Biologi, Kimia, dan Fisika. Tersedia untuk SD, SMP, dan SMA.',
   312|    images: [
   313|      '/images/products/jas-labschool/foto-1.jpg',
   314|      '/images/products/jas-labschool/foto-2.jpg',
   315|      '/images/products/jas-labschool/foto-3.jpg',
   316|      '/images/products/jas-labschool/foto-4.jpg',
   317|    ],
   318|    basePrice: 65000,
   319|    educationPricing: [
   320|      { level: 'SD', basePrice: 65000, label: 'Sekolah Dasar' },
   321|      { level: 'SMP', basePrice: 75000, label: 'Sekolah Menengah Pertama' },
   322|      { level: 'SMA', basePrice: 85000, label: 'Sekolah Menengah Atas' },
   323|    ],
   324|    priceTiers: [
   325|      { minQty: 10, maxQty: 49, discount: 0, label: '10–49 pcs' },
   326|      { minQty: 50, maxQty: 99, discount: 1000, label: '50–99 pcs' },
   327|      { minQty: 100, maxQty: 199, discount: 1500, label: '100–199 pcs' },
   328|      { minQty: 200, maxQty: 500, discount: 2500, label: '200–500 pcs' },
   329|    ],
   330|    colors: [
   331|      { name: 'Putih', hex: '#f8fafc' },
   332|    ],
   333|    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   334|    rating: 4.7,
   335|    reviewCount: 52,
   336|    features: [
   337|      'Bahan drill tahan kimia dan mudah dicuci',
   338|      'Model kancing depan dengan saku fungsional',
   339|      'Kantong pensil di lengan',
   340|      'Bordir nama sekolah gratis (min. 50 pcs)',
   341|      'Quality control ketat sebelum pengiriman',
   342|    ],
   343|    specifications: [
   344|      { label: 'Bahan', value: 'Drill 180 gsm' },
   345|      { label: 'Model', value: 'Jas Lab / Apron' },
   346|      { label: 'MOQ', value: '10 pcs' },
   347|      { label: 'Estimasi Produksi', value: '7–10 hari kerja' },
   348|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   349|    ],
   350|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   351|  },
   352|
   353|  // FASHION STYLISH
   354|  {
   355|    slug: 'rok-sekolah',
   356|    name: 'Rok Plisket Dewasa Premium',
   357|    category: 'fashion-stylish',
   358|    categoryLabel: 'Fashion Stylish',
   359|    shortDescription: 'Rok plisket premium outfit stylish cewek gen z.',
   360|    description:
   361|      'Rok plisket premium dengan bahan berkualitas dan model stylish. Cocok untuk outfit sehari-hari, kuliah, atau acara casual. Tersedia dalam berbagai warna dan ukuran.',
   362|    images: [
   363|      '/images/products/rok-sekolah-plisket/foto-1.jpg',
   364|      '/images/products/rok-sekolah-plisket/foto-2.jpg',
   365|      '/images/products/rok-sekolah-plisket/foto-3.jpg',
   366|      '/images/products/rok-sekolah-plisket/foto-4.jpg',
   367|    ],
   368|    basePrice: 60000,
   369|    priceTiers: [
   370|      { minQty: 10, maxQty: 49, discount: 0, label: '10–49 pcs' },
   371|      { minQty: 50, maxQty: 99, discount: 1000, label: '50–99 pcs' },
   372|      { minQty: 100, maxQty: 199, discount: 1500, label: '100–199 pcs' },
   373|      { minQty: 200, maxQty: 500, discount: 2500, label: '200–500 pcs' },
   374|    ],
   375|    colors: [
   376|      { name: 'Abu', hex: '#64748b' },
   377|      { name: 'Navy', hex: '#0a0a2e' },
   378|      { name: 'Hitam', hex: '#0f172a' },
   379|      { name: 'Putih', hex: '#f8fafc' },
   380|    ],
   381|    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   382|    rating: 4.8,
   383|    reviewCount: 72,
   384|    features: [
   385|      'Bahan serge premium, jatuh sempurna',
   386|      'Tidak mudah kusut dan tahan lama',
   387|      'Tersedia model plisket dan polos',
   388|      'Tersedia ukuran anak hingga dewasa',
   389|      'Quality control ketat sebelum pengiriman',
   390|    ],
   391|    specifications: [
   392|      { label: 'Bahan', value: 'Serge Premium' },
   393|      { label: 'Model', value: 'Plisket / Polos' },
   394|      { label: 'MOQ', value: '10 pcs' },
   395|      { label: 'Estimasi Produksi', value: '5–7 hari kerja' },
   396|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   397|    ],
   398|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   399|  },
   400|
   401|  // ─── SERAGAM PERUSAHAAN ────────────────────────────────────────────────────
   402|  {
   403|    slug: 'seragam-perusahaan-polo',
   404|    name: 'Seragam Perusahaan Polo',
   405|    category: 'seragam-perusahaan',
   406|    categoryLabel: 'Seragam Perusahaan',
   407|    shortDescription: 'Polo shirt premium dengan bordir logo perusahaan.',
   408|    description:
   409|      'Polo shirt seragam perusahaan dengan bahan lacoste pique yang breathable dan tahan kusut. Bordir logo perusahaan dengan teknik computerized embroidery menghasilkan detail tajam dan tahan lama. Cocok untuk staff, sales, dan event perusahaan.',
   410|    images: [
   411|      '/images/products/seragam-perusahaan-polo/foto-1.jpg',
   412|      '/images/products/seragam-perusahaan-polo/foto-2.jpg',
   413|      '/images/products/seragam-perusahaan-polo/foto-3.jpg',
   414|      '/images/products/seragam-perusahaan-polo/foto-4.jpg',
   415|    ],
   416|    basePrice: 70000,
   417|    priceTiers: [
   418|      { minQty: 10, maxQty: 49, price: 70000, label: '10–49 pcs' },
   419|      { minQty: 50, maxQty: 99, price: 69000, label: '50–99 pcs' },
   420|      { minQty: 100, maxQty: 199, price: 68500, label: '100–199 pcs' },
   421|      { minQty: 200, maxQty: 299, price: 68000, label: '200–299 pcs' },
   422|      { minQty: 300, maxQty: 500, price: 67500, label: '300–500 pcs' },
   423|    ],
   424|    colors: [
   425|      { name: 'Navy', hex: '#0a0a2e' },
   426|      { name: 'Hitam', hex: '#0f172a' },
   427|      { name: 'Putih', hex: '#f8fafc' },
   428|      { name: 'Maroon', hex: '#7f1d1d' },
   429|      { name: 'Forest', hex: '#14532d' },
   430|    ],
   431|    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   432|    rating: 4.8,
   433|    reviewCount: 86,
   434|    badge: 'Premium',
   435|    features: [
   436|      'Bahan lacoste pique 30s, breathable dan tahan kusut',
   437|      'Bordir logo computerized dengan detail tajam',
   438|      'Kerah dan manset double needle untuk ketahanan',
   439|      'Tersedia 15+ warna pilihan',
   440|      'Quality control ketat sebelum pengiriman',
   441|    ],
   442|    specifications: [
   443|      { label: 'Bahan', value: 'Lacoste Pique 30s' },
   444|      { label: 'Tebal Kain', value: '200–220 gsm' },
   445|      { label: 'Teknik Logo', value: 'Computerized Embroidery' },
   446|      { label: 'MOQ', value: '10 pcs' },
   447|      { label: 'Estimasi Produksi', value: '7–10 hari kerja' },
   448|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   449|    ],
   450|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   451|  },
   452|  {
   453|    slug: 'kemeja-seragam-perusahaan',
   454|    name: 'Kemeja Seragam Perusahaan',
   455|    category: 'seragam-perusahaan',
   456|    categoryLabel: 'Seragam Perusahaan',
   457|    shortDescription: 'Kemeja seragam formal kantor dengan bordir logo profesional.',
   458|    description:
   459|      'Kemeja seragam perusahaan dengan bahan katun CVC yang tidak mudah kusut dan nyaman dipakai seharian. Model lengan panjang dan pendek tersedia. Bordir logo di dada kiri dengan teknik computerized untuk tampilan profesional.',
   460|    images: [
   461|      '/images/products/kemeja-seragam-perusahaan/foto-1.jpg',
   462|      '/images/products/kemeja-seragam-perusahaan/foto-2.jpg',
   463|      '/images/products/kemeja-seragam-perusahaan/foto-3.jpg',
   464|      '/images/products/kemeja-seragam-perusahaan/foto-4.jpg',
   465|    ],
   466|    basePrice: 120000,
   467|    priceTiers: [
   468|      { minQty: 10, maxQty: 49, price: 120000, label: '10–49 pcs' },
   469|      { minQty: 50, maxQty: 99, price: 119000, label: '50–99 pcs' },
   470|      { minQty: 100, maxQty: 199, price: 118500, label: '100–199 pcs' },
   471|      { minQty: 200, maxQty: 299, price: 118000, label: '200–299 pcs' },
   472|      { minQty: 300, maxQty: 500, price: 117500, label: '300–500 pcs' },
   473|    ],
   474|    priceRange: { min: 117500, max: 135000 },
   475|    colors: [
   476|      { name: 'Putih', hex: '#f8fafc' },
   477|      { name: 'Biru Muda', hex: '#bfdbfe' },
   478|      { name: 'Cream', hex: '#fef9c3' },
   479|      { name: 'Abu Muda', hex: '#e2e8f0' },
   480|    ],
   481|    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   482|    rating: 4.7,
   483|    reviewCount: 61,
   484|    badge: 'Populer',
   485|    features: [
   486|      'Bahan katun CVC, tidak mudah kusut',
   487|      'Model lengan panjang & pendek tersedia',
   488|      'Bordir logo dada kiri',
   489|      'Finishing rapi dan profesional',
   490|      'Quality control ketat sebelum pengiriman',
   491|    ],
   492|    specifications: [
   493|      { label: 'Bahan', value: 'Katun CVC 40s' },
   494|      { label: 'Tebal Kain', value: '120–140 gsm' },
   495|      { label: 'Teknik Logo', value: 'Computerized Embroidery' },
   496|      { label: 'MOQ', value: '10 pcs' },
   497|      { label: 'Estimasi Produksi', value: '7–10 hari kerja' },
   498|      { label: 'Pengiriman', value: 'Seluruh Indonesia' },
   499|    ],
   500|    shopeeUrl: 'https://s.shopee.co.id/20tQvxOu1S',
   501|