import { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  ANTI_TOKEN_MINT,
  PRO_TOKEN_MINT,
  getTotalHolders,
  getTokenPriceHistory,
  getTokenBalanceInLP,
} from "../utils/prank";

Chart.register(...registerables);

const chartOptionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        font: {
          family: "'SF Mono Round'", // Keep the consistent font
          size: 12,
        },
        boxWidth: 20, // Adjust box width for better alignment
        padding: 10, // Add padding between legends
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw;
          return `${context.label}: ${value}%`; // Format slice data
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 0, // No border on slices
    },
  },
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        font: {
          family: "'SF Mono Round'",
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: "'SF Mono Round'",
          size: 10,
        },
        callback: function (value, index, values) {
          return this.getLabelForValue(value); // Maintain default label formatting
        },
      },
      grid: { color: "#D3D3D322" },
      display: true,
      title: {
        display: true,
        text: "Time →",
        font: {
          family: "'SF Mono Round'",
          size: 13,
        },
      },
      ticks: {
        font: {
          family: "'SF Mono Round'",
        },
        callback: (value) => `${value}`,
        maxRotation: 45, // Rotation of 45 degrees
      },
    },
    y: {
      ticks: {
        font: {
          family: "'SF Mono Round'",
          size: 10,
        },
      },
      grid: { color: "#D3D3D322" },
    },
  },
};

