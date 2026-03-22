import { useState } from 'react';
import { api, setToken } from '../lib/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token } = await api.login(password);
      setToken(token);
      window.location.hash = '#/admin';
    } catch {
      setError('Password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-emerald-700">admin_panel_settings</span>
          </div>
          <h1 className="font-['Outfit'] text-2xl font-bold text-emerald-900">Admin Panel</h1>
          <p className="text-emerald-600 text-sm mt-1">Arasy Florist Banyuwangi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Masukkan password admin"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3 rounded-xl font-bold hover:bg-emerald-800 disabled:opacity-50 transition-all"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <a href="#/home" className="block text-center text-emerald-600 text-sm mt-6 hover:underline">
          ← Kembali ke Website
        </a>
      </div>
    </div>
  );
}
