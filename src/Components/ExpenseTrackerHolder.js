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
    if (income.length < 3) {
      let temp = 0;
      for (let i = 0; i < income.length; i++) {
        temp += parseInt(income[i].price);
      }
      setTotalIncome(temp);
    } else {
      let temp = 0;

      for (let i = 0; i < income.length; i++) {
        temp += parseInt(income[i].price);
      }

      setTotalIncome(temp);

      var ctx = document.getElementById("stackedBar").getContext("2d");
      var stackedBar = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [income[0].desc, income[1].desc, income[2].desc],
          datasets: [
            {
              label: "Your Current Costs",
              backgroundColor: ["red", "white", "blue"],
              data: [income[0].price, income[1].price, income[2].price],
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Income Tracker Results",
          },
        },
      });
    }
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
        <canvas id="stackedBar" width="800" height="500"></canvas>
      </div>
    </div>
  );
};

export default ExpenseTrackerHolder;
