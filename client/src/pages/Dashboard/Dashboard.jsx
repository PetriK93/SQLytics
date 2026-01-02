import styles from "./DashboardStyles.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage.jsx";
import SummaryCard from "../../components/SummaryCard/SummaryCard.jsx";
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
            number="2000.45"
            description="Emails Sent"
            donut={donutIcon}
            percentage="14%"
          />
          <SummaryCard
            img={salesIcon}
            number="145.72"
            description="Sales Obtained"
            donut={donutIcon}
            percentage="12%"
          />
          <SummaryCard
            img={newClientsIcon}
            number="34.20"
            description="New Clients"
            donut={donutIcon}
            percentage="34%"
          />
          <SummaryCard
            img={trafficIcon}
            number="130495.20"
            description="Traffic Received"
            donut={donutIcon}
            percentage="21%"
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
