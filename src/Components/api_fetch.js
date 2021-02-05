import React, { useState, useEffect, useRef, useReducer } from "react";
import Chart from "chart.js";
import useApiFetchSetup from "./apiFetchSetup.js";

const useApiFetch = () => {
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

  const [stock1TodaysClose, setStock1TodaysClose] = useState(null);
  const [stock2TodaysClose, setStock2TodaysClose] = useState(null);
  const [stock3TodaysClose, setStock3TodaysClose] = useState(null);

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
        "&exchange=NASDAQ&interval=1day&start_date=2020-1-10&end_date=" +
        todaysDate +
        "&apikey=8b61eafe6b2c4308aa8ebaa6799b4e59";

      fetch(fetchURL3)
        .then(function (resp) {
          return resp.json();
        }) // Convert data to json
        .then(function (data) {
          const stock1TodaysClose =
            data[inputRef2.current.value].values[0].close;
          const stock1YesterdaysClose =
            data[inputRef2.current.value].values[1].close;
          const stockDate = data[inputRef2.current.value].values[0].datetime;
          let stock1Change =
            (100 * (stock1TodaysClose - stock1YesterdaysClose)) /
            stock1YesterdaysClose;
          stock1Change = stock1Change.toFixed(2);

          const stock2TodaysClose =
            data[inputRef3.current.value].values[0].close;
          const stock2YesterdaysClose =
            data[inputRef3.current.value].values[1].close;
          const stockDate2 = data[inputRef3.current.value].values[0].datetime;
          let stock2Change =
            (100 * (stock2TodaysClose - stock2YesterdaysClose)) /
            stock2YesterdaysClose;
          stock2Change = stock2Change.toFixed(2);

          const stock3TodaysClose =
            data[inputRef4.current.value].values[0].close;
          const stock3YesterdaysClose =
            data[inputRef4.current.value].values[1].close;
          const stockDate3 = data[inputRef4.current.value].values[0].datetime;
          let stock3Change =
            (100 * (stock3TodaysClose - stock3YesterdaysClose)) /
            stock3YesterdaysClose;
          stock3Change = stock3Change.toFixed(2);

          setStock1Change(stock1Change);
          setStock2Change(stock2Change);
          setStock3Change(stock3Change);

          setStockDate(stockDate);
          setStockDate2(stockDate2);
          setStockDate3(stockDate3);

          setStock1TodaysClose(stock1TodaysClose);
          setStock2TodaysClose(stock2TodaysClose);
          setStock3TodaysClose(stock3TodaysClose);
        });

      fetch(histFetchURL3)
        .then(function (resp) {
          return resp.json();
        }) // Convert data to json
        .then(function (data) {
          setData(data);

          let stockCascadeClose = [];
          let stockCascadeClose2 = [];
          let stockCascadeClose3 = [];
          let stockCascadeDate = [];

          let i;
          for (i = 100; i >= 0; i--) {
            stockCascadeClose.push(
              data[inputRef2.current.value].values[i].close
            );
            stockCascadeDate.push(
              data[inputRef2.current.value].values[i].datetime
            );
            stockCascadeClose2.push(
              data[inputRef3.current.value].values[i].close
            );
            stockCascadeClose3.push(
              data[inputRef4.current.value].values[i].close
            );
          }

          const stockVol1 =
            data[inputRef2.current.value].values[0].volume / 1000000;
          const stockVol2 =
            data[inputRef3.current.value].values[0].volume / 1000000;
          const stockVol3 =
            data[inputRef4.current.value].values[0].volume / 1000000;

          const symbol1 = data[inputRef2.current.value].meta.symbol;
          const symbol2 = data[inputRef3.current.value].meta.symbol;
          const symbol3 = data[inputRef4.current.value].meta.symbol;

          setSymbol1(symbol1);
          setSymbol2(symbol2);
          setSymbol3(symbol3);
          setToggle(toggle);

          setStockVol1(stockVol1);
          setStockVol2(stockVol2);
          setStockVol3(stockVol3);

          setStockCascadeDate(stockCascadeDate);
          setStockCascadeClose(stockCascadeClose);
          setStockCascadeClose2(stockCascadeClose2);
          setStockCascadeClose3(stockCascadeClose3);

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

                {
                  label: symbol2,
                  data: stockCascadeClose2,

                  borderColor: ["white"],
                  borderWidth: 1,
                },

                {
                  label: symbol3,
                  data: stockCascadeClose3,

                  borderColor: ["grey"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: "DAILY CLOSING STOCK PRICE (USD/$)",
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
              labels: [symbol1, symbol2, symbol3],
              datasets: [
                {
                  data: [stockVol1, stockVol2, stockVol3],
                  backgroundColor: ["blue", "white", "grey"],
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
    stockCascadeClose2,
    stockCascadeClose3,
    stockCascadeDate,
    stock1Change,
    setStock1Change,
    stock2Change,
    setStock2Change,
    stock3Change,
    setStock3Change,
    stock1TodaysClose,
    stock2TodaysClose,
    stock3TodaysClose,
  };
};

export default useApiFetch;
