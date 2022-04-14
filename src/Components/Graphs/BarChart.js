import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return <Bar data={chartData}
    height={"100%"}
    options={{ maintainAspectRatio: false }} />;
}

export default BarChart;
