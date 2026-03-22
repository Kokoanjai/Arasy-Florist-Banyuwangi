import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function AdminSettings() {
  const [form, setForm] = useState({ address: '', operating_hours: '', phone: '', whatsapp_url: '' });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getSettings().then((s) => {
      setForm({ address: s.address || '', operating_hours: s.operating_hours || '', phone: s.phone || '', whatsapp_url: s.whatsapp_url || '' });
      setLoading(false);
    }).catch((err: any) => {
      setError(err.message || 'Gagal memuat pengaturan');
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan pengaturan');
    }
  };

  if (loading) return <div className="text-center py-12 text-gray-400">Memuat...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold font-['Outfit'] text-emerald-900 mb-6">Pengaturan Toko</h2>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-2xl">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600">error</span>
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600"><span className="material-symbols-outlined text-sm">close</span></button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Operasional</label>
            <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.operating_hours} onChange={(e) => setForm({ ...form, operating_hours: e.target.value })} placeholder="Senin-Sabtu: 08:00 - 17:00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
            <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+62 812 3456 789" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL WhatsApp</label>
            <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.whatsapp_url} onChange={(e) => setForm({ ...form, whatsapp_url: e.target.value })} placeholder="https://wa.me/628123456789" />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium text-sm hover:bg-emerald-800">Simpan Pengaturan</button>
            {saved && <span className="text-emerald-600 text-sm font-medium flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span>Tersimpan!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
