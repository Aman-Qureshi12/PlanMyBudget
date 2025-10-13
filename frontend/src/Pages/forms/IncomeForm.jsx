import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { fetchingIncomeDetails } from "../../features/income/IncomeSlice";
import Loader from "../../Components/Loader";

// € - euro  $ - dollar ₹ - rupee

const IncomeForm = ({ triggerModal, Currency, setApiErrors }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const Schema = z.object({
    category: z.string().min(1, "category is required"),
    source: z.string().min(1, "source is required"),
    currency: Currency
      ? z.string().optional() // if prop provided, skip validation
      : z.enum(["Rupee", "Euro", "Dollar"], {
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
    setLoading(true);
    const monthlyIncome = Math.round(data.annualIncome / 12);

    const checkCurrency = Currency ? Currency : data.currency;

    const incomeData = {
      category: data.category,
      source: data.source,
      currency: checkCurrency,
      annualIncome: data.annualIncome,
      monthlyIncome,
    };
    axios
      .post("https://planmybudget-backend.onrender.com/incomes", incomeData, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(fetchingIncomeDetails());
        triggerModal("add");
      })
      .catch(() => setApiErrors(true))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col gap-10 text-skyBlue pt-20">
      <div className="w-full flex justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          ref={buttonRef}
          onClick={handleShowForm}
          className="text-lg font-Inter bg-skyBlue text-richBlack px-4 py-2 rounded-sm w-full sm:w-[60%] cursor-pointer"
        >
          Add Income +
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.form
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }} // 🔥 exit animation
              transition={{ duration: 0.6, ease: "easeOut" }}
              ref={ref}
              onSubmit={handleSubmit(handleIncome)}
              className="pt-10 flex max-sm:flex-col items-center justify-center w-full  gap-6"
            >
              <div className="flex gap-6 max-large:flex-col w-full">
                <div className="w-full">
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
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Source"
                    className="px-4 py-2 rounded-sm border-2 border-textColor w-full"
                    {...register("source")}
                  />
                  {errors.source && (
                    <p className="text-red-500">{errors.source.message}</p>
                  )}
                </div>
              </div>

              {Currency ? (
                <div className="flex w-full gap-6 max-large:flex-col">
                  <div className="flex gap-6 max-large:flex-col w-full">
                    <div className="w-full">
                      <input
                        type="number"
                        placeholder="Annual Income"
                        className="px-4 py-2 rounded-sm border-2 border-textColor w-full"
                        {...register("annualIncome")}
                      />
                      {errors.annualIncome && (
                        <p className="text-red-500">
                          {errors.annualIncome.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-6 max-sm:flex-col  max-sm:w-full">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={handleIncomeFormCancelling}
                      className="text-base px-4 py-2 bg-black text-skyBlue rounded-sm cursor-pointer max-large:w-full"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.9 }}
                      disabled={loading}
                      className={` ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-skyBlue  "
                      } text-base  px-4 py-2 rounded-sm text-richBlack max-large:w-full`}
                    >
                      {loading ? <Loader bgBlack="bg-richBlack" /> : " Submit"}
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-6 max-large:flex-col w-full">
                    <div className={` w-full`}>
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
                      {errors.currency && (
                        <p className="text-red-500">
                          {errors.currency.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        type="number"
                        placeholder="Annual Income"
                        className="px-4 py-2 rounded-sm border-2 border-textColor w-full"
                        {...register("annualIncome")}
                      />
                      {errors.annualIncome && (
                        <p className="text-red-500">
                          {errors.annualIncome.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-6  max-large:flex-col max-sm:w-full">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={handleIncomeFormCancelling}
                      className="text-base px-4 py-2 bg-black text-skyBlue rounded-sm cursor-pointer"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.9 }}
                      disabled={loading}
                      className={` ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-skyBlue  "
                      } text-base  px-4 py-2 rounded-sm text-richBlack`}
                    >
                      {loading ? <Loader bgBlack="bg-richBlack" /> : " Submit"}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.form>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IncomeForm;
