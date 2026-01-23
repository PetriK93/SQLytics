import styles from "./RevenueVsCostChartStyles.module.css";
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
} from "recharts";

function RevenueVsCostChart({ description }) {
  const revenueVsExpenses = [
    { month: "Jan", revenue: 84200, expenses: 56800 },
    { month: "Feb", revenue: 91500, expenses: 60200 },
    { month: "Mar", revenue: 97800, expenses: 64500 },
    { month: "Apr", revenue: 105400, expenses: 71200 },
    { month: "May", revenue: 112600, expenses: 74800 },
    { month: "Jun", revenue: 121900, expenses: 80300 },
    { month: "Jul", revenue: 118300, expenses: 79200 },
    { month: "Aug", revenue: 126700, expenses: 84600 },
    { month: "Sep", revenue: 134200, expenses: 89100 },
    { month: "Oct", revenue: 142800, expenses: 93400 },
    { month: "Nov", revenue: 158400, expenses: 102300 },
    { month: "Dec", revenue: 172900, expenses: 110700 },
  ];

  const chartRef = useRef(null);

  const downloadChart = () => {
    htmlToImage.toPng(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "revenue-vs-cost-chart.png";
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
            data={revenueVsExpenses}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              style={{
                fill: "var(--color-text)",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            />
            <YAxis
              style={{
                fill: "var(--color-text)",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              ticks={[50000, 100000, 150000, 200000, 250000]}
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
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="revenue" fill="#4caf50" name="Revenue" />
            <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueVsCostChart;
