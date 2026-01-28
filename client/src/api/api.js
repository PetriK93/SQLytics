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

/* SALES BY CATEGORY AND LOCATION */
export const fetchSalesByCategoryAndLocation = async () => {
  const { data } = await api.get("/sales-by-category-and-location");
  return data;
};

/* SALES BY PAYMENT METHOD */
export const fetchSalesByPaymentMethod = async () => {
  const { data } = await api.get("/sales-by-payment-method");
  return data;
};

/* EMAILS BY TYPE */
export const fetchEmailsByType = async () => {
  const { data } = await api.get("/emails-by-type");
  return data;
};

/* REVENUE VS EXPENSES */
export const fetchRevenueVsExpenses = async () => {
  const { data } = await api.get("/revenue-vs-expenses");
  return data;
};

/* MONTHLY REVENUE VS EXPENSES */
export const fetchMonthlyRevenueVsExpenses = async () => {
  const { data } = await api.get("/monthly-revenue-vs-expenses");
  return data;
};

/* NET PROFIT PER REGION */
export const fetchNetProfitPerRegion = async () => {
  const { data } = await api.get("/net-profit-per-region");
  return data;
};
