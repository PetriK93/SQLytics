import styles from "./RecentTransactionsStyles.module.css";
import recentTransactionsIcon from "../../assets/recent_transactions_green.png";
import TransactionCard from "../TransactionCard/TransactionCard.jsx";

function RecentTransactions({ title }) {
  const currentDate = new Date().toLocaleString("en-US");

  return (
    <div className={styles.container}>
      <div className={styles.horizontalWrapper}>
        <img src={recentTransactionsIcon} className={styles.transactionsIcon} />
        <p className={styles.title}>{title}</p>
      </div>
      <TransactionCard
        id="abc-123"
        name="Alexandria Catherine Montgomery-Smith"
        date={currentDate}
        amount="694.20"
      />
      <TransactionCard
        id="cba-321"
        name="Maximilian Alexander Jonathan von Hohenberg III"
        date={currentDate}
        amount="10000.20"
      />
      <TransactionCard
        id="jhg-321"
        name="Rafael"
        date={currentDate}
        amount="10"
      />
      <TransactionCard
        id="gha-296"
        name="Petri Korpikoski"
        date={currentDate}
        amount="1300204504958725312"
      />
    </div>
  );
}

export default RecentTransactions;
