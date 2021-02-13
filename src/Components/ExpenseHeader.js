const ExpenseHeader = ({ totalIncome }) => {
  return (
    <div>
      <h1> Personal Cost Tracker</h1>
      <div className="total-income">${totalIncome}</div>
    </div>
  );
};

export default ExpenseHeader;
