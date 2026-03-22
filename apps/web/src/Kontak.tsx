import { useState, useEffect } from 'react';
import { api } from './lib/api';

interface ShopSettings {
  address: string;
  operating_hours: string;
  phone: string;
  whatsapp_url: string;
}

export default function Kontak() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [settings, setSettings] = useState<ShopSettings | null>(null);

  useEffect(() => {
    api.getSettings().then((s: ShopSettings) => setSettings(s)).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus('loading');
    try {
      await api.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="font-body selection:bg-primary-fixed selection:text-on-primary-fixed bg-surface min-h-screen text-on-surface antialiased">
      {/* Top Navigation (Unified) */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-emerald-950/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,101,44,0.04)] tonal-layering-no-border">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-emerald-900 font-['Outfit'] tracking-tight">Arasy Florist Banyuwangi</div>
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-emerald-900/60 font-medium hover:text-emerald-700 transition-colors" href="#/home">Beranda</a>
            <a className="text-emerald-900/60 font-medium hover:text-emerald-700 transition-colors" href="#/koleksi">Koleksi</a>
            <a className="text-emerald-900/60 font-medium hover:text-emerald-700 transition-colors" href="#/ongkir">Ongkir</a>
            <a className="text-emerald-700 border-b-2 border-amber-500 font-medium transition-colors" href="#/kontak">Kontak</a>
          </div>
          <a href="#/kontak" className="inline-block bg-primary-container text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all text-center">
            Pesan Sekarang
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        {/* Simplified Header */}
        <header className="text-center mb-20">
          <span className="font-label text-xs font-bold tracking-[0.2em] text-secondary mb-4 block uppercase">Hubungi Kami</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-on-background tracking-tight mb-6">
            Mari Berdiskusi
          </h1>
          <p className="max-w-xl mx-auto text-on-surface-variant text-lg leading-relaxed">
            Kami siap membantu kebutuhan Anda. Silakan hubungi kami melalui formulir atau kanal komunikasi yang tersedia.
          </p>
        </header>

        {/* Focused Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Workshop Information */}
          <section className="space-y-10 order-2 md:order-1">
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">Alamat Workshop</h3>
                  <p className="text-on-surface-variant leading-relaxed">{settings?.address || 'Memuat alamat...'}</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">Jam Operasional</h3>
                  <p className="text-on-surface-variant">{settings?.operating_hours || 'Memuat jam operasional...'}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container">
              <a className="flex items-center justify-center gap-3 bg-secondary text-white py-4 rounded-xl font-bold hover:bg-on-secondary-fixed-variant transition-colors shadow-lg shadow-secondary/10" href={settings?.whatsapp_url || '#'}>
                <span className="material-symbols-outlined">chat</span>
                Hubungi via WhatsApp
              </a>
              <p className="text-center text-xs text-on-surface-variant mt-4 italic">Respons cepat dalam 15-30 menit</p>
            </div>
          </section>

          {/* Contact Form */}
          <section className="bg-white p-8 md:p-10 rounded-3xl border border-surface-container shadow-[0_4px_12px_rgba(0,0,0,0.03)] order-1 md:order-2">
            <h2 className="font-display text-2xl font-bold mb-8 text-on-background">Kirim Pesan</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {status === 'success' && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-start gap-3">
                  <span className="material-symbols-outlined shrink-0 text-green-600">check_circle</span>
                  <p className="text-sm font-medium">Pesan berhasil dikirim! Kami akan segera merespons melalui email Anda.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-start gap-3">
                  <span className="material-symbols-outlined shrink-0 text-red-600">error</span>
                  <p className="text-sm font-medium">Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp.</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="font-label text-[10px] font-bold text-on-surface-variant tracking-wider uppercase px-1">Nama Lengkap</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-surface-container-lowest border border-surface-container rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-outline-variant transition-all outline-none" placeholder="Andi Wijaya" type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] font-bold text-on-surface-variant tracking-wider uppercase px-1">Email</label>
                <input required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-surface-container-lowest border border-surface-container rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-outline-variant transition-all outline-none" placeholder="andi@email.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] font-bold text-on-surface-variant tracking-wider uppercase px-1">Pesan</label>
                <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-surface-container-lowest border border-surface-container rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-outline-variant transition-all outline-none" placeholder="Tuliskan pesan Anda..." rows={4}></textarea>
              </div>
              <button disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#00652c] to-[#15803d] text-white py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20 hover:opacity-95 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                {status === 'loading' ? (
                  <>
                    <span className="material-symbols-outlined animate-spin" style={{ fontSize: '1.25rem' }}>progress_activity</span>
                    Mengirim...
                  </>
                ) : (
                  'Kirim Sekarang'
                )}
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Footer for Desktop */}
      <footer className="hidden md:block py-12 bg-surface-container-highest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/10 pt-12">
          <div className="text-xl font-bold font-['Outfit'] text-emerald-900 mb-4 md:mb-0">Arasy Florist Banyuwangi</div>
          <div className="flex gap-8 text-on-surface-variant text-sm">
            <a className="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
            <a className="hover:text-primary transition-colors" href="#">Syarat &amp; Ketentuan</a>
            <a className="hover:text-primary transition-colors" href="#">Shipping Info</a>
          </div>
          <p className="text-on-surface-variant text-sm mt-4 md:mt-0">© 2024 Arasy Florist Banyuwangi. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Navigation Shell (Aligned with rest of App) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-emerald-900/80 backdrop-blur-xl rounded-t-3xl z-50 shadow-[0_-4px_20px_rgba(0,101,44,0.08)] bg-surface-container md:hidden">
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/home">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Beranda</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/koleksi">
          <span className="material-symbols-outlined">local_florist</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Galeri</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/50 px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 tap-highlight-transparent active:scale-90 transition-transform" href="#/ongkir">
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Ongkir</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-amber-200 rounded-2xl px-4 py-2 tap-highlight-transparent active:scale-90 transition-transform" href="#/kontak">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
          <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-widest mt-1">Kontak</span>
        </a>
      </nav>
    </div>
  );
}
