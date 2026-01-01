import styles from "./DashboardStyles.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage.jsx";
import Interface from "../../components/Interface/Interface.jsx";


function Dashboard() {
    return (
<div className={styles.container}>
    <Sidebar />
    <WelcomeMessage />
    <Interface />
</div>
)}

export default Dashboard;