import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface Product {
  id: string; name: string; slug: string; price: number; badge: string | null;
  imageUrl: string | null; isActive: boolean; category: { name: string } | null;
  tags: { tag: string }[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', slug: '', categoryId: '', description: '', imageUrl: '',
    price: 0, badge: '', dimensions: '', isActive: true, tags: '',
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prods, cats] = await Promise.all([api.getProducts(), api.getCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: '', slug: '', categoryId: '', description: '', imageUrl: '', price: 0, badge: '', dimensions: '', isActive: true, tags: '' });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (p: Product) => {
    setForm({
      name: p.name, slug: p.slug, categoryId: (p.category as any)?.id || '',
      description: '', imageUrl: p.imageUrl || '', price: p.price,
      badge: p.badge || '', dimensions: '', isActive: p.isActive,
      tags: p.tags.map((t) => t.tag).join(', '),
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const data = {
      ...form,
      price: Number(form.price),
      badge: form.badge || null,
      dimensions: form.dimensions || null,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };

    try {
      if (editId) {
        await api.updateProduct(editId, data);
      } else {
        await api.createProduct(data);
      }
      resetForm();
      load();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan produk');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      setError(null);
      try {
        await api.deleteProduct(id);
        load();
      } catch (err: any) {
        setError(err.message || 'Gagal menghapus produk');
      }
    }
  };

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-['Outfit'] text-emerald-900">Produk</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-emerald-800 transition-colors">
          <span className="material-symbols-outlined text-sm">add</span>Tambah Produk
        </button>
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
          <h3 className="font-bold text-lg text-emerald-900 mb-4">{editId ? 'Edit Produk' : 'Produk Baru'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nama</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: autoSlug(e.target.value) })} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Kategori</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required>
                <option value="">Pilih kategori...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Harga (Rp)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">URL Gambar</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Badge</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}>
                <option value="">Tidak ada</option>
                <option value="PREMIUM">PREMIUM</option>
                <option value="POPULER">POPULER</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Tags (pisahkan koma)</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Pernikahan, Grand Opening" />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
              <label htmlFor="isActive" className="text-sm text-gray-600">Aktif (tampil di website)</label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium text-sm hover:bg-emerald-800 transition-colors">
                {editId ? 'Simpan' : 'Tambah'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors">Batal</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Memuat...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Produk</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Harga</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Tags</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl && <img src={p.imageUrl} className="w-10 h-10 rounded-lg object-cover" alt="" />}
                      <div>
                        <div className="font-medium text-gray-900">{p.name}</div>
                        {p.badge && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category?.name || '-'}</td>
                  <td className="px-4 py-3 font-medium text-emerald-700">Rp {p.price.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">{p.tags.map((t) => <span key={t.tag} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{t.tag}</span>)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isActive ? 'Aktif' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(p)} className="text-emerald-600 hover:text-emerald-800 p-1"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600 p-1 ml-1"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="text-center py-8 text-gray-400">Belum ada produk</div>}
        </div>
      )}
    </div>
  );
}
