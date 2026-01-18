import styles from "./SummaryCardStyles.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

function SummaryCard({ img, number, description, data = [] }) {
  const COLORS = ["#4CAF50", "#f44336", "#2196F3", "#FFC107", "#9407ff"];

  return (
    <div className={styles.container}>
      <div className={styles.verticalWrapperLeft}>
        <img src={img} className={styles.icon} />
        <p className={styles.amount}>{number}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.verticalWrapperRight}>
        <ResponsiveContainer width={170} height={170}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={30}
              outerRadius={45}
              paddingAngle={0}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SummaryCard;
