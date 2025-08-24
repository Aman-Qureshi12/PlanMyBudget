import { useEffect, useState } from "react";

const IncomeForm = () => {
  const [multipleIncomeCheck, setMultipleIncomeCheck] = useState(false);
  const [multipleIncomeButton, setMultipleIncomeButton] = useState(false);

  const handleMultipleIncomeCheck = () => {
    setMultipleIncomeCheck(!multipleIncomeCheck);
  };

  const handleMultipleIncomeButton = () => {
    setMultipleIncomeButton(true);
  };

  useEffect(() => {
    console.log("The multiple Income is ", multipleIncomeCheck);
  }, [multipleIncomeCheck]);
  return (
    <form>
      <div className="flex flex-col gap-4 ">
        <label>Amount per Annum in Hand</label>
        <input
          type="number"
          placeholder="Enter your amount"
          className="px-4 py-2 w-[50%]"
        />
      </div>
      <div className="flex flex-col gap-4 ">
        <label>Amount per month in Hand</label>
        <input
          type="number"
          placeholder="Enter your amount"
          className="px-4 py-2 w-[50%]"
        />
      </div>
      <div className="flex flex-col gap-4 ">
        <label>Source</label>
        <input
          type="text"
          placeholder="Enter your source"
          className="px-4 py-2 w-[50%]"
        />
      </div>
      <div className="flex flex-col gap-4 ">
        <label>Currency</label>
        <select className="px-4 py-2 w-[50%]">
          <option disabled selected>
            Select your currency
          </option>
          <option value="Rupee">Rupee</option>
          <option value="Dollar">Dollar</option>
        </select>
      </div>
      <div>
        <label>Do you have multiple Incomes</label>
        <input type="checkbox" onChange={() => handleMultipleIncomeCheck()} />
      </div>

      {multipleIncomeCheck ? (
        <button
          className="px-4 py-2 bg-black text-white rounded-sm"
          onClick={(e) => {
            e.preventDefault(), handleMultipleIncomeButton();
          }}
        >
          Add New Income
        </button>
      ) : (
        ""
      )}
      {multipleIncomeButton && multipleIncomeCheck ? (
        <>
          {" "}
          <div className="flex flex-col gap-4 ">
            <label>Amount per Annum in Hand</label>
            <input
              type="number"
              placeholder="Enter your amount"
              className="px-4 py-2 w-[50%]"
            />
          </div>
          <div className="flex flex-col gap-4 ">
            <label>Amount per month in Hand</label>
            <input
              type="number"
              placeholder="Enter your amount"
              className="px-4 py-2 w-[50%]"
            />
          </div>
          <div className="flex flex-col gap-4 ">
            <label>Source</label>
            <input
              type="text"
              placeholder="Enter your source"
              className="px-4 py-2 w-[50%]"
            />
          </div>
          <div className="flex gap-10">
            <button cl>Cancel</button>
            <button>Submit</button>
          </div>
        </>
      ) : (
        ""
      )}
    </form>
  );
};

export default IncomeForm;
