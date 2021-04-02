import { useState, useEffect, useRef, useReducer } from "react";
import Chart from "chart.js";
import { useSpring, animated } from "react-spring";

const NASDAQ_IndexWidget = (props) => {
  const [SPIndexValue, setSPIndexValue] = useState(null);
  const [SPCascadeClose, setSPCascadeClose] = useState(null);
  const [SPCascadeDate, setSPCascadeDate] = useState(null);
  let indexGraphPeriod = props.interimProp;

  const stockAnimProps = useSpring({
    config: { duration: 2000 },
    from: { opacity: 0, transform: "translateX(20px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
  });

  let isDarkMode = props.darkModeProp;

  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  const todaysDate = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    const SPFetchURL =
      "https://api.twelvedata.com/time_series?symbol=" +
      "IXIC" +
      "&interval=1week&start_date=2020-1-10&end_date=" +
      todaysDate +
      "&apikey=f12c3d6e34d241178fae0bd392e18b07";

    fetch(SPFetchURL)
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then(function (data) {
        let SPCascadeClose = [];
        let SPCascadeDate = [];

        let i;
        for (i = indexGraphPeriod; i >= 0; i--) {
          SPCascadeClose.push(data.values[i].close);
          setSPCascadeClose(SPCascadeClose);

          SPCascadeDate.push(data.values[i].datetime);
          setSPCascadeDate(SPCascadeDate);
        }

        var ctx2 = document.getElementById("SPChart").getContext("2d");

        /*
        if (isDarkMode) {
          Chart.defaults.global.defaultFontColor = "white";
        } else if (!isDarkMode) {
          Chart.defaults.global.defaultFontColor = "black";
        }

        */

        Chart.defaults.global.defaultFontFamily = "Arial Narrow";

        var SPChart = new Chart(ctx2, {
          type: "line",
          data: {
            labels: SPCascadeDate,
            datasets: [
              {
                label: "NASDAQ",
                data: SPCascadeClose,
                fill: true,
                borderColor: ["red"],
                backgroundColor: ["rgb(252, 233, 231)"],
                borderWidth: 3,
                fontColor: "red",
              },
            ],
          },
          options: {
            legend: {
              labels: {
                fontColor: "black",
                fontSize: 17,
              },
            },
            title: {
              fontColor: "black",
              display: true,
              text:
                "CURRENT VALUE" + " $" + data.values[0].close + "    (USD/$)",
            },
            responsive: false,
            maintainAspectRatio: false,

            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    fontColor: "black",
                    fontSize: 17,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    fontColor: "black",
                  },
                },
              ],
            },
          },
        });
      });
  }, [indexGraphPeriod]);

  return (
    <>
      <animated.div
        id="indexChartCenter"
        style={{
          opacity: stockAnimProps.opacity,
          transform: stockAnimProps.transform,
        }}
      >
        <canvas
          id="SPChart"
          className={
            isDarkMode ? "dowChartDisplay-Dark" : "dowChartDisplay-Light"
          }
        ></canvas>
      </animated.div>
      <p>{SPIndexValue}</p>
    </>
  );
};

export default NASDAQ_IndexWidget;
