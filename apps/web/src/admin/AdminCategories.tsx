import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface Category { id: string; name: string; slug: string; description: string | null; imageUrl: string | null; sortOrder: number; }

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', imageUrl: '', sortOrder: 0 });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setCategories(await api.getCategories());
    } catch (err: any) {
      setError(err.message || 'Gagal memuat kategori');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ name: '', slug: '', description: '', imageUrl: '', sortOrder: 0 }); setEditId(null); setShowForm(false); };
  const autoSlug = (n: string) => n.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  const handleEdit = (c: Category) => {
    setForm({ name: c.name, slug: c.slug, description: c.description || '', imageUrl: c.imageUrl || '', sortOrder: c.sortOrder });
    setEditId(c.id); setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('https://api.imgbb.com/1/upload?key=41a0de5ac8275aca869b751eb8622516', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) setForm({ ...form, imageUrl: data.data.url });
      else throw new Error(data.error?.message || 'Gagal mengupload gambar');
    } catch (err: any) {
      setError(err.message || 'Error saat mengupload gambar');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editId) { await api.updateCategory(editId, form); } else { await api.createCategory(form); }
      resetForm(); load();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan kategori');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin? Semua produk di kategori ini juga akan terhapus.')) {
      setError(null);
      try {
        await api.deleteCategory(id); load();
      } catch (err: any) {
        setError(err.message || 'Gagal menghapus kategori');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-['Outfit'] text-emerald-900">Kategori</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-emerald-800"><span className="material-symbols-outlined text-sm">add</span>Tambah Kategori</button>
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
          <h3 className="font-bold text-lg text-emerald-900 mb-4">{editId ? 'Edit Kategori' : 'Kategori Baru'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nama</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: autoSlug(e.target.value) })} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Deskripsi</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Upload Gambar (Otomatis Tersimpan)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 outline-none" 
                />
                {uploading && <span className="text-sm text-emerald-600 font-medium animate-pulse">Mengupload...</span>}
              </div>
              {form.imageUrl && (
                <div className="mt-3 relative inline-block">
                  <img src={form.imageUrl} alt="Preview" className="h-24 w-24 object-cover rounded-xl border border-gray-200 shadow-sm" />
                  <button type="button" onClick={() => setForm({ ...form, imageUrl: '' })} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 shadow hover:bg-red-200">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              )}
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium text-sm hover:bg-emerald-800">{editId ? 'Simpan' : 'Tambah'}</button>
              <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-medium text-sm hover:bg-gray-200">Batal</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-400">Memuat...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              {c.imageUrl && <img src={c.imageUrl} className="w-full h-32 object-cover rounded-xl mb-3" alt={c.name} />}
              <h3 className="font-bold text-gray-900">{c.name}</h3>
              <p className="text-xs text-gray-400 mb-2">/{c.slug}</p>
              <p className="text-sm text-gray-500 mb-4">{c.description || 'Tidak ada deskripsi'}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(c)} className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-600 text-sm font-medium">Hapus</button>
              </div>
            </div>
          ))}
          {categories.length === 0 && <div className="col-span-3 text-center py-8 text-gray-400">Belum ada kategori</div>}
        </div>
      )}
    </div>
  );
}
