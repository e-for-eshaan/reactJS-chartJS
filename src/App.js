import { useEffect, useState } from "react";
import "./App.scss";
import { extractDate } from "./Assets/Functions/Function";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import Fetching from "./Components/Fetching/Fetching";
import BarChart from "./Components/Graphs/BarChart";
import LineChart from "./Components/Graphs/LineChart";
import PieChart from "./Components/Graphs/PieChart";

function App() {
  const [globalDate, setglobalDate] = useState(null);
  const [globalSlot, setglobalSlot] = useState(null);
  const [distributionDate, setdistributionDate] = useState(null);
  const [globalPrimaryRefining, setglobalPrimaryRefining] = useState(null);
  const [globalSecondaryRefining, setglobalSecondaryRefining] = useState(null);
  useEffect(() => {
    // console.log(
    //   {
    //     globalDate: globalDate,
    //     type: typeof globalDate,
    //   },
    //   {
    //     globalSlot: globalSlot,
    //     type: typeof globalSlot,
    //   }
    // );
  }, [globalDate]);

  const [userData, setUserData] = useState({
    labels: [0, 1, 2, 3, 4],
    datasets: [
      {
        label: "Secondary Refining",
        data: [1, 2, 3, 4, 5],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [timeDistribution, setTimeDistribution] = useState({
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: "Time Distribution",
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setTimeDistribution({
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          label: "Time Distribution",
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [globalDate]);

  useEffect(() => {
    // console.log(globalPrimaryRefining);
    if (globalPrimaryRefining)
      setUserData({
        labels: globalPrimaryRefining.map((data) =>
          extractDate(data[0].schedule_time)
        ),
        datasets: [
          {
            label: "Primary Refining",
            data: globalPrimaryRefining.map((data) => data.length),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
  }, [globalPrimaryRefining]);

  useEffect(() => {
    // console.log(globalSecondaryRefining);
    if (globalSecondaryRefining)
      setTimeDistribution({
        labels: globalSecondaryRefining.map((data) => data.time),
        datasets: [
          {
            label: "Time Distribution",
            data: globalSecondaryRefining.map((data) => data.objects.length),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
  }, [globalSecondaryRefining]);

  useEffect(() => {
    console.log(globalSecondaryRefining);
  }, [globalSecondaryRefining]);

  return (
    <div className="App">
      <div className="graphPanel">
        <div className="graphWrapper">
          <BarChart chartData={userData} />
          <br />
          <br />
          {distributionDate}
          <LineChart chartData={timeDistribution} />
          <br />
          <br />

          <div className="pieChart">
            <PieChart chartData={userData} />
          </div>
        </div>
      </div>
      <div className="dataPanel">
        <ControlPanel dateSetter={setglobalDate} slotSetter={setglobalSlot} />
        <Fetching
          dateInput={globalDate}
          slotInput={globalSlot}
          primarySetter={setglobalPrimaryRefining}
          secondarySetter={setglobalSecondaryRefining}
          distributionSetter={setdistributionDate}
        />
      </div>
    </div>
  );
}

export default App;
