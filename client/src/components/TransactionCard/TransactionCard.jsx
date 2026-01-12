import styles from "./TransactionCardStyles.module.css";

function TransactionCard({ id, name, date, amount }) {
  return (
    <div className={styles.container}>
      <div className={styles.verticalWrapper}>
        <p className={styles.id}># {id}</p>
        <p className={styles.name}>{name}</p>
      </div>
      <p className={styles.date}>{date}</p>
      <div className={styles.amountContainer}>
        <p className={styles.amount}>{amount}</p>
      </div>
    </div>
  );
}

export default TransactionCard;
