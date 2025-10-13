import { useForm } from "react-hook-form";
import axios from "axios";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { fetchInvestmentDetails } from "../../features/investment/InvestmentSlice";
import Loader from "../../Components/Loader";

const InvestmentForm = ({ triggerModal, setApiErrors }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

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
    setLoading(true);
    const investmentFormData = {
      date: data.date,
      purpose: data.purpose,
      category: data.category,
      investmentAmount: data.investmentAmount,
    };
    axios
      .post("http://localhost:8000/investments", investmentFormData, {
        withCredentials: true,
      })
      .then(() => {
        triggerModal("add");
        dispatch(fetchInvestmentDetails());
      })
      .catch(() => setApiErrors(true))
      .finally(() => setLoading(false));
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
    <div className="w-full  py-20 text-Purple">
      <div className="w-full flex justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          ref={buttonRef}
          onClick={handleShowForm}
          className="text-lg font-Inter bg-Purple text-richBlack px-4 py-2 rounded-sm w-full sm:w-[60%] cursor-pointer"
        >
          Add Investment +
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
                handleSubmit(handleInvestmentForm)(); // run react-hook-form's validation + submit
              }}
              className="pt-10 flex max-sm:flex-col items-center justify-center w-full  gap-6"
            >
              <div className="flex gap-6 max-large:flex-col w-full">
                <div className="w-full">
                  <input
                    className="px-4 py-2 rounded-sm border-2 border-Purple w-full"
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
                    className="px-4 py-2 rounded-sm border-2 border-Purple w-full"
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
                    className="px-4 py-2 rounded-sm border-2 border-Purple w-full"
                    type="number"
                    placeholder="enter the Amount"
                    {...register("investmentAmount")}
                  />
                  {errors.investmentAmount && (
                    <p className="text-red-500">
                      {errors.investmentAmount.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    className="px-4 py-2 rounded-sm border-2 border-Purple w-full"
                    type="text"
                    placeholder="Category"
                    {...register("category")}
                  />
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-6  max-large:flex-col max-sm:w-full">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handleInvestmentFormCancelling}
                  className="text-base px-4 py-2 bg-Purple text-richBlack rounded-sm cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  disabled={loading}
                  className={` ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-Purple  "
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

export default InvestmentForm;
