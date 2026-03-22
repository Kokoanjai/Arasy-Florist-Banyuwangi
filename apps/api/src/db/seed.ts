import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
  categories,
  products,
  productTags,
  shippingZones,
  shopSettings,
} from './schema.js';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log('🌱 Seeding database...');

  // ─── Clear existing data ──────────────────────────────────
  await db.delete(productTags);
  await db.delete(products);
  await db.delete(categories);
  await db.delete(shippingZones);
  await db.delete(shopSettings);

  // ─── Categories ───────────────────────────────────────────
  const [papan, bucket, stand] = await db
    .insert(categories)
    .values([
      {
        name: 'Papan',
        slug: 'papan',
        description: 'Ucapan selamat, duka cita & grand opening.',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTUS9LXhkvUDfc7fdIfGYCHI7EaExwMyyunLAWT9VpcVceZdnFlxWP2ulXwVSpLVVa8CtoMLskpjpiMmgXzAt2csNwLPmEozRRbpniBq2SEJpYcIfzhqQLg5etOdkmM0SW0gg5ajAvyV60zROyRduoZ3qqQ5Fi5_5Yry29MXNsO4X-v75iNF8d63mvaisk_guiBCp99yIqf-TYgnul_z-jSk6Zkx6bN7ag3FFVPS87sjR8UFYwZa9kbQWhsBs2ysI91_LaVKGGUb9G',
        sortOrder: 0,
      },
      {
        name: 'Bucket',
        slug: 'bucket',
        description: 'Hadiah wisuda, ulang tahun & anniversary.',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBc1zV48sqqcNKlp4WzPW54LaI8ZGvnJub46Ze32wfxWconpA8xIBD81Nbc2R_o8aKJNIiUa20hwFn-iSJdLe9s5Li_ga98H3m1ouFPoyxTNxI9wlc89qtAMPdxEIpbsj5pp3Ra1gAQAc8ADwm6xLgC3r4R35oIQes2spwwK6EugSEl8Jj3hpHHviRiGiIopVFTlSryz7I82qc2C1MkvAa9oRnNqVekD7QtC2puliWdflrb_d4S061RZIzqOnCTy5gSSSSqr8d3Sv3X',
        sortOrder: 1,
      },
      {
        name: 'Stand',
        slug: 'stand',
        description: 'Hiasan meja, peresmian & dekorasi indoor.',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDBnijR5qp78vzGsXuhKBKN9zS2zyM5GcbbVewPYuoMIxaCEapQhVc9bPlde2InFc7TjBmJU7KtXaHvlVT83T-ZhakAr_ULZPMfmnitrdGIqcIjZnFWUdrZZkwgbkdvfFzvX-wfCrLwwa1MHQ4zy5fhweSdH0xgBMoitxpRbkJwnefHcUilDsF0TJyAfcaOCdjW3p7y8VrNUinYPp1rTV77K5pelf_W1rCUJ0BNOpdKBEOSwPGoS8qyYblw4dtkGREInKDbuWNBNSih',
        sortOrder: 2,
      },
    ])
    .returning();

  console.log('  ✅ Categories seeded');

  // ─── Products ─────────────────────────────────────────────
  const insertedProducts = await db
    .insert(products)
    .values([
      {
        categoryId: papan.id,
        name: "Papan Bunga Megah 'Magnolia'",
        slug: 'papan-bunga-megah-magnolia',
        description: 'Ukuran 2x1.5m, Full Bunga Segar',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBGvrUtsjvgIlALPFZ-kf-XoZ1aV2ngSJALVmq7cEyD00abkZDRI4cU_Hby9E0cP7R0dHOuv2klLAVe9n4E5kVf05HiiTsrhokHN7_yNZpyzVXn8c3-d0d3LWKZOTqGFNk3fu_4BJjOkHn5W5gSHY70N3YLjN5intAnGwZntngP5IYnb5nAxZceTNATRhpysDXbTd9i2GnTOksq9Us_V2nv7tRbk9TRsULtWvwzDELw_qv-yYUP0e_4bUDTm8UwHZAgILIvCRQg0HbZ',
        price: 750000,
        badge: 'PREMIUM',
        dimensions: '2x1.5m',
        sortOrder: 0,
      },
      {
        categoryId: papan.id,
        name: 'Classic Wedding Rosette',
        slug: 'classic-wedding-rosette',
        description: 'Double Panel, Pastel Theme',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAFWOMSKJIsEW6s_6YORCRKnCeZkmr689XCX_7Ezx_tPMcpIRQp2AFL12q9VOTDE7XTN7S81VKb49_TqIt9NfxfgHQ39i48COZNYn-Zq5_ZDKkzrwUx5T1A0Dc6qpMt3PtVCxsFmoeHPq5OgdKlfOOsYV1qv57YgL1dKYC2v8lQgwvhiSZh5Qo07SeXmT2oKiks1sBjOhL22TKfKs-VbES30dsMX1UKvctsqrks9lt9nKpyuDBgYyZdnv_7fBqtj5U8G8lOQbCdcCpE',
        price: 1250000,
        badge: null,
        dimensions: null,
        sortOrder: 1,
      },
      {
        categoryId: papan.id,
        name: 'Serenity Condolence Board',
        slug: 'serenity-condolence-board',
        description: 'Deep Blue & White Tones',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCYwV2Pez3lpT-HCtcggwIDBcqpySe2TrCh_mrsArAxUk2s7gPz8VJNMHZ6PWgDp2jeZcIz0dx3ndkEtpEY49dBLtEHEzGU2EBtEpDEKBPe3wI1TX7IxVXq1zWwOwTc3enaI-xnunpXzVGVVANOOHemXtCzXwEv_l7qRW3A3Qy73NMW5Biw_KPuopbkgV5VlfIm24Ny3TdJf8EcmHHua507cG-swzaHujyV4r7jClqO1n1lIOjKaOU0I-k3uf5ma6BUgQCbzZC7Fvig',
        price: 500000,
        badge: null,
        dimensions: null,
        sortOrder: 2,
      },
      {
        categoryId: papan.id,
        name: 'Modern Congratulation Art',
        slug: 'modern-congratulation-art',
        description: 'Custom Graphic Layout',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAUeJWYmf5vV_MjXaU2nzlPFk-niptA_r_phY9BqlATZv7EHrsAZavXrJxCqnfjurUcQued_SLt9R_frviTTwn7vvmIGpJd4v-J6NHCRJ-sa1OqjBJFVLtURF5vebXqfafRp0l8tXooOS_BAAik4gENPMDjKz6uf4_LDXnJsC6wNNbVKmWJtBD2wfzEI0ShabCg8gKjPZQDnE7OrRVHPiXNenCEQzgoaMA2NFqEUqTWE41RiCNG6F6l0eGv7yUdaj9m2i2Llea1EK6K',
        price: 850000,
        badge: 'POPULER',
        dimensions: null,
        sortOrder: 3,
      },
      {
        categoryId: papan.id,
        name: 'Batik Floral Board',
        slug: 'batik-floral-board',
        description: 'Traditional Java Pattern',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB9RTc4dgUqCDvlStw2RWwNQOduqzrXQbCYF3M5ARXKgG-_wJFbhwS5JnSlCwK63hSQRCzvM_RNvWh880C1Yq5E0Fflk74bZZ3C-oD-XIpCAmhv9_sMznNRcOD_h07-LesafyqL4OSOe-JYALkG-3htJ1Y2t8IRT59DIbvrFRCjanhtC-LBDTgeB4faCaXCdWTeak6nlagwo2rT8orEsLQ2u6pj5YQJ8bZaKkCuHbBPfJX6GDL721e4TB9TSGpgwRCXwWscAQNev0qy',
        price: 950000,
        badge: null,
        dimensions: null,
        sortOrder: 4,
      },
      {
        categoryId: papan.id,
        name: 'Golden Jubilee Special',
        slug: 'golden-jubilee-special',
        description: 'Gold Leaf Accents',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD1pSQqTUriWadN22deguYmTdKPTj9qv07Hc1p9fes5-lcplH8oDaNzY386L_k_iFBRZpmtvOQqliCm4c6cb9nsbVKh676xQsTNtUGlK14rAoRrwNVgx6u_JAPPnhSPPqW-apzYrWjrI8_B9B-l_pbnrBsJjunDhzarCRBCCV2cBTKsVvuKqTKK-hqjpQTSKmBKhiqKD0-rsinUR1MjjLh_JF6jUD-A9_z3gxfcRfrzMyjIR8kwqjsyh4FoFNbH3gnQkBaZIWX6XIyC',
        price: 2500000,
        badge: null,
        dimensions: null,
        sortOrder: 5,
      },
    ])
    .returning();

  console.log('  ✅ Products seeded');

  // ─── Product Tags ─────────────────────────────────────────
  await db.insert(productTags).values([
    // Magnolia
    { productId: insertedProducts[0].id, tag: 'Grand Opening' },
    { productId: insertedProducts[0].id, tag: 'Pernikahan' },
    // Classic Wedding Rosette
    { productId: insertedProducts[1].id, tag: 'Pernikahan' },
    // Serenity Condolence Board
    { productId: insertedProducts[2].id, tag: 'Duka Cita' },
    // Modern Congratulation Art
    { productId: insertedProducts[3].id, tag: 'Wisuda' },
    { productId: insertedProducts[3].id, tag: 'Grand Opening' },
    // Batik Floral Board
    { productId: insertedProducts[4].id, tag: 'Pernikahan' },
    { productId: insertedProducts[4].id, tag: 'Grand Opening' },
    // Golden Jubilee Special
    { productId: insertedProducts[5].id, tag: 'Pernikahan' },
  ]);

  console.log('  ✅ Product tags seeded');

  // ─── Shipping Zones ──────────────────────────────────────
  await db.insert(shippingZones).values([
    {
      name: 'Banyuwangi Kota',
      areaLabel: 'Pusat Kota',
      price: 0,
      isPopular: true,
      sortOrder: 0,
    },
    {
      name: 'Glagah',
      areaLabel: 'Area Wisata',
      price: 10000,
      isPopular: false,
      sortOrder: 1,
    },
    {
      name: 'Kalipuro',
      areaLabel: 'Area Pelabuhan',
      price: 15000,
      isPopular: false,
      sortOrder: 2,
    },
    {
      name: 'Giri',
      areaLabel: 'Area Kota',
      price: 10000,
      isPopular: false,
      sortOrder: 3,
    },
    {
      name: 'Kabat',
      areaLabel: 'Area Selatan',
      price: 15000,
      isPopular: false,
      sortOrder: 4,
    },
    {
      name: 'Licin',
      areaLabel: 'Area Pegunungan',
      price: 25000,
      isPopular: false,
      sortOrder: 5,
    },
  ]);

  console.log('  ✅ Shipping zones seeded');

  // ─── Shop Settings ───────────────────────────────────────
  await db.insert(shopSettings).values([
    {
      key: 'address',
      value: 'Jl. Brawijaya No. 12, Kel. Kebalenan, Kec. Banyuwangi, Jawa Timur 68411',
    },
    {
      key: 'operating_hours',
      value: 'Setiap Hari: 07.00 - 21.00 WIB',
    },
    {
      key: 'phone',
      value: '+62 812-3456-7890',
    },
    {
      key: 'whatsapp_url',
      value: 'https://wa.me/628123456789',
    },
  ]);

  console.log('  ✅ Shop settings seeded');

  console.log('\n🎉 Database seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
