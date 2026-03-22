import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface Zone { id: string; name: string; areaLabel: string | null; price: number; isPopular: boolean; sortOrder: number; }

export default function AdminShipping() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', areaLabel: '', price: 0, isPopular: false, sortOrder: 0 });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setZones(await api.getShippingZones());
    } catch (err: any) {
      setError(err.message || 'Gagal memuat zona ongkir');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ name: '', areaLabel: '', price: 0, isPopular: false, sortOrder: 0 }); setEditId(null); setShowForm(false); };

  const handleEdit = (z: Zone) => {
    setForm({ name: z.name, areaLabel: z.areaLabel || '', price: z.price, isPopular: z.isPopular, sortOrder: z.sortOrder });
    setEditId(z.id); setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const data = { ...form, price: Number(form.price), sortOrder: Number(form.sortOrder) };
    try {
      if (editId) { await api.updateShippingZone(editId, data); } else { await api.createShippingZone(data); }
      resetForm(); load();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan zona ongkir');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus zona ini?')) {
      setError(null);
      try {
        await api.deleteShippingZone(id); load();
      } catch (err: any) {
        setError(err.message || 'Gagal menghapus zona');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-['Outfit'] text-emerald-900">Zona Ongkir</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-emerald-800"><span className="material-symbols-outlined text-sm">add</span>Tambah Zona</button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-red-600">error</span>
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600"><span className="material-symbols-outlined text-sm">close</span></button>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-lg text-emerald-900 mb-4">{editId ? 'Edit Zona' : 'Zona Baru'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nama Zona</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Label Area</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.areaLabel} onChange={(e) => setForm({ ...form, areaLabel: e.target.value })} placeholder="co: Kecamatan Banyuwangi" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Harga Ongkir (Rp, 0 = gratis)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
            <div className="flex items-center gap-2 self-end pb-2">
              <input type="checkbox" id="isPopular" checked={form.isPopular} onChange={(e) => setForm({ ...form, isPopular: e.target.checked })} className="rounded" />
              <label htmlFor="isPopular" className="text-sm text-gray-600">Zona populer</label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium text-sm hover:bg-emerald-800">{editId ? 'Simpan' : 'Tambah'}</button>
              <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-medium text-sm hover:bg-gray-200">Batal</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-400">Memuat...</div> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Zona</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Area</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Ongkir</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Populer</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z) => (
                <tr key={z.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">{z.name}</td>
                  <td className="px-4 py-3 text-gray-500">{z.areaLabel || '-'}</td>
                  <td className="px-4 py-3 font-medium text-emerald-700">{z.price === 0 ? 'GRATIS' : `Rp ${z.price.toLocaleString('id-ID')}`}</td>
                  <td className="px-4 py-3">{z.isPopular ? <span className="text-amber-500">★</span> : '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(z)} className="text-emerald-600 hover:text-emerald-800 p-1"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={() => handleDelete(z.id)} className="text-red-400 hover:text-red-600 p-1 ml-1"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {zones.length === 0 && <div className="text-center py-8 text-gray-400">Belum ada zona ongkir</div>}
        </div>
      )}
    </div>
  );
}
