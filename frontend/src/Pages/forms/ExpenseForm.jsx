import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const ExpenseForm = () => {
  const [showForm, setShowForm] = useState(false);
  const Schema = z.object({
    date: z.coerce.date().min(1, "Date is required"),
    purpose: z.string().min(1, "purpose is required"),
    category: z.string().min(1, "Category is required"),
    expenseAmount: z.coerce.number().min(1, "Amount is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      date: null,
      purpose: "",
      category: "",
      expenseAmount: null,
    },
    resolver: zodResolver(Schema),
  });

  const ref = useRef(null);
  const buttonRef = useRef(null);

  // Showing the Expense form when clicked
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Submitting the Expense form logic
  const handleExpenseForm = (data) => {
    const ExpenseData = {
      date: data.date,
      purpose: data.purpose,
      category: data.category,
      expenseAmount: data.expenseAmount,
    };
    axios
      .post("http://localhost:8000/expenses", ExpenseData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => console.log("The data has been send "))
      .catch((err) => console.log("There was an error sending the data ", err));
    console.log("The data is ", ExpenseData);
  };

  // canceling the expense form logic
  const handleExpenseFormCancelling = () => {
    setShowForm(false);
    reset();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full pr-10 py-20">
      <div className="w-full flex justify-center">
        <button
          ref={buttonRef}
          onClick={handleShowForm}
          className="text-lg font-Inter bg-black text-white px-4 py-2 rounded-sm w-[60%] cursor-pointer"
        >
          Add Expense +
        </button>
      </div>
      {showForm ? (
        <>
          <form
            ref={ref}
            onSubmit={handleSubmit(handleExpenseForm)}
            className="pt-10 flex gap-6"
          >
            <div>
              <input
                className="px-4 py-2 rounded-sm border-2 border-black"
                type="date"
                {...register("date")}
              />
              {errors.date && <p>{errors.date.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="purpose"
                className="px-4 py-2 rounded-sm border-2 border-black"
                {...register("purpose")}
              />
              {errors.purpose && <p>{errors.purpose.message}</p>}
            </div>
            <div>
              <input
                className="px-4 py-2 rounded-sm border-2 border-black"
                type="number"
                placeholder="enter the Amount"
                {...register("expenseAmount")}
              />
              {errors.expenseAmount && <p>{errors.expenseAmount.message}</p>}
            </div>
            <div>
              <input
                className="px-4 py-2 rounded-sm border-2 border-black"
                type="text"
                placeholder="Category"
                {...register("category")}
              />
              {errors.category && <p>{errors.category.message}</p>}
            </div>
            <div className="flex gap-6">
              <button
                onClick={handleExpenseFormCancelling}
                className="text-base px-4 py-2 bg-black text-white rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button className="text-base px-4 py-2 bg-black text-white rounded-sm cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default ExpenseForm;

// import React from "react";

// import axios from "axios";
// import { useState } from "react";

// const ExpenseForm = () => {
//   const [expense, setExpense] = useState("");
//   const [date, setDate] = useState("");

//   const handleExpenses = (e) => {
//     e.preventDefault();

//     const data = { expense, date };
//     axios
//       .post("http://localhost:8000/addExpense", data, {
//         headers: { "Content-Type": "application/json" },
//       })
//       .then(() => console.log("The data has been send successfully"))
//       .catch((err) => console.log("There was an error sending the data ", err));

//     setDate("");
//     setExpense("");
//   };
//   console.log("The value is ", date);
//   return (
//     <form onSubmit={handleExpenses}>
//       <input
//         type="number"
//         placeholder="enter the expenseAmount"
//         onChange={(e) => setExpense(e.target.value)}
//         value={expense}
//       />
//       <input
//         type="date"
//         onChange={(e) => setDate(e.target.value)}
//         value={date}
//       />
//       <button>Add Expense</button>
//     </form>
//   );
// };

// export default ExpenseForm;
