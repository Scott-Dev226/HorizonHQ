import { useState, useEffect, useRef, useReducer } from "react";

const IncomeForm = ({ income, setIncome, setTotalIncome }) => {
  const desc = useRef(null);
  const date = useRef(null);
  const price = useRef(null);

  const AddIncome = (e) => {
    e.preventDefault();

    setIncome([
      ...income,
      {
        desc: desc.current.value,
        price: price.current.value,
        date: date.current.value,
      },
    ]);

    desc.current.value = "";
    price.current.value = null;
    date.current.value = null;
  };

  return (
    <form className="income-form" onSubmit={AddIncome}>
      <div className="form-inner">
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Enter Cost Description..."
          ref={desc}
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price..."
          ref={price}
        />
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Income Date..."
          ref={date}
        />
        <input id="income-submit" type="submit" value="Add Income" />
      </div>
    </form>
  );
};

export default IncomeForm;
