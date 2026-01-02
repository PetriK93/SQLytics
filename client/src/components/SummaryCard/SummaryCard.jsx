import styles from "./SummaryCardStyles.module.css";

function SummaryCard({ img, number, description, donut, percentage }) {
  return (
    <div className={styles.container}>
      <div className={styles.verticalWrapper}>
        <img src={img} className={styles.icon} />
        <p className={styles.amount}>{number}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.verticalWrapper}>
        <img src={donut} className={styles.donut} />
        <p className={styles.percentage}>{percentage}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
