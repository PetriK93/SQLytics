const API_URL = "http://localhost:5000/api";

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/user-information`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/product-information`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchInvoices = async () => {
  const res = await fetch(`${API_URL}/invoice-information`);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
};

export const fetchRecentInvoices = async () => {
  const res = await fetch(`${API_URL}/invoices/recent`);
  if (!res.ok) throw new Error("Failed to fetch recent invoices");
  return res.json();
};
