import { isLoggedIn, clearToken } from '../lib/api';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminShipping from './AdminShipping';
import AdminSettings from './AdminSettings';
import AdminMessages from './AdminMessages';
import AdminLogin from './AdminLogin';

const MENU = [
  { key: 'products', label: 'Produk', icon: 'inventory_2' },
  { key: 'categories', label: 'Kategori', icon: 'category' },
  { key: 'shipping', label: 'Ongkir', icon: 'local_shipping' },
  { key: 'settings', label: 'Pengaturan', icon: 'settings' },
  { key: 'messages', label: 'Pesan', icon: 'mail' },
];

function getAdminPage(): string {
  const hash = window.location.hash;
  if (hash.startsWith('#/admin/')) {
    return hash.replace('#/admin/', '');
  }
  return 'products';
}

export default function Admin() {
  if (!isLoggedIn()) {
    return <AdminLogin />;
  }

  const page = getAdminPage();

  const handleLogout = () => {
    clearToken();
    window.location.hash = '#/admin/login';
    window.location.reload();
  };

  const renderPage = () => {
    switch (page) {
      case 'products': return <AdminProducts />;
      case 'categories': return <AdminCategories />;
      case 'shipping': return <AdminShipping />;
      case 'settings': return <AdminSettings />;
      case 'messages': return <AdminMessages />;
      default: return <AdminProducts />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-gray-100">
          <h1 className="font-['Outfit'] text-lg font-bold text-emerald-900">Arasy Florist</h1>
          <p className="text-xs text-gray-400 mt-0.5">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {MENU.map((item) => (
            <a
              key={item.key}
              href={`#/admin/${item.key}`}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                page === item.key
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <span className="material-symbols-outlined text-lg" style={page === item.key ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <a href="#/home" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-emerald-700 transition-colors rounded-xl hover:bg-gray-50">
            <span className="material-symbols-outlined text-lg">open_in_new</span>
            Lihat Website
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50 w-full">
            <span className="material-symbols-outlined text-lg">logout</span>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {renderPage()}
      </main>
    </div>
  );
}
