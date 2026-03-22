import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface Message { id: string; name: string; email: string; message: string; isRead: boolean; createdAt: string; }

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setMessages(await api.getMessages());
    } catch (err: any) {
      setError(err.message || 'Gagal memuat pesan');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try {
      await api.markMessageRead(id); load();
    } catch (err: any) {
      setError(err.message || 'Gagal menandai pesan');
    }
  };
  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus pesan ini?')) {
      try {
        await api.deleteMessage(id); load();
      } catch (err: any) {
        setError(err.message || 'Gagal menghapus pesan');
      }
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold font-['Outfit'] text-emerald-900">Pesan Masuk</h2>
          {unreadCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unreadCount} baru</span>}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-red-600">error</span>
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600"><span className="material-symbols-outlined text-sm">close</span></button>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-400">Memuat...</div> : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`bg-white rounded-2xl border p-5 shadow-sm transition-all ${m.isRead ? 'border-gray-100' : 'border-emerald-200 bg-emerald-50/30'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900">{m.name}</h4>
                    {!m.isRead && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{m.email} · {new Date(m.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.message}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0 ml-4">
                  {!m.isRead && (
                    <button onClick={() => markRead(m.id)} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg" title="Tandai dibaca">
                      <span className="material-symbols-outlined text-lg">mark_email_read</span>
                    </button>
                  )}
                  <button onClick={() => handleDelete(m.id)} className="text-red-400 hover:bg-red-50 p-1.5 rounded-lg" title="Hapus">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && <div className="text-center py-12 text-gray-400">Belum ada pesan masuk</div>}
        </div>
      )}
    </div>
  );
}
