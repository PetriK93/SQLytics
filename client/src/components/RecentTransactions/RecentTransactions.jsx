import styles from "./RecentTransactionsStyles.module.css";
import recentTransactionsIcon from "../../assets/recent_transactions_green.png";

function RecentTransactions({ title }) {
  return (
    <div className={styles.container}>
      <div className={styles.horizontalWrapper}>
        <img src={recentTransactionsIcon} className={styles.transactionsIcon} />
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}

export default RecentTransactions;
