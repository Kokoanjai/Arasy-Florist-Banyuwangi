import { useState, useEffect } from 'react';
import { api } from './lib/api';

interface ShippingZone {
  id: string;
  name: string;
  price: number;
}

export default function Ongkir() {
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const data = await api.getShippingZones();
        setZones(data);
      } catch (err) {
        console.error('Failed to load shipping zones', err);
      } finally {
        setLoading(false);
      }
    };
    fetchZones();
  }, []);

  const filteredZones = zones.filter((z) =>
    z.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-body selection:bg-primary-fixed selection:text-on-primary-fixed bg-surface min-h-screen text-on-surface antialiased">
      {/* Top Navigation Bar (Updated) */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-emerald-950/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,101,44,0.04)] tonal-layering-no-border">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-emerald-900 font-['Outfit'] tracking-tight">Arasy Florist Banyuwangi</div>
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-emerald-900/60 font-medium hover:text-emerald-700 transition-colors" href="#/home">Beranda</a>
            <a className="text-emerald-900/60 font-medium hover:text-emerald-700 transition-colors" href="#/koleksi">Koleksi</a>
            <a className="text-emerald-700 border-b-2 border-amber-500 font-medium transition-colors" href="#/ongkir">Ongkir</a>
            <a className="text-emerald-900/60 font-medium hover:text-emerald-700 transition-colors" href="#/kontak">Kontak</a>
          </div>
          <a href="#/kontak" className="hidden sm:inline-block border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-white px-5 py-2 rounded-lg font-semibold transition-all active:scale-95 text-sm text-center">
            Pesan Sekarang
          </a>
        </div>
      </nav>

      <main className="pt-28 pb-32 px-6 max-w-5xl mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            Cek Ongkir <span className="text-primary">(Area Layanan)</span>
          </h1>
          <p className="text-on-surface-variant mt-4 max-w-2xl leading-relaxed font-body">
            Kami melayani pengiriman bunga segar ke seluruh wilayah Banyuwangi. Temukan biaya pengiriman terbaik untuk lokasi Anda di bawah ini.
          </p>
        </header>

        {/* Search and Filter Bar */}
        <div className="relative group mb-12">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-primary/60" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>search</span>
          </div>
          <input 
            className="w-full bg-surface-container-low border-none rounded-2xl py-5 pl-14 pr-6 text-on-surface focus:ring-2 focus:ring-secondary/40 transition-all shadow-sm font-body outline-none placeholder:text-on-surface-variant/50" 
            placeholder="Cari kecamatan Anda (misal: Glagah, Licin...)" 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Info Note Section */}
        <div className="bg-primary-container/5 rounded-2xl p-6 mb-10 flex items-start gap-4">
          <span className="material-symbols-outlined text-primary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <div>
            <h4 className="font-headline font-bold text-primary mb-1">Estimasi Pengiriman</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Pengiriman 3-5 jam setelah pesanan dikonfirmasi. Untuk pemesanan khusus atau mendadak, silakan hubungi admin kami melalui WhatsApp.
            </p>
          </div>
        </div>

        {/* Ongkir Grid (Bento Style Layout) */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredZones.map((zone) => (
              <div key={zone.id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,101,44,0.04)] border border-outline-variant/10 hover:shadow-lg transition-all group overflow-hidden relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-primary/5 p-3 rounded-xl text-primary">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  {/* Highlight Banyuwangi Kota as typical popular area context if needed, but omitted here */}
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-2">{zone.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary/40 text-sm">location_on</span>
                  <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wide">Area Pengiriman</span>
                </div>
                <div className="mt-8 flex items-baseline gap-1">
                  {zone.price === 0 ? (
                    <span className="text-2xl font-bold text-primary">Gratis Ongkir</span>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-on-surface-variant">Rp</span>
                      <span className="text-2xl font-bold text-primary">{new Intl.NumberFormat('id-ID').format(zone.price)}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredZones.length === 0 && (
          <div className="text-center py-10">
            <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 block">search_off</span>
            <p className="text-on-surface-variant">Area pengiriman "{search}" tidak ditemukan.</p>
          </div>
        )}

        {/* Extra CTA / Banner */}
        <div className="mt-16 bg-primary rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="z-10 text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold mb-4 tracking-tight">Butuh Kirim Cepat?</h2>
            <p className="text-primary-fixed-dim/80 max-w-md font-body">Hubungi admin kami untuk layanan pengiriman kilat di hari yang sama untuk kejutan spesial Anda.</p>
          </div>
          <a href="#/kontak" className="inline-block z-10 bg-secondary-container text-on-secondary-container font-headline font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform text-center">
            Chat Admin Sekarang
          </a>
        </div>
      </main>

      {/* Footer for Desktop */}
      <footer className="hidden md:block py-12 bg-surface-container-highest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/10 pt-12">
          <div className="text-xl font-bold font-['Outfit'] text-emerald-900 mb-4 md:mb-0">Arasy Florist Banyuwangi</div>
          <div className="flex gap-8 text-on-surface-variant text-sm">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Shipping Info</a>
          </div>
          <p className="text-on-surface-variant text-sm mt-4 md:mt-0">© 2024 Arasy Florist Banyuwangi. All rights reserved.</p>
        </div>
      </footer>

      {/* Bottom Navigation Bar (Visible on Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-emerald-900/80 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,101,44,0.08)] rounded-t-3xl z-50 flex justify-around items-center px-4 pb-6 pt-3 md:hidden">
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/home">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Beranda</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/koleksi">
          <span className="material-symbols-outlined">local_florist</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Katalog</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-amber-200 rounded-2xl px-4 py-2 tap-highlight-transparent active:scale-90 transition-transform" href="#/ongkir">
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Ongkir</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/kontak">
          <span className="material-symbols-outlined">mail</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Kontak</span>
        </a>
      </nav>
    </div>
  );
}
