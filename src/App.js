import { useEffect, useState } from "react";
import "./App.scss";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import Fetching from "./Components/Fetching/Fetching";
import BarChart from "./Components/Graphs/BarChart";
import LineChart from "./Components/Graphs/LineChart";
import PieChart from "./Components/Graphs/PieChart";
import { UserData } from "../src/Components/Graphs/Data.js";
import graphingData from "../src/Data/dummy.json";

function App() {
  const [globalDate, setglobalDate] = useState(null);
  const [globalSlot, setglobalSlot] = useState(null);
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
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "globalPrimaryRefining",
        data: UserData.map((data) => data.userGain),
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
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "globalPrimaryRefining",
        data: UserData.map((data) => data.userGain),
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
    // console.log(globalPrimaryRefining);
    if (globalPrimaryRefining)
      setUserData({
        labels: globalPrimaryRefining.map(
          (data) => data[0].schedule_time.split(" ")[0]
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
      <div className="graphWrapper">
        <BarChart chartData={userData} />
        <br />
        {/* <LineChart chartData={timeDistribution} /> */}
        {/* <br /> */}
        {/* <PieChart chartData={userData} /> */}
        <br />
      </div>
      <ControlPanel dateSetter={setglobalDate} slotSetter={setglobalSlot} />
      <Fetching
        dateInput={globalDate}
        slotInput={globalSlot}
        primarySetter={setglobalPrimaryRefining}
        secondarySetter={setglobalSecondaryRefining}
      />
    </div>
  );
}

export default App;
