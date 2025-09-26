import { useForm } from "react-hook-form";
import axios from "axios";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";

const InvestmentForm = () => {
  const [showForm, setShowForm] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);

  const schema = z.object({
    date: z.coerce.date().min(1, "Date is required"),
    purpose: z.string().min(1, "purpose is required"),
    category: z.string().min(1, "Category is required"),
    investmentAmount: z.coerce.number().min(1, "Amount is required"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: null,
      purpose: "",
      category: "",
      investmentAmount: null,
    },
    resolver: zodResolver(schema),
  });

  const handleInvestmentForm = (data) => {
    const investmentFormData = {
      date: data.date,
      purpose: data.purpose,
      category: data.category,
      investmentAmount: data.investmentAmount,
    };
    axios
      .post("http://localhost:8000/investments", investmentFormData)
      .then(() => console.log("Send Successfully"))
      .catch((err) =>
        console.log("there was an error sending the form data", err)
      );
  };

  // const handleExpenseFormCancelling = () => {
  //   setShowForm(false);
  //   reset();
  // };

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

  const handleInvestmentFormCancelling = () => {
    setShowForm(false);
    reset();
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="w-full pr-10 py-20 text-Purple">
      <div className="w-full flex justify-center">
        <button
          ref={buttonRef}
          onClick={handleShowForm}
          className="text-lg font-Inter bg-Purple text-richBlack px-4 py-2 rounded-sm w-[60%] cursor-pointer"
        >
          Add Investment +
        </button>
      </div>
      {showForm ? (
        <>
          <form
            ref={ref}
            onSubmit={handleSubmit(handleInvestmentForm)}
            className="pt-10 flex gap-6"
          >
            <div>
              <input
                className="px-4 py-2 rounded-sm border-2 border-Purple"
                type="date"
                {...register("date")}
              />
              {errors.date && <p>{errors.date.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="purpose"
                className="px-4 py-2 rounded-sm border-2 border-Purple"
                {...register("purpose")}
              />
              {errors.purpose && <p>{errors.purpose.message}</p>}
            </div>
            <div>
              <input
                className="px-4 py-2 rounded-sm border-2 border-Purple"
                type="number"
                placeholder="enter the Amount"
                {...register("investmentAmount")}
              />
              {errors.investmentAmount && (
                <p>{errors.investmentAmount.message}</p>
              )}
            </div>
            <div>
              <input
                className="px-4 py-2 rounded-sm border-2 border-Purple"
                type="text"
                placeholder="Category"
                {...register("category")}
              />
              {errors.category && <p>{errors.category.message}</p>}
            </div>
            <div className="flex gap-6">
              <button
                onClick={handleInvestmentFormCancelling}
                className="text-base px-4 py-2 bg-Purple text-richBlack rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button className="text-base px-4 py-2 bg-Purple text-richBlack rounded-sm cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default InvestmentForm;
