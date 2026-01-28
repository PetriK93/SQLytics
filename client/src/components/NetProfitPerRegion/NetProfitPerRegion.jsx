import styles from "./NetProfitPerRegionStyles.module.css";
import { useRef } from "react";
import downloadIcon from "../../assets/download_green.png";
import * as htmlToImage from "html-to-image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function netProfitPerRegion({ description, data }) {
  const barColors = ["#FFD700", "#D3D3D3", "#D2691E", "#16A085"];
  const chartRef = useRef(null);

  const downloadChart = () => {
    htmlToImage.toPng(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "net-profit-per-region.png";
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

      {/* GRAPH IS DEFINED BELOW */}
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={270}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              style={{
                fill: "var(--color-text)",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              ticks={[0, 1000000, 2000000, 3000000]}
            />
            <YAxis
              type="category"
              dataKey="region"
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
              itemStyle={{ color: "var(--color-text)" }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span style={{ color: "#4caf50" }}>{value}</span>
              )}
            />
            <Bar
              dataKey="net_profit"
              name="Net profit by region"
              fill="#4caf50"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default netProfitPerRegion;
