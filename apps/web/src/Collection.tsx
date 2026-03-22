import { useState, useEffect } from 'react';
import { api } from './lib/api';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  badge: string | null;
  imageUrl: string | null;
  isActive: boolean;
  category: { name: string } | null;
  tags: { tag: string }[];
}

export default function Collection() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prods, cats] = await Promise.all([
          api.getPublicProducts(),
          api.getCategories()
        ]);
        setProducts(prods.filter((p: any) => p.isActive));
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load collection data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const FILTERS = ['Semua', ...categories.map(c => c.name)];

  const filteredProducts =
    activeFilter === 'Semua'
      ? products
      : products.filter((p) => p.category?.name === activeFilter || p.tags.some(t => t.tag === activeFilter));

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      {/* Top Navigation Bar (Shared Component) */}
      <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-emerald-950/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,101,44,0.04)] tonal-layering-no-border">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 font-['Outfit'] tracking-tight">
            Arasy Florist Banyuwangi
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="text-emerald-900/60 dark:text-emerald-100/60 font-['Outfit'] font-bold tracking-tight hover:text-emerald-700 dark:hover:text-amber-300 transition-colors" href="#/home">Beranda</a>
            <a className="text-emerald-700 dark:text-amber-400 border-b-2 border-amber-500 font-['Outfit'] font-bold tracking-tight" href="#/koleksi">Koleksi</a>
            <a className="text-emerald-900/60 dark:text-emerald-100/60 font-['Outfit'] font-bold tracking-tight hover:text-emerald-700 dark:hover:text-amber-300 transition-colors" href="#/ongkir">Ongkir</a>
            <a className="text-emerald-900/60 dark:text-emerald-100/60 font-['Outfit'] font-bold tracking-tight hover:text-emerald-700 dark:hover:text-amber-300 transition-colors" href="#/kontak">Kontak</a>
          </nav>
          <a href="#/kontak" className="inline-block bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-['Outfit'] font-bold transition-transform scale-95 duration-200 hover:scale-100 shadow-sm text-center">
            Pesan Sekarang
          </a>
        </div>
      </header>

      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-8">
          <a href="#/home" className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-primary hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
          <div>
            <span className="font-label text-xs font-medium uppercase tracking-widest text-primary/60">KATEGORI UTAMA</span>
            <h1 className="font-display text-4xl font-extrabold text-primary tracking-tight">Papan Bunga</h1>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <a
                key={product.slug}
                href={`#/produk/${product.slug}`}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,101,44,0.04)] transition-transform hover:-translate-y-1 block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product.name}
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=500&fit=crop'}
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-secondary-container/90 backdrop-blur-sm text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-on-surface leading-tight mb-2">{product.name}</h3>
                  <p className="font-body text-xs text-on-surface-variant mb-4">{product.description || '\u00A0'}</p>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">Mulai dari</span>
                    <span className="text-secondary font-bold text-lg">Rp {product.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 block">search_off</span>
            <h3 className="font-display text-xl font-bold text-on-surface-variant mb-2">Belum ada produk</h3>
            <p className="text-on-surface-variant text-sm">Belum ada produk untuk kategori "{activeFilter}"</p>
          </div>
        )}

        {/* Pagination / Load More */}
        <div className="mt-16 mb-8 flex justify-end">
          <button className="flex items-center gap-2 font-display font-bold text-primary group">
            Lihat Koleksi Lainnya
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation Bar (Shared Component) */}
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
