import { useState, useEffect, useRef, useReducer } from "react";
import ExpenseHeader from "./ExpenseHeader";
import IncomeForm from "./IncomeForm";
import Chart from "chart.js";
import labelz from "chartjs-plugin-labels";

const ExpenseTrackerHolder = () => {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  let initialRender = useRef(true);

  useEffect(() => {
    let chartData = [];
    let chartLables = [];

    let temp = 0;

    for (let i = 0; i < income.length; i++) {
      temp += parseInt(income[i].price);
      chartData.push(income[i].price);
      chartLables.push(income[i].desc);
    }

    setTotalIncome(temp);

    var ctx2 = document.getElementById("incomeDonut").getContext("2d");
    var incomeDonut = new Chart(ctx2, {
      type: "doughnut",

      data: {
        labels: chartLables,
        datasets: [
          {
            data: chartData,
            backgroundColor: [
              "red",
              "white",
              "blue",
              "green",
              "grey",
              "yellow",
            ],
            borderColor: ["white"],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Your Current Costs",
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
  }, [income]);

  return (
    <div>
      <div>
        <ExpenseHeader totalIncome={totalIncome} />
        <IncomeForm
          income={income}
          setIncome={setIncome}
          setTotalIncome={setTotalIncome}
        />
      </div>
      <div>
        <canvas id="incomeDonut" width="800" height="500"></canvas>
      </div>
    </div>
  );
};

export default ExpenseTrackerHolder;