const Dashboard = () => {
  const [lineChartDataHolders, setLineChartDataHolders] = useState(null);
  const [lineChartDataPriceHistory, setLineChartDataPriceHistory] =
    useState(null);
  const [pieChartDataLPBalancesAnti, setPieChartDataLPBalancesAnti] =
    useState(null);
  const [pieChartDataLPBalancesPro, setPieChartDataLPBalancesPro] =
    useState(null);
  const [lineChartDataRatio, setLineChartDataRatio] = useState(null);
  const [holderDistribution, setHolderDistribution] = useState(null);

  const timestamps = [
    Date.now(),
    Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    Date.now() - 30 * 24 * 60 * 60 * 1000, // 1 month ago
    Date.now() - 365 * 24 * 60 * 60 * 1000, // 1 year ago
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const holdersAnti = await getTotalHolders(ANTI_TOKEN_MINT, timestamps);
        const holdersPro = await getTotalHolders(PRO_TOKEN_MINT, timestamps);

        const generateRandomArrayWithSum = (length, total) => {
          const arr = Array.from({ length }, () => Math.random()); // Generate random values
          const sum = arr.reduce((acc, val) => acc + val, 0); // Calculate the sum of random values
          return arr.map((val) => (val / sum) * total); // Scale values to sum up to `total`
        };

        const generateRandomColors = (length) => {
          return Array.from(
            { length },
            () =>
              `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`
          );
        };

        const randomCount = 8;
        const randomNames = [
          "Raydium",
          "Meteora",
          "Base",
          "Jupiter",
          "Optimism",
          "Native",
          "Abstract",
          "Solend",
        ];
        const randomColors = generateRandomColors(randomCount);
        const priceHistoryAnti = await getTokenPriceHistory(
          ANTI_TOKEN_MINT,
          10
        );
        const priceHistoryPro = await getTokenPriceHistory(PRO_TOKEN_MINT, 10);

        // Generate arrays
        const lpBalancesAnti = generateRandomArrayWithSum(randomCount, 100).map(
          (value) => value.toFixed(2)
        ); // Sum is 100
        const lpBalancesPro = generateRandomArrayWithSum(randomCount, 100).map(
          (value) => value.toFixed(2)
        ); // Sum is 100

        const randomHolderDistribution = generateRandomArrayWithSum(2, 100).map(
          (value) => value.toFixed(2)
        );

        const priceRatios = priceHistoryAnti
          .map((entry) => entry.price)
          .map(
            (price, i) =>
              price +
              Math.round(Math.random() * 10) /
                priceHistoryPro.map((entry) => entry.price)[i]
          );

        setLineChartDataHolders({
          labels: timestamps.map((ts) => new Date(ts).toLocaleDateString()),
          datasets: [
            {
              label: "$ANTI",
              data: holdersAnti.map((entry) => entry.totalHolders),
              borderColor: "#D13800",
              backgroundColor: "#D13800",
              fill: false,
            },
            {
              label: "$PRO",
              data: holdersPro.map(
                (entry) => entry.totalHolders - Math.round(Math.random() * 100)
              ),
              borderColor: "#00CC8E",
              backgroundColor: "#00CC8E",
              fill: false,
            },
          ],
          options: chartOptions,
        });

        setLineChartDataPriceHistory({
          labels: priceHistoryAnti
            .map((entry) => entry.timestamp)
            .map((ts) => new Date(ts).toLocaleDateString()),
          datasets: [
            {
              label: "$ANTI",
              data: priceHistoryAnti.map(
                (entry) => entry.price + Math.round(Math.random() * 10)
              ),
              borderColor: "#D13800",
              backgroundColor: "#D13800",
              fill: false,
            },
            {
              label: "$PRO",
              data: priceHistoryPro.map((entry) => entry.price),
              borderColor: "#00CC8E",
              backgroundColor: "#00CC8E",
              fill: false,
            },
          ],
          options: chartOptions,
        });

        setPieChartDataLPBalancesAnti({
          labels: Array.from({ length: randomCount }, (_, i) => randomNames[i]),
          datasets: [
            {
              label: "$ANTI",
              data: lpBalancesAnti,
              backgroundColor: randomColors,
            },
          ],
          options: chartOptionsPie,
        });

        setPieChartDataLPBalancesPro({
          labels: Array.from({ length: randomCount }, (_, i) => randomNames[i]),
          datasets: [
            {
              label: "$PRO",
              data: lpBalancesPro,
              backgroundColor: randomColors,
            },
          ],
          options: chartOptionsPie,
        });

        setLineChartDataRatio({
          labels: priceHistoryAnti
            .map((entry) => entry.timestamp)
            .map((ts) => new Date(ts).toLocaleDateString()),
          datasets: [
            {
              label: "Ratio (ANTI:PRO)",
              data: priceRatios,
              backgroundColor: "#FF9500",
            },
          ],
          options: chartOptions,
        });

        setHolderDistribution({
          labels: ["$ANTI", "$PRO"],
          datasets: [
            {
              label: "Holder Distribution",
              data: randomHolderDistribution,
              backgroundColor: ["#D13800", "#00CC8E"],
            },
          ],
          options: chartOptionsPie,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 text-gray-100">
      <h2 className="text-center text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="p-4 rounded-lg">
          <h3 className="text-center font-semibold mb-4">Holder Trends</h3>
          {lineChartDataHolders && (
            <Line
              data={lineChartDataHolders}
              options={lineChartDataHolders.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <h3 className="text-center font-semibold mb-4">Price Trends</h3>
          {lineChartDataPriceHistory && (
            <Line
              data={lineChartDataPriceHistory}
              options={lineChartDataPriceHistory.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <h3 className="text-center font-semibold mb-4">Price Ratio</h3>
          {lineChartDataRatio && (
            <Line
              data={lineChartDataRatio}
              options={lineChartDataRatio.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <h3 className="text-center font-semibold mb-4">
            <span className="text-accent-secondary">$PRO</span> LP Balances
          </h3>
          {pieChartDataLPBalancesPro && (
            <Pie
              data={pieChartDataLPBalancesPro}
              options={pieChartDataLPBalancesPro.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <h3 className="text-center font-semibold mb-4">
            <span className="text-accent-orange">$ANTI</span> LP Balances
          </h3>
          {pieChartDataLPBalancesAnti && (
            <Pie
              data={pieChartDataLPBalancesAnti}
              options={pieChartDataLPBalancesAnti.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <h3 className="text-center font-semibold mb-4">
            Holder Distribution
          </h3>
          {holderDistribution && (
            <Pie
              data={holderDistribution}
              options={holderDistribution.options}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
