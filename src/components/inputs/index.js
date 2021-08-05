import React, { useContext } from "react";
import { InputContext } from "../../context/context";

function Inputs() {
  const {
    option,
    description,
    amount,
    handleOption,
    handleDescription,
    handleAmount,
    handleSubmit,
  } = useContext(InputContext);

  return (
    <form onSubmit={handleSubmit}>
      <select value={option} onChange={(e) => handleOption(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
      </select>

      <input
        type="text"
        placeholder="Add description"
        value={description}
        onChange={(e) => handleDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="enter amount"
        value={amount}
        onChange={(e) => handleAmount(e.target.value)}
      />

      <input type="submit" value="add" />
    </form>
  );
}

export default Inputs;
