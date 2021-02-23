import { useState, useEffect, useRef, useReducer } from "react";
import Chart from "chart.js";
import { useSpring, animated } from "react-spring";

const BTC_IndexWidget = (props) => {
  const [BTCIndexValue, setBTCIndexValue] = useState(null);
  const [BTCCascadeClose, setBTCCascadeClose] = useState(null);
  const [BTCCascadeDate, setBTCCascadeDate] = useState(null);

  const stockAnimProps = useSpring({
    config: { duration: 2000 },
    from: { opacity: 0, transform: "translateX(20px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
  });

  let isDarkMode = props.darkModeProp;

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
    const BTCFetchURL =
      "https://api.twelvedata.com/time_series?symbol=" +
      "BTC/USD" +
      "&exchange=Binance" +
      "&interval=1week&start_date=2020-1-10&end_date=" +
      todaysDate +
      "&apikey=8b61eafe6b2c4308aa8ebaa6799b4e59";

    fetch(BTCFetchURL)
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then(function (data) {
        let BTCCascadeClose = [];
        let BTCCascadeDate = [];

        let i;
        for (i = 52; i >= 0; i--) {
          BTCCascadeClose.push(data.values[i].close);
          setBTCCascadeClose(BTCCascadeClose);

          BTCCascadeDate.push(data.values[i].datetime);
          setBTCCascadeDate(BTCCascadeDate);
        }

        var ctx = document.getElementById("BTCChart").getContext("2d");

        /*
        if (isDarkMode) {
          Chart.defaults.global.defaultFontColor = "white";
        } else if (!isDarkMode) {
          Chart.defaults.global.defaultFontColor = "black";
        }

        */

        Chart.defaults.global.defaultFontColor = "grey";

        var dowChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: BTCCascadeDate,
            datasets: [
              {
                label: "BITCOIN",
                data: BTCCascadeClose,
                fill: false,
                borderColor: ["green"],
                backgroundColor: ["rgb(189, 218, 189)"],
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
            maintainAspectRatio: false,

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
      <animated.div
        id="indexChartCenter"
        style={{
          opacity: stockAnimProps.opacity,
          transform: stockAnimProps.transform,
        }}
      >
        <canvas
          id="BTCChart"
          className={
            isDarkMode ? "dowChartDisplay-Dark" : "dowChartDisplay-Light"
          }
          width="800"
          height="500"
        ></canvas>
      </animated.div>
      <p>{BTCIndexValue}</p>
    </>
  );
};

export default BTC_IndexWidget;
