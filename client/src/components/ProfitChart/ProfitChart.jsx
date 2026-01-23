import { useRef } from "react";
import styles from "./ProfitChartStyles.module.css";
import downloadIcon from "../../assets/download_green.png";
import * as htmlToImage from "html-to-image";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

function ProfitChart({
  title,
  amount,
  text,
  description,
  cy,
  height,
  width,
  data = [],
  wrapper,
}) {
  const COLORS = ["#4CAF50", "#f44336"];
  const chartRef = useRef(null);

  const legendWrapperStyle = {
    bottom: wrapper,
  };

  const downloadChart = () => {
    htmlToImage.toPng(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = chartName;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.horizontalWrapper}>
        <p className={styles.title}>{title}</p>
        <img
          src={downloadIcon}
          className={styles.icon}
          onClick={downloadChart}
        />
      </div>
      <div className={styles.innerContainer}>
        <div ref={chartRef}>
          <ResponsiveContainer width={width} height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy={cy}
                innerRadius={15}
                outerRadius={35}
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
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={legendWrapperStyle}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className={styles.revenue}>
          ${amount} {text}
        </p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default ProfitChart;
