import { useEffect, useState } from "react";
import { fetchUsers, fetchProducts, fetchRecentInvoices } from "../../api.js";
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
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Fetch latest user, product and invoice data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, productsData, invoicesData] = await Promise.all([
          fetchUsers(),
          fetchProducts(),
          fetchRecentInvoices(),
        ]);

        setUsers(usersData);
        setProducts(productsData);
        setInvoices(invoicesData);
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

  /* Dashboard reports */
  const totalEmailsSent = users.reduce(
    (sum, user) => sum + (user.sent_email_count || 0),
    0
  );

  const totalSales = users.reduce(
    (sum, user) => sum + (user.total_purchases || 0),
    0
  );

  const totalMembers = users.filter(
    (user) => user.membership_level === "member"
  ).length;

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <WelcomeMessage />
        <div className={styles.horizontalWrapper}>
          <SummaryCard
            img={emailsIcon}
            number={totalEmailsSent}
            description="Emails Sent"
            donut={donutIcon}
            percentage="14%"
          />
          <SummaryCard
            img={salesIcon}
            number={totalSales}
            description="Sales"
            donut={donutIcon}
            percentage="12%"
          />
          <SummaryCard
            img={newClientsIcon}
            number={users.length}
            description="New Users"
            donut={donutIcon}
            percentage="34%"
          />
          <SummaryCard
            img={trafficIcon}
            number={totalMembers}
            description="New Members"
            donut={donutIcon}
            percentage="21%"
          />
        </div>
        <div className={styles.horizontalWrapper}>
          <RevenueGraph description="Revenue Generated" amount="45600.24" />
          <RecentTransactions title="Recent Transactions" invoices={invoices} />
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
