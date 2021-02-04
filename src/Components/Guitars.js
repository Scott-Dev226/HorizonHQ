import "../App.css";
import Background from "../palm-tree.jpg";
import Hendrix from "../hendrix.jpg";
import React, { useState, useEffect, useRef, useReducer } from "react";
import { useSpring, animated } from "react-spring";
import Chart from "chart.js";
import gsap from "gsap";

function Guitars() {
  const [symbol, setSymbol] = useState(null);
  const [intervalz, setIntervalz] = useState(null);
  const [count, setCount] = useState(0);

  const [high, setHigh] = useState(null);
  const [stockDate, setStockDate] = useState(null);
  const [low, setLow] = useState(null);
  const [open, setOpen] = useState(null);
  const [close, setClose] = useState(null);

  const [high2, setHigh2] = useState(null);
  const [stockDate2, setStockDate2] = useState(null);
  const [low2, setLow2] = useState(null);
  const [open2, setOpen2] = useState(null);
  const [close2, setClose2] = useState(null);

  const [stockDate3, setStockDate3] = useState(null);
  const [high3, setHigh3] = useState(null);
  const [low3, setLow3] = useState(null);
  const [open3, setOpen3] = useState(null);
  const [close3, setClose3] = useState(null);
  var inputRef = useRef();
  let [toggle, setToggle] = useState(inputRef);

  const props = useSpring({
    config: { duration: 2000 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  let initialRender = useRef(true);

  useEffect(async () => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      let lat;
      let long;

      if (toggle == "Lansing") {
        lat = "42.732536";
        long = "-84.555534";
      } else if (toggle == "Miami") {
        lat = "25.761681";
        long = "-80.191788";
      } else if (toggle == "Anchorage") {
        lat = "61.217381";
        long = "-149.863129";
      }

      const key = "bd59f1b0a5dc46effebf6e600888394f";
      const fetchURL2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        long +
        "&exclude=hourly,minutely&appid=" +
        key +
        "&units=imperial";

      fetch(fetchURL2)
        .then(function (resp) {
          return resp.json();
        }) // Convert data to json
        .then(function (data) {
          const day1 = JSON.stringify(data.daily[0].temp.max);
          const day2 = JSON.stringify(data.daily[1].temp.max);
          const day3 = JSON.stringify(data.daily[2].temp.max);
          const day4 = JSON.stringify(data.daily[3].temp.max);
          const day5 = JSON.stringify(data.daily[4].temp.max);
          const day6 = JSON.stringify(data.daily[5].temp.max);
          const day7 = JSON.stringify(data.daily[6].temp.max);
          const day8 = JSON.stringify(data.daily[7].temp.max);

          const day1Hum = JSON.stringify(data.daily[0].humidity);
          const day2Hum = JSON.stringify(data.daily[1].humidity);
          const day3Hum = JSON.stringify(data.daily[2].humidity);
          const day4Hum = JSON.stringify(data.daily[3].humidity);
          const day5Hum = JSON.stringify(data.daily[4].humidity);
          const day6Hum = JSON.stringify(data.daily[5].humidity);
          const day7Hum = JSON.stringify(data.daily[6].humidity);
          const day8Hum = JSON.stringify(data.daily[7].humidity);

          var ctx = document.getElementById("myChart").getContext("2d");

          var myChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: [
                "day1",
                "day2",
                "day3",
                "day4",
                "day5",
                "day6",
                "day7",
                "day8",
              ],
              datasets: [
                {
                  label: ["High Temp"],
                  data: [day1, day2, day3, day4, day5, day6, day7, day8],

                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },

                /*
        {
            label: ["Humidity"],
            data: [day1Hum, day2Hum, day3Hum, day4Hum, day5Hum, day6Hum, day7Hum, day8Hum],
         
            borderColor: [
                'blue'
            ],
            borderWidth: 1
        }
    */
              ],
            },
            options: {
              responsive: false,
              maintainAspectRatio: false,

              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          });
        });
    }
  }, [toggle]);

  return (
    <animated.div
      id="weather-holder"
      style={{ opacity: props.opacity, marginTop: props.marginTop }}
    >
      <select name="selectStock" id="input3" ref={inputRef}>
        <option value="Lansing">Lansing</option>
        <option value="Miami">Miami</option>
        <option value="Anchorage">Anchorage</option>
      </select>

      <button
        id="btn"
        onClick={() => {
          setToggle(inputRef.current.value);

          gsap.to(".myChartClass", { opacity: 1, duration: 3, delay: 1 });
        }}
      >
        CLICK for Data
      </button>

      <div id="chartHolder">
        <canvas
          id="myChart"
          width="1000%"
          height="500%"
          className="myChartClass"
        ></canvas>
      </div>
    </animated.div>
  );
}

export default Guitars;
