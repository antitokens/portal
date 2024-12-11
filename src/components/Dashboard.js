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
        color: "#FFFFFFA2",
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
      borderWidth: 1, // No border on slices
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
        color: "#FFFFFFA2",
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

const Dashboard = (connected) => {
  const [lineChartDataHolders, setLineChartDataHolders] = useState(null);
  const [lineChartDataPriceHistory, setLineChartDataPriceHistory] =
    useState(null);
  const [pieChartDataLPBalancesAnti, setPieChartDataLPBalancesAnti] =
    useState(null);
  const [pieChartDataLPBalancesPro, setPieChartDataLPBalancesPro] =
    useState(null);
  const [lineChartDataRatio, setLineChartDataRatio] = useState(null);
  const [holderDistribution, setHolderDistribution] = useState(null);
  const [isEasy, setIsEasy] = useState(true);

  const timestamps = [
    Date.now(),
    Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    Date.now() - 30 * 24 * 60 * 60 * 1000, // 1 month ago
    Date.now() - 365 * 24 * 60 * 60 * 1000, // 1 year ago
  ];

  const toggleMode = () => {
    setIsEasy(!isEasy);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const holdersAnti = await getTotalHolders(ANTI_TOKEN_MINT, timestamps);
        const holdersPro = await getTotalHolders(PRO_TOKEN_MINT, timestamps);

        // -- Mock --
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
        // ------

        setLineChartDataHolders({
          labels: timestamps.map((ts) => new Date(ts).toLocaleDateString()),
          datasets: [
            {
              label: "Anti",
              data: holdersAnti.map((entry) => entry.totalHolders),
              borderColor: "#D13800",
              backgroundColor: "#D13800",
              fill: false, // Ensure the area under the line is not filled
            },
            {
              label: "Pro",
              data: holdersPro.map(
                (entry) => entry.totalHolders - Math.round(Math.random() * 100) // -- Mock --
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
              label: "Anti",
              data: priceHistoryAnti.map(
                (entry) => entry.price + Math.round(Math.random() * 10) // -- Mock --
              ),
              borderColor: "#D13800",
              backgroundColor: "#D13800",
              fill: false,
            },
            {
              label: "Pro",
              data: priceHistoryPro.map((entry) => entry.price),
              borderColor: "#00CC8E",
              backgroundColor: "#00CC8E",
              fill: false,
            },
          ],
          options: chartOptions,
        });

        setPieChartDataLPBalancesAnti({
          labels: Array.from({ length: randomCount }, (_, i) => randomNames[i]), // -- Mock --
          datasets: [
            {
              label: "Anti",
              data: lpBalancesAnti,
              backgroundColor: randomColors,
              borderColor: Array.from({ length: randomCount }, () => "#000000"),
            },
          ],
          options: chartOptionsPie,
        });

        setPieChartDataLPBalancesPro({
          labels: Array.from({ length: randomCount }, (_, i) => randomNames[i]), // -- Mock --
          datasets: [
            {
              label: "Pro",
              data: lpBalancesPro,
              backgroundColor: randomColors,
              borderColor: Array.from({ length: randomCount }, () => "#000000"),
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
              label: "Ratio (Anti:Pro)",
              data: priceRatios,
              backgroundColor: "#FF9500",
              borderColor: "#FF9500",
              fill: false,
            },
          ],
          options: chartOptions,
        });

        setHolderDistribution({
          labels: ["Anti", "Pro"],
          datasets: [
            {
              label: "Holder Distribution",
              data: randomHolderDistribution, // -- Mock --
              backgroundColor: ["#D13800", "#00CC8E"],
              borderColor: ["#000000", "#000000"],
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
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-center text-2xl font-bold mb-6">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span
            className={`text-sm font-semibold ${
              isEasy ? "text-green-500" : "text-gray-500"
            }`}
          >
            Basic
          </span>
          <button
            onClick={toggleMode}
            className={`relative w-12 h-6 rounded-full ${
              isEasy ? "bg-green-500" : "bg-orange-500"
            } focus:outline-none`}
          >
            <div
              className={`block w-4 h-4 bg-white rounded-full transform transition-transform ${
                isEasy ? "translate-x-1" : "translate-x-7"
              }`}
            ></div>
          </button>
          <span
            className={`text-sm font-semibold ${
              !isEasy ? "text-orange-500" : "text-gray-500"
            }`}
          >
            Advanced
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-center font-semibold mb-4">Holder Trends</h3>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                alert("This chart shows the trends of token holders over time.")
              }
              title="This chart shows the trends of token holders over time."
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#ffffff66"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {lineChartDataHolders && (
            <Line
              data={lineChartDataHolders}
              options={lineChartDataHolders.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-center font-semibold mb-4">Price Trends</h3>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                alert("This chart shows the trends of token prices over time.")
              }
              title="This chart shows the trends of token prices over time."
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#ffffff66"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {lineChartDataPriceHistory && (
            <Line
              data={lineChartDataPriceHistory}
              options={lineChartDataPriceHistory.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-center font-semibold mb-4">Price Ratio</h3>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                alert("This chart shows the ratio of token prices over time.")
              }
              title="This chart shows the ratio of token prices over time."
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#ffffff66"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {lineChartDataRatio && (
            <Line
              data={lineChartDataRatio}
              options={lineChartDataRatio.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-center font-semibold mb-4">
              <span className="text-accent-secondary">$PRO</span> LP Balances
            </h3>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                alert("This chart shows the LP balances for $PRO.")
              }
              title="This chart shows the LP balances for $PRO."
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#ffffff66"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {pieChartDataLPBalancesPro && (
            <Pie
              data={pieChartDataLPBalancesPro}
              options={pieChartDataLPBalancesPro.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-center font-semibold mb-4">
              <span className="text-accent-orange">$ANTI</span> LP Balances
            </h3>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                alert("This chart shows the LP balances for $ANTI.")
              }
              title="This chart shows the LP balances for $ANTI."
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#ffffff66"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {pieChartDataLPBalancesAnti && (
            <Pie
              data={pieChartDataLPBalancesAnti}
              options={pieChartDataLPBalancesAnti.options}
            />
          )}
        </div>
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-center font-semibold mb-4">
              Holder Distribution
            </h3>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                alert("This chart shows the distribution of holders.")
              }
              title="This chart shows the distribution of holders."
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#ffffff66"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
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
