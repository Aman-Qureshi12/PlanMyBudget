import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { fetchingAllExpenses } from "../../features/expense/ExpenseSlice";
import Loader from "../../Components/Loader";

const ExpenseForm = ({ triggerModal }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
    setLoading(true);
    const ExpenseData = {
      date: data.date,
      purpose: data.purpose,
      category: data.category,
      expenseAmount: data.expenseAmount,
    };
    axios
      .post("http://localhost:8000/expenses", ExpenseData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        dispatch(fetchingAllExpenses());
        triggerModal("add");
      })
      .catch((err) => console.log("There was an error sending the data ", err))
      .finally(() => setLoading(false));
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
    <div className="w-full py-20 text-palePink">
      <div className="w-full flex justify-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          ref={buttonRef}
          onClick={handleShowForm}
          className="text-lg font-Inter bg-palePink text-richBlack px-4 py-2 rounded-sm w-full sm:w-[60%]  cursor-pointer"
        >
          Add Expense +
        </motion.button>
      </div>
      <AnimatePresence>
        {showForm ? (
          <>
            <motion.form
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }} // 🔥 exit animation
              transition={{ duration: 0.6, ease: "easeOut" }}
              ref={ref}
              onSubmit={(e) => {
                e.preventDefault(); // prevents native submit/reload
                handleSubmit(handleExpenseForm)(); // run react-hook-form's validation + submit
              }}
              className="pt-10 flex max-sm:flex-col items-center justify-center w-full  gap-6"
            >
              <div className="flex gap-6 max-large:flex-col w-full">
                <div className="w-full">
                  <input
                    className="px-4 py-2 rounded-sm border-2 border-palePink w-full"
                    type="date"
                    {...register("date")}
                  />
                  {errors.date && (
                    <p className="text-red-500">{errors.date.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="purpose"
                    className="px-4 py-2 rounded-sm border-2 border-palePink w-full"
                    {...register("purpose")}
                  />
                  {errors.purpose && (
                    <p className="text-red-500">{errors.purpose.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-6 max-large:flex-col w-full">
                <div className="w-full">
                  <input
                    className="px-4 py-2 rounded-sm border-2 border-palePink w-full"
                    type="number"
                    placeholder="enter the Amount"
                    {...register("expenseAmount")}
                  />
                  {errors.expenseAmount && (
                    <p className="text-red-500">
                      {errors.expenseAmount.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    className="px-4 py-2 rounded-sm border-2 border-palePink w-full"
                    type="text"
                    placeholder="Category"
                    {...register("category")}
                  />
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-6 max-large:flex-col max-sm:w-full">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handleExpenseFormCancelling}
                  className="text-base  px-4 py-2 bg-palePink text-richBlack rounded-sm cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  name="add"
                  whileTap={{ scale: 0.9 }}
                  disabled={loading}
                  className={` ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-palePink  "
                  } text-base  px-4 py-2 rounded-sm text-richBlack`}
                >
                  {loading ? <Loader bgBlack="bg-richBlack" /> : " Submit"}
                </motion.button>
              </div>
            </motion.form>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseForm;
