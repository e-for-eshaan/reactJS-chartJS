import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return <Line data={chartData}
    height={"100%"}
    options={{ maintainAspectRatio: false }}
  />;
}

export default LineChart;
