import React, { useState, useEffect } from "react";
import { Header, Lists, Inputs } from "./components";

import { InputContext, HeaderContext, ListsContext } from "./context/context";

import "./App.css";

function App() {
  const [income, setIncome] = useState(getHeaderInitialValue("income"));
  const [expense, setExpense] = useState(getHeaderInitialValue("expense"));

  const [option, setOption] = useState("+");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const [incomeArray, setIncomeArray] = useState(
    getListInitialValue("incomeArray")
  );
  const [expenseList, setExpenseList] = useState(
    getListInitialValue("expenseList")
  );

  function getListInitialValue(value) {
    return window.localStorage.getItem(value)
      ? JSON.parse(window.localStorage.getItem(value))
      : [];
  }

  function getHeaderInitialValue(value) {
    return window.localStorage.getItem(value)
      ? Number(window.localStorage.getItem(value))
      : 0;
  }

  useEffect(() => {
    setLocalStorage();
  }, [income, expense, incomeArray, expenseList]);

  function setLocalStorage() {
    window.localStorage.setItem("income", income);
    window.localStorage.setItem("expense", expense);
    window.localStorage.setItem("incomeArray", JSON.stringify(incomeArray));
    window.localStorage.setItem("expenseList", JSON.stringify(expenseList));
  }

  function handleOption(value) {
    setOption(value);
  }

  function handleDescription(value) {
    setDescription(value);
  }

  function handleAmount(value) {
    setAmount(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //cannot submit if amount is empty
    if (amount === 0) return;
    //is it an expense or income?
    if (option === "+") {
      setIncome(income + parseFloat(amount));
      setIncomeArray([...incomeArray, { description, amount }]);
    } else {
      setExpense(expense - parseFloat(amount));
      setExpenseList([...expenseList, { description, amount }]);
    }
    reset();
  }

  function handleDeleteIncome(index) {
    let incomeItemToDelete = incomeArray[index];

    setIncome(income - incomeItemToDelete.amount);

    let newIncomeArray = [...incomeArray];

    newIncomeArray.splice(index, 1);

    setIncomeArray(newIncomeArray);
  }

  function handleDeleteExpense(index) {
    let expenseItemToDelete = expenseList[index];

    setExpense(expense - expenseItemToDelete.amount);

    let newExpenseArray = Object.assign([], expenseList);

    newExpenseArray.splice(index, 1);

    setExpenseList(newExpenseArray);
  }

  function reset() {
    setAmount(0);
    setDescription("");
  }

  const inputContextValue = {
    option,
    description,
    amount,
    handleOption,
    handleDescription,
    handleAmount,
    handleSubmit,
  };

  const listContextValue = {
    incomeArray,
    expenseList,
    handleDeleteIncome,
    handleDeleteExpense,
  };

  const headerContextValue = {
    income,
    expense,
  };

  return (
    <div className="App">
      <HeaderContext.Provider value={headerContextValue}>
        <Header />
      </HeaderContext.Provider>

      <InputContext.Provider value={inputContextValue}>
        <Inputs />
      </InputContext.Provider>

      <ListsContext.Provider value={listContextValue}>
        <Lists />
      </ListsContext.Provider>
    </div>
  );
}

export default App;
