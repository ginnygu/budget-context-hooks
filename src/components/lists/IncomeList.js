import React, { useContext } from "react";
import { ListsContext } from "../../context/context";

function IncomeList() {
  const { incomeArray, handleDeleteIncome } = useContext(ListsContext);

  return (
    <div>
      <h2>Income</h2>
      <ul>
        {incomeArray.map((income, index) => {
          return (
            <li key={index}>
              <button onClick={() => handleDeleteIncome(index)}>Delete</button>
              <span>{income.description}</span>
              <span>{income.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IncomeList;
