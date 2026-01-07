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
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <WelcomeMessage />
        <div className={styles.horizontalWrapper}>
          <SummaryCard
            img={emailsIcon}
            number="2000"
            description="Emails Sent"
            donut={donutIcon}
            percentage="14%"
          />
          <SummaryCard
            img={salesIcon}
            number="145"
            description="Sales Obtained"
            donut={donutIcon}
            percentage="12%"
          />
          <SummaryCard
            img={newClientsIcon}
            number="54"
            description="New Clients"
            donut={donutIcon}
            percentage="34%"
          />
          <SummaryCard
            img={trafficIcon}
            number="12"
            description="New Members"
            donut={donutIcon}
            percentage="21%"
          />
        </div>
        <div className={styles.horizontalWrapper}>
          <RevenueGraph description="Revenue Generated" amount="45600.24" />
          <RecentTransactions title="Recent Transactions" />
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
