import { useEffect, useState } from "react";
import {
  fetchUsers,
  fetchProducts,
  fetchTotalRevenue,
  fetchInvoices,
  fetchRecentInvoices,
  fetchSalesByPaymentMethod,
  fetchEmailsByType,
} from "../../api/api.js";
import styles from "./DashboardStyles.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage.jsx";
import SummaryCard from "../../components/SummaryCard/SummaryCard.jsx";
import RevenueGraph from "../../components/RevenueGraph/RevenueGraph.jsx";
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions.jsx";
import ProfitChart from "../../components/ProfitChart/ProfitChart.jsx";
import RevenueVsCostChart from "../../components/RevenueVsCostChart/RevenueVsCostChart.jsx";
import donutIcon from "../../assets/donut_dark_mode.png";
import emailsIcon from "../../assets/emails_dark_mode.png";
import salesIcon from "../../assets/sales_dark_mode.png";
import newClientsIcon from "../../assets/new_clients_dark_mode.png";
import trafficIcon from "../../assets/traffic_dark_mode.png";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [emailTypes, setEmailTypes] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* FETCH RELEVANT DATA */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersData,
          productsData,
          totalRevenueData,
          invoicesData,
          recentInvoicesData,
          paymentMethodsData,
          emailTypesData,
        ] = await Promise.all([
          fetchUsers(),
          fetchProducts(),
          fetchTotalRevenue(),
          fetchInvoices(),
          fetchRecentInvoices(),
          fetchSalesByPaymentMethod(),
          fetchEmailsByType(),
        ]);

        setUsers(usersData);
        setProducts(productsData);
        setTotalRevenue(totalRevenueData);
        setInvoices(invoicesData);
        setRecentInvoices(recentInvoicesData);
        setPaymentMethods(paymentMethodsData);
        setEmailTypes(emailTypesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error: {error}</p>;

  /* EMAILS SENT */
  const totalEmailsSent = users.reduce(
    (sum, user) => sum + (user.sent_email_count || 0),
    0
  );

  /* TOTAL SALES */
  const totalSales = invoices.reduce(
    (sum, invoice) => sum + (invoice.total_quantity || 0),
    0
  );

  /* NEW USERS */
  const cutoff = new Date("2025-12-31");
  const users2025 = users.filter((user) => new Date(user.created_at) <= cutoff);
  const users2026 = users.filter((user) => new Date(user.created_at) > cutoff);
  const total2025 = users2025.length;
  const total2026 = users2026.length;

  const newUserPercentage =
    total2025 + total2026 === 0
      ? 0
      : Math.round((total2026 / (total2025 + total2026)) * 100);

  const oldUserPercentage = 100 - newUserPercentage;

  const newUsersData = [
    { name: "New users", value: newUserPercentage },
    { name: "Old users", value: oldUserPercentage },
  ];

  /* CURRENTLY ACTIVE MEMBERS */
  const totalUsers = users.length;

  const totalMembers = users.filter(
    (user) => user.membership_level === "member"
  ).length;

  const memberPercentage =
    totalUsers === 0 ? 0 : Math.round((totalMembers / totalUsers) * 100);

  const nonMemberPercentage = 100 - memberPercentage;

  const activeMembersData = [
    { name: "Members", value: memberPercentage },
    { name: "Non-members", value: nonMemberPercentage },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <WelcomeMessage />
        <div className={styles.horizontalWrapper}>
          <SummaryCard
            img={emailsIcon}
            number={totalEmailsSent}
            description="Emails By Type %"
            height={230}
            data={emailTypes}
          />
          <SummaryCard
            img={salesIcon}
            number={totalSales}
            description="Sales By Payment Method %"
            height={250}
            data={paymentMethods}
          />
          <SummaryCard
            img={newClientsIcon}
            number={users2026.length}
            description="New Users % (Compared to last year)"
            height={200}
            data={newUsersData}
          />
          <SummaryCard
            img={trafficIcon}
            number={totalMembers}
            description="Currently Active Members %"
            height={200}
            data={activeMembersData}
          />
        </div>
        <div className={styles.horizontalWrapper}>
          <RevenueGraph description="Revenue Generated" amount={totalRevenue} />
          <RecentTransactions
            title="Recent Transactions"
            invoices={recentInvoices}
          />
        </div>
        <div className={styles.horizontalWrapper}>
          <ProfitChart
            title="Total Profit"
            amount="34584.40"
            text="Net Profit"
            description="Includes all profits and expenses"
          />
          <RevenueVsCostChart description="Revenue & Expenses" />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
