import api from "./axios";

/* USERS */
export const fetchUsers = async () => {
  const { data } = await api.get("/user-information");
  return data;
};

/* PRODUCTS */
export const fetchProducts = async () => {
  const { data } = await api.get("/product-information");
  return data;
};

/* INVOICES */
export const fetchInvoices = async () => {
  const { data } = await api.get("/invoice-information");
  return data;
};

/* TOTAL REVENUE */
export const fetchTotalRevenue = async () => {
  const { data } = await api.get("/invoices/total-revenue");
  return Number(data.total_revenue || 0);
};

/* RECENT INVOICES */
export const fetchRecentInvoices = async () => {
  const { data } = await api.get("/invoices/recent");
  return data;
};

/* SALES BY LOCATION */
export const fetchSalesByLocation = async () => {
  const { data } = await api.get("/sales-by-location");
  return data;
};
