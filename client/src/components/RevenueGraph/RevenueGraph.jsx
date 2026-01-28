import { useState, useEffect, useRef } from "react";
import styles from "./RevenueGraphStyles.module.css";
import { fetchSalesByCategoryAndLocation } from "../../api/api";
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
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  const countryLabels = {
    finland: "Finland",
    eu: "EU",
    us: "US",
    others: "Others",
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchSalesByCategoryAndLocation();
        const categories = [
          "cpu",
          "gpu",
          "motherboard",
          "ram",
          "ssd",
          "hdd",
          "psu",
          "cooling_fan",
          "_case",
          "monitor",
          "keyboard",
          "mouse",
        ];

        const transformedData = categories.map((category) => {
          const entry = {
            product:
              category === "_case"
                ? "case"
                : category === "cooling_fan"
                ? "cooling fan"
                : category,
          };

          fetchedData.forEach((row) => {
            const countryKey = row.country.toLowerCase();
            entry[countryKey] = row[category] || 0;
          });

          return entry;
        });

        setData(transformedData);
      } catch (err) {
        console.error("Failed to fetch sales data:", err);
      }
    };

    getData();
  }, []);

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
        <ResponsiveContainer width="100%" height={220}>
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
              domain={[0, 1200]}
              ticks={[0, 200, 400, 600, 800, 1000, 1200]}
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
            <Line
              type="monotone"
              dataKey="finland"
              name={countryLabels.finland}
              stroke="#1f77b4"
            />
            <Line
              type="monotone"
              dataKey="eu"
              name={countryLabels.eu}
              stroke="#ff7f0e"
            />
            <Line
              type="monotone"
              dataKey="us"
              name={countryLabels.us}
              stroke="#2ca02c"
            />
            <Line
              type="monotone"
              dataKey="others"
              name={countryLabels.others}
              stroke="#d62728"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueGraph;
