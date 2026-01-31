import { reportData as emptyReport } from "./reportData";
import {
  fetchEmailsByType,
  fetchSalesByPaymentMethod,
  fetchUsers,
  fetchSalesByCategoryAndLocation,
  fetchRevenueVsExpenses,
  fetchMonthlyRevenueVsExpenses,
  fetchTotalRevenue,
  fetchNetProfitPerRegion,
} from "../api/api.js";

export async function buildReportData() {
  const data = structuredClone(emptyReport);

  const [
    emailTypes,
    paymentMethods,
    users,
    salesByCategoryAndLocation,
    revenueVsExpenses,
    monthlyRevenueVsExpenses,
    totalRevenue,
    netProfitPerRegion,
  ] = await Promise.all([
    fetchEmailsByType(),
    fetchSalesByPaymentMethod(),
    fetchUsers(),
    fetchSalesByCategoryAndLocation(),
    fetchRevenueVsExpenses(),
    fetchMonthlyRevenueVsExpenses(),
    fetchTotalRevenue(),
    fetchNetProfitPerRegion(),
  ]);

  /* EMAIL ANALYTICS */
  data.inquiry = emailTypes[0].value;
  data.feedback = emailTypes[1].value;
  data.complaint = emailTypes[2].value;
  data.other = emailTypes[3].value;

  /* SALES AND PAYMENT METHODS */
  data.credit_card = paymentMethods[0].value;
  data.paypal = paymentMethods[1].value;
  data.bank_transfer = paymentMethods[2].value;
  data.mobile_wallet = paymentMethods[3].value;
  data.bnpl = paymentMethods[4].value;

  /* USER ACTIVITY AND ENGAGEMENT */
  const cutoff = new Date("2025-12-31");
  const users2025 = users.filter((user) => new Date(user.created_at) <= cutoff);
  const users2026 = users.filter((user) => new Date(user.created_at) > cutoff);
  data.users_last_year = users2025.length;
  data.users_this_year = users2026.length;

  /* PRODUCT PERFORMANCE BY REGION */

  return data;
}
