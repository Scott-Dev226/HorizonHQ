import { useState, useEffect, useRef, useReducer } from "react";
import Chart from "chart.js";
import { useSpring, animated } from "react-spring";

const DowIndexWidget = (props) => {
  const [dowIndexValue, setDowIndexValue] = useState(null);
  const [dowCascadeClose, setDowCascadeClose] = useState(null);
  const [dowCascadeDate, setDowCascadeDate] = useState(null);

  const stockAnimProps = useSpring({
    config: { duration: 1500 },
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
    const dowFetchURL =
      "https://api.twelvedata.com/time_series?symbol=" +
      "DJI" +
      "&interval=1week&start_date=2020-1-10&end_date=" +
      todaysDate +
      "&apikey=8b61eafe6b2c4308aa8ebaa6799b4e59";

    fetch(dowFetchURL)
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then(function (data) {
        let dowCascadeClose = [];
        let dowCascadeDate = [];

        let i;
        for (i = 60; i >= 0; i--) {
          dowCascadeClose.push(data.values[i].close);
          setDowCascadeClose(dowCascadeClose);

          dowCascadeDate.push(data.values[i].datetime);
          setDowCascadeDate(dowCascadeDate);
        }

        var ctx = document.getElementById("dowChart").getContext("2d");

        /*
        if (isDarkMode) {
          Chart.defaults.global.defaultFontColor = "white";
        } else if (!isDarkMode) {
          Chart.defaults.global.defaultFontColor = "black";
        }

        */

        Chart.defaults.global.defaultFontFamily = "Arial Narrow";

        var dowChart = new Chart(ctx, {
          type: "line",
          fontColor: "rgb(238, 140, 59)",
          data: {
            labels: dowCascadeDate,

            datasets: [
              {
                label: "DOW JONES INDUSTRIAL AVG",
                data: dowCascadeClose,
                fill: false,
                borderColor: ["blue"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            legend: {
              labels: {
                fontColor: "rgb(238, 140, 59)",
                fontSize: 15,
              },
            },
            title: {
              fontColor: "rgb(238, 140, 59)",
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
                    fontColor: "rgb(238, 140, 59)",
                    fontSize: 17,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    fontColor: "rgb(238, 140, 59)",
                  },
                },
              ],
            },
          },
        });
      });
  }, []);

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
          id="dowChart"
          className={
            isDarkMode ? "dowChartDisplay-Dark" : "dowChartDisplay-Light"
          }
        ></canvas>
      </animated.div>
      <p>{dowIndexValue}</p>
    </>
  );
};

export default DowIndexWidget;
