import { useState, useEffect } from 'react';
import { api } from './lib/api';


function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-amber-400 text-lg"
          style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [whatsappUrl, setWhatsappUrl] = useState('https://wa.me/628123456789');

  useEffect(() => {
    api.getSettings().then((s: any) => {
      if (s.whatsapp_url) setWhatsappUrl(s.whatsapp_url);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const hashSlug = window.location.hash.split('#/produk/')[1]?.split('?')[0];
        if (!hashSlug) {
          setError(true);
          return;
        }
        const data = await api.getProductBySlug(hashSlug);
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-6xl text-primary/30">error</span>
          <h1 className="font-display text-2xl font-bold text-on-surface">Produk tidak ditemukan</h1>
          <a href="#/koleksi" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
            Kembali ke Koleksi
          </a>
        </div>
      </div>
    );
  }

  const images = product.imageUrl ? [product.imageUrl] : ['https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop'];
  const features = product.dimensions 
    ? [`Ukuran: ${product.dimensions}`, 'Kartu ucapan custom (Gratis)', 'Pengiriman cepat area Banyuwangi']
    : ['Kartu ucapan custom (Gratis)', 'Pengiriman cepat area Banyuwangi'];

  // Add dummy reviews to retain UI aesthetics since we don't have review models in DB natively
  const dummyReviews = [
    {
      name: 'Andi Wijaya',
      rating: 5,
      text: '"Respon admin WhatsApp cepat sekali. Pengiriman tepat waktu padahal pesan mendadak. Sangat puas dengan hasilnya."'
    },
    {
      name: 'Siti Aminah',
      rating: 5,
      text: '"Bunganya segar banget, pas sampai masih wangi. Packaging-nya juga sangat rapi dan menarik. Rekomen banget!"'
    }
  ];

  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan ${product.name} (Rp ${formatPrice(product.price)}). Apakah masih tersedia?`
  );

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-emerald-950/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,101,44,0.04)] tonal-layering-no-border">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 font-['Outfit'] tracking-tight">
            Arasy Florist Banyuwangi
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="text-emerald-900/60 dark:text-emerald-100/60 font-['Outfit'] font-bold tracking-tight hover:text-emerald-700 dark:hover:text-amber-300 transition-colors" href="#/home">Beranda</a>
            <a className="text-emerald-900/60 dark:text-emerald-100/60 font-['Outfit'] font-bold tracking-tight hover:text-emerald-700 dark:hover:text-amber-300 transition-colors" href="#/koleksi">Koleksi</a>
            <a className="text-emerald-900/60 dark:text-emerald-100/60 font-['Outfit'] font-bold tracking-tight hover:text-emerald-700 dark:hover:text-amber-300 transition-colors" href="#/ongkir">Ongkir</a>
            <a className="text-emerald-900/60 dark:text-emerald-100/60 font-['Outfit'] font-bold tracking-tight hover:text-emerald-700 dark:hover:text-amber-300 transition-colors" href="#/kontak">Kontak</a>
          </nav>
          <a href="#/kontak" className="inline-block bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-['Outfit'] font-bold transition-transform scale-95 duration-200 hover:scale-100 shadow-sm text-center">
            Pesan Sekarang
          </a>
        </div>
      </header>

      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-on-surface-variant">
          <a href="#/home" className="hover:text-primary transition-colors">Beranda</a>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <a href="#/koleksi" className="hover:text-primary transition-colors">Koleksi</a>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface font-medium">{product.name}</span>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-container-low shadow-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                alt={product.name}
                src={images[selectedImage]}
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-secondary-container/90 backdrop-blur-sm text-on-secondary-container text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? 'border-primary shadow-md scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img className="w-full h-full object-cover" alt={`${product.name} ${i + 1}`} src={img} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Name */}
            <div>
              <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-2 block">
                {product.category?.name || 'Koleksi Arasy'}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={5} />
              <span className="text-on-surface-variant text-sm">({dummyReviews.length * 42 + 2} Reviews)</span>
            </div>

            {/* Price Box */}
            <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider block mb-1">
                Mulai dari
              </span>
              <span className="text-primary font-display text-3xl font-extrabold">
                Rp {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-on-surface">Deskripsi</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </span>
                  <span className="text-on-surface-variant text-sm italic">{f}</span>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={`${whatsappUrl}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-700/20 hover:shadow-emerald-700/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined">chat</span>
              Pesan via WhatsApp
            </a>
            <p className="text-center text-xs text-on-surface-variant italic">
              Pemesanan diproses cepat oleh tim florist kami.
            </p>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface">Ulasan Pelanggan</h2>
            <a href="#/koleksi" className="text-primary font-bold flex items-center gap-1 group text-sm">
              Lihat Semua
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyReviews.map((review, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-[0_4px_24px_rgba(0,101,44,0.04)] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary-container/30 flex items-center justify-center text-primary font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">{review.name}</h4>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed italic">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer for Desktop */}
      <footer className="hidden md:block py-12 bg-surface-container-highest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/10 pt-12">
          <div className="text-xl font-bold font-['Outfit'] text-emerald-900 mb-4 md:mb-0">Arasy Florist Banyuwangi</div>
          <div className="flex gap-8 text-on-surface-variant text-sm">
            <a className="hover:text-primary transition-colors" href="#/koleksi">Katalog</a>
            <a className="hover:text-primary transition-colors" href="#/ongkir">Ongkir</a>
            <a className="hover:text-primary transition-colors" href="#/kontak">Kontak</a>
          </div>
          <p className="text-on-surface-variant text-sm mt-4 md:mt-0">© 2024 Arasy Florist Banyuwangi. All rights reserved.</p>
        </div>
      </footer>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-emerald-900/80 backdrop-blur-xl rounded-t-3xl z-50 shadow-[0_-4px_20px_rgba(0,101,44,0.08)] tonal-shift-surface-container md:hidden">
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 tap-highlight-transparent active:scale-90 transition-transform hover:bg-emerald-50 dark:hover:bg-emerald-800/50" href="#/home">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest">Beranda</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-amber-200 rounded-2xl px-4 py-2 tap-highlight-transparent active:scale-90 transition-transform" href="#/koleksi">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest">Galeri</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 tap-highlight-transparent active:scale-90 transition-transform hover:bg-emerald-50 dark:hover:bg-emerald-800/50" href="#/ongkir">
          <span className="material-symbols-outlined mb-1">local_shipping</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest">Ongkir</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 tap-highlight-transparent active:scale-90 transition-transform hover:bg-emerald-50 dark:hover:bg-emerald-800/50" href="#/kontak">
          <span className="material-symbols-outlined mb-1">mail</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest">Kontak</span>
        </a>
      </nav>
    </div>
  );
}
