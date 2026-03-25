import { useState, useEffect } from 'react';
import { api } from './lib/api';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
}

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<{ address: string; operating_hours: string; phone: string; whatsapp_url: string } | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    api.getSettings().then((s: any) => setSettings(s)).catch(console.error);
  }, []);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,101,44,0.04)] tonal-layering-no-border">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-emerald-900 font-['Outfit'] tracking-tight">Arasy florist Banyuwangi</div>
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-emerald-700 border-b-2 border-amber-500 font-medium transition-colors" href="#/home">Beranda</a>
            <a className="text-emerald-900/60 hover:text-emerald-700 transition-colors" href="#/koleksi">Koleksi</a>
            <a className="text-emerald-900/60 hover:text-emerald-700 transition-colors" href="#/ongkir">Ongkir</a>
            <a className="text-emerald-900/60 hover:text-emerald-700 transition-colors" href="#/kontak">Kontak</a>
          </div>
          <a href="#/kontak" className="hidden sm:inline-block border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-white px-5 py-2 rounded-lg font-semibold transition-all active:scale-95 text-sm text-center">
            Pesan Sekarang
          </a>
        </div>
      </nav>

      <main className="pt-20 pb-32 font-body selection:bg-secondary-container/30 text-on-surface antialiased">
        {/* Hero Section */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="hero-gradient rounded-[2rem] overflow-hidden relative min-h-[500px] flex items-center">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <img
                alt="Deep green tropical forest foliage background"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTzERtkR26r5rEEbSN2DygRRqI7kkp3yAusRg-Oo5ALPJ6ZvCuA9i0uGKkJQM1wrddcOz9pR8HPL2NYMwjTUnDGjcUxkuIdt6rWnPzAX5mruk-JdWmbuSW1kShHP7PPzvHzioegHZQbACCNc7sN5aS4p4AFJQga5se9wpYkPM6z9U8o7jZOge8MCP7qK4VrTD2RdOUSaX_y9Vhmn_NeDN2GzpkHjBsuekJBQyjzqGuj_8rw0oMz_i1Hw-4kSh0_IIaNtPvw7Yjrczp"
              />
            </div>
            <div className="relative z-10 px-8 md:px-16 max-w-2xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[0.75rem] font-bold tracking-widest uppercase mb-6">
                Fresh From Banyuwangi
              </div>
              <h1 className="text-4xl md:text-6xl font-['Outfit'] font-extrabold text-white leading-tight mb-6">
                Karangan Bunga Segar Banyuwangi
              </h1>
              <p className="text-white/80 text-lg mb-8 font-body leading-relaxed">
                Sampaikan pesan bermakna melalui keindahan kelopak bunga pilihan yang dirangkai dengan sepenuh hati oleh florist lokal.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#/koleksi" className="inline-block bg-white text-primary px-8 py-3.5 rounded-lg font-bold shadow-xl hover:bg-surface-container-low transition-all active:scale-95 text-center">
                  Lihat Katalog
                </a>
              </div>
            </div>
            {/* Asymmetric Floating Image */}
            <div className="hidden lg:block absolute right-[-5%] bottom-[-10%] w-1/2 h-full rotate-[-5deg]">
              <img
                alt="Luxury white and pink floral arrangement"
                className="w-full h-full object-contain drop-shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLdl7TDdnfi1fGxTyI993-J8Av-_pYZgl0KJwED6_yg4czRZFCH7y-ccm8pmFeGsYrDKXE-jZ3ptyJHR91inQUGejaMTkJL_2hTO66WTAWO7OywxzQiKttaNo80L8W_l--pRAAr4lRGBXP08hPJ2mXBs2q5JXyCDxNbSp-TNKbDlvV3vbVWmI6KayQyhzOPtR7WGpIEWuckz5fgvIQ6PmXt8XGm5hU74S87uYxITFU9izTTcOnEOZSzzM7PcIsAakMkey9eolFnrLE"
              />
            </div>
          </div>
        </section>

        {/* Categories Section (Editorial Layout) */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-['Outfit'] font-bold text-on-surface">Kategori Pilihan</h2>
              <p className="text-on-surface-variant mt-2">Pilih rangkaian yang sesuai dengan momen Anda</p>
            </div>
            <a className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1" href="#/koleksi">Semua Kategori</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 flex justify-center py-10">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin"></div>
              </div>
            ) : categories.length > 0 ? (
              categories.slice(0, 3).map((category, idx) => (
                <a key={category.id} href={`#/koleksi?kategori=${category.slug}`} className={`group cursor-pointer block ${idx === 1 ? 'md:mt-12' : ''}`}>
                  <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 bg-surface-container-low transition-transform duration-500 group-hover:scale-[1.02]">
                    <img
                      alt={category.name}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                      src={category.imageUrl || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=500&fit=crop'}
                    />
                  </div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-on-surface">{category.name}</h3>
                  <p className="text-on-surface-variant text-sm">{category.description || 'Koleksi spesial'}</p>
                </a>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">Belum ada kategori.</div>
            )}
          </div>
        </section>

        {/* Shop Info Section */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl relative">
              <img
                alt="Interior of a luxury boutique flower shop"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeWsvCcnyCWL2pL-EWK0bQoXC7YDcmRLVMUzfMZZSTGVLnI5Z80iP40H29tpz40kymK4itlZTElCFO4FJDlMtOXwOinWSrRX1YpiuFqYWWN6UhL6nEJ2Tuh_EkfLaK_1LW5KFmrVL4k7k4xZiBMV8FoE5C_aAc8hH_py4x1SYO9_U3OsaM2QxpuibUk3RdLO79NazXJzGzt3SF4-mn9ITtK7Joky8A4yr0Na89fZ4IZ7eOD42Zw03q-6tPO161zAnIsLO20u5ZtQD8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-lg">Workshop Kami</p>
                  <p className="text-sm opacity-80">Jl.candra Kirana asri blok C12 Banyuwangi, Jawa Timur 68418</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-['Outfit'] font-extrabold text-on-surface">Kunjungi katalog kami melalui</h2>

              <a href="#/kontak" className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 w-fit mt-12 group text-center">
                Order Sekarang
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                  </div>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings?.address || 'Jl.candra Kirana asri blok C12 Banyuwangi, Jawa Timur 68418')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors cursor-pointer block"
                  >
                    <h4 className="font-bold text-lg font-['Outfit']">Alamat</h4>
                    <p className="text-on-surface-variant underline decoration-dotted decoration-primary/30 underline-offset-4">{settings?.address || 'Jl.candra Kirana asri blok C12 Banyuwangi, Jawa Timur 68418'}</p>
                  </a>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-['Outfit']">Jam Operasional</h4>
                    <p className="text-on-surface-variant">{settings?.operating_hours || '24 jam'}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-['Outfit']">Hubungi Kami</h4>
                    <p className="text-on-surface-variant">{settings?.phone || '+62 85228727778'} (WhatsApp Available)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-emerald-900/80 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,101,44,0.08)] rounded-t-3xl z-50 flex justify-around items-center px-4 pb-6 pt-3 md:hidden">
        <a className="flex flex-col items-center justify-center bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-amber-200 rounded-2xl px-4 py-2 tap-highlight-transparent active:scale-90 transition-transform" href="#/home">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Beranda</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/koleksi">
          <span className="material-symbols-outlined">local_florist</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Katalog</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/ongkir">
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Ongkir</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/kontak">
          <span className="material-symbols-outlined">mail</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Kontak</span>
        </a>
      </nav>

      {/* Footer for Desktop */}
      <footer className="hidden md:block py-12 bg-surface-container-highest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/10 pt-12">
          <div className="text-xl font-bold font-['Outfit'] text-emerald-900 mb-4 md:mb-0">BungaBanyuwangi</div>
          <div className="flex gap-8 text-on-surface-variant text-sm">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Shipping Info</a>
          </div>
          <p className="text-on-surface-variant text-sm mt-4 md:mt-0">© 2024 Arasy florist Banyuwangi. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
