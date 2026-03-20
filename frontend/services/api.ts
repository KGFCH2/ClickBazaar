export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  zip: string;
};

export type Order = {
  id: number;
  user_id: number;
  items: string;
  total: number;
  shipping_address: string;
  status: string;
  created_at: number;
  delivery_date?: number | null;
};

const json = async (res: Response) => {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const safeFetch = async (input: RequestInfo, init?: RequestInit) => {
  try {
    return await fetch(input, init);
  } catch (err: any) {
    // Network errors (e.g., backend offline) typically show as TypeError 'Failed to fetch'.
    throw new Error('Unable to reach backend API. Make sure the server is running (npm run dev).');
  }
};

export async function register(name: string, email: string, password: string, adminKey?: string) {
  const res = await safeFetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password, adminKey }),
  });
  if (!res.ok) throw new Error((await json(res))?.message || 'Registration failed');
  return (await json(res)) as { user: User };
}

export async function login(email: string, password: string, adminKey?: string) {
  const res = await safeFetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, adminKey }),
  });
  if (!res.ok) throw new Error((await json(res))?.message || 'Login failed');
  return (await json(res)) as { user: User };
}

export async function logout() {
  await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getMe() {
  const res = await safeFetch('/api/me', {
    credentials: 'include',
  });
  if (!res.ok) return null;
  return (await json(res)) as { user: User };
}

export async function fetchOrders() {
  const res = await safeFetch('/api/orders', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return (await json(res)) as { orders: Order[] };
}

export async function createOrder(payload: { items: any[]; total: number; shippingAddress: any; deliveryDate?: string }) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return (await json(res)) as { order: Order };
}

export async function fetchAdminUsers() {
  const res = await fetch('/api/admin/users', { credentials: 'include' });
  if (!res.ok) throw new Error('Not authorized');
  return (await json(res)) as { users: User[] };
}

export async function fetchAdminOrders() {
  const res = await safeFetch('/api/orders', { credentials: 'include' });
  if (!res.ok) throw new Error('Not authorized');
  return (await json(res)) as { orders: Order[] };
}

export async function changeUserRole(userId: number, role: 'admin' | 'customer') {
  const res = await fetch(`/api/admin/users/${userId}/role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error('Failed to update user role');
  return (await json(res)) as { success: boolean };
}

export async function fetchAuditLogs() {
  const res = await fetch('/api/admin/audit', { credentials: 'include' });
  if (!res.ok) throw new Error('Not authorized');
  return (await json(res)) as { logs: any[] };
}

export async function fetchSessionLogs() {
  const res = await fetch('/api/admin/sessions', { credentials: 'include' });
  if (!res.ok) throw new Error('Not authorized');
  return (await json(res)) as { sessions: any[] };
}
