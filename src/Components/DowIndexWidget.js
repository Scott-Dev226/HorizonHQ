import { useState, useEffect, useRef, useReducer } from "react";
import Chart from "chart.js";

const DowIndexWidget = () => {
  const [dowIndexValue, setDowIndexValue] = useState(null);
  const [dowCascadeClose, setDowCascadeClose] = useState(null);
  const [dowCascadeDate, setDowCascadeDate] = useState(null);

  const today = new Date();
  let dd = today.getDate() - 2;
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
      "&interval=1day&start_date=2020-1-10&end_date=" +
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
        for (i = 100; i >= 0; i--) {
          dowCascadeClose.push(data.values[i].close);
          setDowCascadeClose(dowCascadeClose);

          dowCascadeDate.push(data.values[i].datetime);
          setDowCascadeDate(dowCascadeDate);
        }

        var ctx = document.getElementById("dowChart").getContext("2d");
        Chart.defaults.global.defaultFontColor = "black";
        var dowChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: dowCascadeDate,
            datasets: [
              {
                label: "DOW JONES INDUSTRIAL AVG",
                data: dowCascadeClose,

                borderColor: ["blue"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text:
                "CURRENT VALUE" + " $" + data.values[0].close + "    (USD/$)",
            },
            responsive: false,
            maintainAspectRatio: true,

            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
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
      <div>
        <canvas
          id="dowChart"
          className="dowChartDisplay"
          width="800"
          height="500"
        ></canvas>
      </div>
      <p>{dowIndexValue}</p>;
    </>
  );
};

export default DowIndexWidget;
