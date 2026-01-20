import { useRef } from "react";
import styles from "./SummaryCardStyles.module.css";
import downloadIcon from "../../assets/download_green.png";
import * as htmlToImage from "html-to-image";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

function SummaryCard({
  img,
  number,
  description,
  data = [],
  height,
  cy,
  wrapper = {},
  chartName,
}) {
  const COLORS = ["#4CAF50", "#f44336", "#2196F3", "#FFC107", "#9407ff"];
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
      <div className={styles.topRight}>
        <img
          src={downloadIcon}
          className={styles.downloadIcon}
          onClick={downloadChart}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.verticalWrapperLeft}>
          <img src={img} className={styles.icon} />
          <p className={styles.amount}>{number}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.verticalWrapperRight}>
          <div ref={chartRef}>
            <ResponsiveContainer width={160} height={height}>
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
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
