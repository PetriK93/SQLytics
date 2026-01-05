import styles from "./ProfitChartStyles.module.css";
import profitIcon from "../../assets/donut_big_dark_mode.png";

function ProfitChart({ title, amount, text, description }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.innerContainer}>
        <img src={profitIcon} className={styles.icon} />
        <p className={styles.revenue}>
          ${amount} {text}
        </p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default ProfitChart;
