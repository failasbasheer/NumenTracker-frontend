export const API_BASE = "https://numentracker.onrender.com";



// Auth headers helper
export const authHeaders = (): Record<string, string> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// ----------------- Auth -----------------
export interface AuthResponse {
  token: string;
  name?: string;
  phone?: string;
}

export const signup = async (name: string, phone: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
};

export const login = async (phone: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

// ----------------- Transactions -----------------
export interface Transaction {
  _id?: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${API_BASE}/transactions`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch transactions");
  return data;
};

export const addTransaction = async (tx: Transaction): Promise<Transaction> => {
  const res = await fetch(`${API_BASE}/transactions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(tx),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add transaction");
  return data;
};

export const deleteTransaction = async (id: string) => {
  const res = await fetch(`${API_BASE}/transactions/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const contentType = res.headers.get("content-type");

  let data;
  if (contentType?.includes("application/json")) {
    data = await res.json();
  } else {
    // fallback if server returns HTML or plain text
    data = { message: await res.text() };
  }

  if (!res.ok) throw new Error(data.message || "Failed to delete transaction");

  return data;
};

// ----------------- SWR Fetcher -----------------
export const swrFetcher = (url: string) =>
  fetch(`${API_BASE}${url}`, { headers: authHeaders() })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      return data;
    });
