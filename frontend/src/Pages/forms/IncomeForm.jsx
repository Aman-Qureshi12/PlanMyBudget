import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";

// € - euro  $ - dollar ₹ - rupee

const IncomeForm = () => {
  const [showForm, setShowForm] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const Schema = z.object({
    category: z.string().min(1, "category is required"),
    source: z.string().min(1, "source is required"),
    currency: z.enum(["Rupee", "Euro", "Dollar"], {
      message: "Currency is required",
    }),
    annualIncome: z.coerce.number().min(1, "Amount is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      source: "",
      currency: "",
      annualIncome: null,
    },
    resolver: zodResolver(Schema),
  });

  // Showing the Expense form when clicked
  const handleShowForm = () => {
    setShowForm(true);
  };

  // canceling the expense form logic
  const handleIncomeFormCancelling = () => {
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

  const handleIncome = (data) => {
    const monthlyIncome = Math.round(data.annualIncome / 12);

    const incomeData = {
      category: data.category,
      source: data.source,
      currency: data.currency,
      annualIncome: data.annualIncome,
      monthlyIncome,
    };
    axios
      .post("http://localhost:8000/incomes", incomeData, {
        withCredentials: true,
      })
      .then(() => console.log("Data sent successfully"))
      .catch(() => console.log("There was an error sending the data "));
  };

  return (
    <div className="flex flex-col gap-10 text-textColor">
      <div className="w-full flex justify-center">
        <button
          ref={buttonRef}
          onClick={handleShowForm}
          className="text-lg font-Inter bg-palePink text-richBlack px-4 py-2 rounded-sm w-[60%] cursor-pointer"
        >
          Add Income +
        </button>
      </div>

      {showForm ? (
        <>
          <form
            ref={ref}
            onSubmit={handleSubmit(handleIncome)}
            className="pt-10 flex gap-6"
          >
            <div>
              <select
                className="px-4 py-2 rounded-sm border-2 bg-richBlack border-textColor w-full"
                {...register("category")}
              >
                <option disabled value="">
                  Select Category
                </option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
              </select>
              {errors.category && <p>{errors.category.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Source"
                className="px-4 py-2 rounded-sm border-2 border-textColor w-full"
                {...register("source")}
              />
              {errors.source && <p>{errors.source.message}</p>}
            </div>

            <div>
              <select
                className="px-4 py-2 rounded-sm border-2 bg-richBlack border-textColor w-full"
                {...register("currency")}
              >
                <option disabled value="">
                  Select Currency
                </option>
                <option value="Rupee">Rupee</option>
                <option value="Euro">Euro</option>
                <option value="Dollar">Dollar</option>
              </select>
              {errors.currency && <p>{errors.currency.message}</p>}
            </div>

            <div>
              <input
                type="number"
                placeholder="Annual Income"
                className="px-4 py-2 rounded-sm border-2 border-textColor w-full"
                {...register("annualIncome")}
              />
              {errors.annualIncome && <p>{errors.annualIncome.message}</p>}
            </div>

            <div className="flex gap-6">
              <button
                onClick={handleIncomeFormCancelling}
                className="text-base px-4 py-2 bg-palePink text-richBlack rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button className="text-base px-4 py-2 bg-palePink text-richBlack rounded-sm cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default IncomeForm;
