import styles from "./RecentTransactionsStyles.module.css";
import recentTransactionsIcon from "../../assets/recent_transactions_green.png";
import TransactionCard from "../TransactionCard/TransactionCard.jsx";

function RecentTransactions({ title, invoices = [] }) {
  return (
    <div className={styles.container}>
      <div className={styles.horizontalWrapper}>
        <img src={recentTransactionsIcon} className={styles.transactionsIcon} />
        <p className={styles.title}>{title}</p>
      </div>
      {invoices.map((invoice) => (
        <TransactionCard
          key={invoice.id}
          id={invoice.id}
          name={invoice.customerName}
          date={new Date(invoice.date).toLocaleString("en-US")}
          amount={invoice.amount}
        />
      ))}
    </div>
  );
}

export default RecentTransactions;

{
}
