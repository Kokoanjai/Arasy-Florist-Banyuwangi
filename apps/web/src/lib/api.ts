const API_BASE = 'http://localhost:3001/api';

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('admin_token');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    clearToken();
    window.location.hash = '#/admin/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return res.json();
}

export const api = {
  // Auth
  login: (password: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),

  // Products
  getProducts: () => request('/products/admin/all'),
  getPublicProducts: (params?: string) => request(`/products${params ? `?${params}` : ''}`),
  getProductBySlug: (slug: string) => request(`/products/${slug}`),
  createProduct: (data: Record<string, unknown>) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: string, data: Record<string, unknown>) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: string) => request(`/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (data: Record<string, unknown>) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: string, data: Record<string, unknown>) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: string) => request(`/categories/${id}`, { method: 'DELETE' }),

  // Shipping Zones
  getShippingZones: (search?: string) => request(`/shipping-zones${search ? `?search=${search}` : ''}`),
  createShippingZone: (data: Record<string, unknown>) => request('/shipping-zones', { method: 'POST', body: JSON.stringify(data) }),
  updateShippingZone: (id: string, data: Record<string, unknown>) => request(`/shipping-zones/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteShippingZone: (id: string) => request(`/shipping-zones/${id}`, { method: 'DELETE' }),

  // Settings
  getSettings: () => request('/settings'),
  updateSettings: (data: Record<string, string>) => request('/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // Contact Messages
  getMessages: () => request('/contact'),
  submitContact: (data: { name: string; email: string; message: string }) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  markMessageRead: (id: string) => request(`/contact/${id}/read`, { method: 'PUT' }),
  deleteMessage: (id: string) => request(`/contact/${id}`, { method: 'DELETE' }),
};
