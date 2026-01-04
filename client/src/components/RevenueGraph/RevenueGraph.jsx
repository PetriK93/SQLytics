import styles from "./RevenueGraphStyles.module.css";
import { useRef } from "react";
import downloadIcon from "../../assets/download_green.png";
import * as htmlToImage from "html-to-image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function RevenueGraph({ description, amount }) {
  const data = [
    { product: "CPU", finland: 120, eu: 200, us: 180, others: 90 },
    { product: "GPU", finland: 300, eu: 250, us: 400, others: 150 },
    { product: "Motherboard", finland: 360, eu: 220, us: 410, others: 120 },
    { product: "RAM", finland: 500, eu: 150, us: 300, others: 170 },
    { product: "SSD", finland: 100, eu: 550, us: 200, others: 130 },
    { product: "HDD", finland: 800, eu: 650, us: 500, others: 260 },
    { product: "Power Supply", finland: 150, eu: 278, us: 443, others: 126 },
    { product: "Cooling Fan", finland: 164, eu: 197, us: 158, others: 674 },
    { product: "Case", finland: 623, eu: 432, us: 221, others: 364 },
    { product: "Monitor", finland: 300, eu: 250, us: 400, others: 726 },
    { product: "Keyboard", finland: 524, eu: 742, us: 267, others: 533 },
    { product: "Mouse", finland: 578, eu: 468, us: 467, others: 753 },
  ];

  const chartRef = useRef(null);

  const downloadChart = () => {
    htmlToImage.toPng(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "revenue-chart.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.horizontalWrapper}>
        <p className={styles.description}>{description}</p>
        <img
          src={downloadIcon}
          className={styles.downloadIcon}
          onClick={downloadChart}
        />
      </div>
      <p className={styles.amount}>${amount}</p>

      {/* GRAPH IS DEFINED BELOW */}
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={210}>
          <LineChart data={data} margin={{ top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="product"
              dy={10}
              style={{
                fill: "var(--color-text)",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            />
            <YAxis
              domain={[0, 1000]}
              ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
              dx={-10}
              dy={-5}
              style={{
                fill: "var(--color-text)",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
              labelStyle={{
                color: "var(--color-text)",
                fontWeight: "bold",
              }}
              cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ bottom: -3 }}
            />
            <Line type="monotone" dataKey="finland" stroke="#1f77b4" />
            <Line type="monotone" dataKey="eu" stroke="#ff7f0e" />
            <Line type="monotone" dataKey="us" stroke="#2ca02c" />
            <Line type="monotone" dataKey="others" stroke="#d62728" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueGraph;
