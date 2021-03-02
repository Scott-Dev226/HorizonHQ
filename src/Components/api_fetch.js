import React, { useState, useEffect, useRef, useContext } from "react";
import Chart from "chart.js";
import useApiFetchSetup from "./apiFetchSetup.js";
import { PriceContext } from "./PriceContext";
import { PriceVarianceContext } from "./PriceVarianceContext";

const useApiFetch = () => {
  const { displayPrice, setDisplayPrice } = useContext(PriceContext);
  const { displayVariance, setDisplayVariance } = useContext(
    PriceVarianceContext
  );

  const {
    todaysDate,
    inputRef2,
    inputRef3,
    inputRef4,
    toggle,
    setToggle,
    newsBlock1,
    setNewsBlock1,
    newsBlock2,
    setNewsBlock2,
    newsBlock3,
    setNewsBlock3,
    newsBlock1URL,
    setNewsBlock1URL,
    newsBlock2URL,
    setNewsBlock2URL,
    newsBlock3URL,
    setNewsBlock3URL,
    symbol1,
    setSymbol1,
    symbol2,
    setSymbol2,
    symbol3,
    setSymbol3,
    stockDate,
    setStockDate,
    stockDate2,
    setStockDate2,
    stockDate3,
    setStockDate3,
    data,
    setData,
    stockVol1,
    setStockVol1,
    stockVol2,
    setStockVol2,
    stockVol3,
    setStockVol3,
    stockCascadeDate,
    setStockCascadeDate,
    stockCascadeClose,
    setStockCascadeClose,
    stockCascadeClose2,
    setStockCascadeClose2,
    stockCascadeClose3,
    setStockCascadeClose3,
    stock1Change,
    setStock1Change,
    stock2Change,
    setStock2Change,
    stock3Change,
    setStock3Change,
  } = useApiFetchSetup();

  let initialRender = useRef(true);

  var exchangeInputRef = useRef();

  const [stock1TodaysClose, setStock1TodaysClose] = useState(null);

  const [exchange, setExchange] = useState(null);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const fetchURL3 =
        "https://api.twelvedata.com/time_series?symbol=" +
        toggle +
        "&interval=1day&apikey=8b61eafe6b2c4308aa8ebaa6799b4e59";
      const histFetchURL3 =
        "https://api.twelvedata.com/time_series?symbol=" +
        toggle +
        "&exchange=" +
        exchange +
        "&interval=1day&start_date=2020-1-10&end_date=" +
        todaysDate +
        "&apikey=8b61eafe6b2c4308aa8ebaa6799b4e59";

      fetch(fetchURL3)
        .then(function (resp) {
          return resp.json();
        }) // Convert data to json
        .then(function (data) {
          const stock1TodaysClose = data.values[0].close;
          const stock1YesterdaysClose = data.values[1].close;
          const stockDate = data.values[0].datetime;
          let stock1Change =
            (100 * (stock1TodaysClose - stock1YesterdaysClose)) /
            stock1YesterdaysClose;
          stock1Change = stock1Change.toFixed(2);

          setStockDate(stockDate);

          setStock1TodaysClose(stock1TodaysClose);
          setDisplayPrice(stock1TodaysClose);
          setDisplayVariance(stock1Change);
        });

      fetch(histFetchURL3)
        .then(function (resp) {
          return resp.json();
        }) // Convert data to json
        .then(function (data) {
          setData(data);

          let stockCascadeClose = [];

          let stockCascadeDate = [];

          let i;
          for (i = 100; i >= 0; i--) {
            stockCascadeClose.push(data.values[i].close);
            stockCascadeDate.push(data.values[i].datetime);
          }

          const stockVol1 = data.values[0].volume / 1000000;

          const symbol1 = data.meta.symbol;

          setSymbol1(symbol1);

          setToggle(toggle);

          setStockVol1(stockVol1);

          setStockCascadeDate(stockCascadeDate);
          setStockCascadeClose(stockCascadeClose);

          var ctx = document.getElementById("myChart2").getContext("2d");
          Chart.defaults.global.defaultFontColor = "white";
          var myChart2 = new Chart(ctx, {
            type: "line",
            data: {
              labels: stockCascadeDate,
              datasets: [
                {
                  label: symbol1,
                  data: stockCascadeClose,

                  borderColor: ["blue"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: "",
              },
              responsive: true,
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

          var ctx2 = document.getElementById("myDoughChart").getContext("2d");
          var myDoughChart = new Chart(ctx2, {
            type: "doughnut",

            data: {
              labels: [symbol1],
              datasets: [
                {
                  data: [stockVol1],
                  backgroundColor: ["blue"],
                  borderColor: ["white"],
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: "DAILY TRADING VOLUME (in Millions)",
              },
              plugins: {
                labels: {
                  // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                  render: "value",
                  // precision for percentage, default is 0
                  precision: 0,
                  // identifies whether or not labels of value 0 are displayed, default is false
                  showZero: true,

                  fontSize: 14,
                  fontColor: "#fff",
                  fontStyle: "bold",
                  fontFamily: "Share-Tech, sans-serif",
                  textShadow: false,
                  shadowBlur: 0,
                  position: "outside",
                  shadowColor: "black",
                },
                datalabels: {
                  display: true,
                  backgroundColor: "red",
                  borderRadius: 3,
                  font: {
                    color: "green",
                    weight: "bold",
                  },
                },
                doughnutlabel: {
                  labels: [
                    {
                      text: "550",
                      font: {
                        size: 20,
                        weight: "bold",
                      },
                    },
                    {
                      text: "total",
                    },
                  ],
                },
              },
            },
          });
        });
    }
  }, [toggle]);

  return {
    symbol1,
    symbol2,
    symbol3,
    stockDate,
    stockVol1,
    stockVol2,
    stockVol3,
    inputRef2,
    inputRef3,
    inputRef4,
    setToggle,
    toggle,
    stockCascadeClose,

    stockCascadeDate,
    stock1Change,
    setStock1Change,

    stock1TodaysClose,
    exchange,
    setExchange,
    exchangeInputRef,
  };
};

export default useApiFetch;
