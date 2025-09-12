import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

// € - euro  $ - dollar ₹ - rupee

const IncomeForm = () => {
  const Schema = z.object({
    // date: z.coerce.date().min(1, "Date is required"),
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
      // date: null,
      source: "",
      currency: "",
      annualIncome: null,
    },
    resolver: zodResolver(Schema),
  });

  const handleIncome = (data) => {
    const monthlyIncome = data.annualIncome / 12;
    const date = new Date();
    const incomeData = {
      date: date,
      source: data.source,
      currency: data.currency,
      annualIncome: data.annualIncome,
      monthlyIncome,
    };
    axios
      .post("http://localhost:8000/income", incomeData)
      .then(() => console.log("Data sent successfully"))
      .catch(() => console.log("There was an error sending the data "));
  };

  const handleCancel = () => {
    reset();
  };
  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={handleSubmit(handleIncome)}
    >
      <div className="flex gap-10 ">
        {/* <div className="w-full">
          <input
            type="date"
            className="px-4 py-2 rounded-sm border-2 border-black w-full"
            {...register("date")}
          />
          {errors.date && <p>{errors.date.message}</p>}
        </div> */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Source"
            className="px-4 py-2 rounded-sm border-2 border-black w-full"
            {...register("source")}
          />
          {errors.source && <p>{errors.source.message}</p>}
        </div>
      </div>
      <div className="flex gap-10 ">
        <div className="w-full">
          <select
            className="px-4 py-2 rounded-sm border-2 border-black w-full"
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
        <div className="w-full">
          <input
            type="number"
            placeholder="Annual Income"
            className="px-4 py-2 rounded-sm border-2 border-black w-full"
            {...register("annualIncome")}
          />
          {errors.annualIncome && <p>{errors.annualIncome.message}</p>}
        </div>
      </div>
      <div className="flex gap-10 w-full">
        <button
          onClick={handleCancel}
          className="text-base px-4 py-2 bg-black text-white rounded-sm cursor-pointer w-full"
        >
          Cancel
        </button>
        <button className="text-base px-4 py-2 bg-black text-white rounded-sm cursor-pointer w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;

// import { useEffect, useState } from "react";

// const IncomeForm = () => {
//   const [multipleIncomeCheck, setMultipleIncomeCheck] = useState(false);
//   const [multipleIncomeButton, setMultipleIncomeButton] = useState(false);

//   const handleMultipleIncomeCheck = () => {
//     setMultipleIncomeCheck(!multipleIncomeCheck);
//   };

//   const handleMultipleIncomeButton = () => {
//     setMultipleIncomeButton(true);
//   };

//   useEffect(() => {
//     console.log("The multiple Income is ", multipleIncomeCheck);
//   }, [multipleIncomeCheck]);
//   return (
//     <form>
//       <div className="flex flex-col gap-4 ">
//         <label>Amount per Annum in Hand</label>
//         <input
//           type="number"
//           placeholder="Enter your amount"
//           className="px-4 py-2 w-[50%]"
//         />
//       </div>
//       <div className="flex flex-col gap-4 ">
//         <label>Amount per month in Hand</label>
//         <input
//           type="number"
//           placeholder="Enter your amount"
//           className="px-4 py-2 w-[50%]"
//         />
//       </div>
//       <div className="flex flex-col gap-4 ">
//         <label>Source</label>
//         <input
//           type="text"
//           placeholder="Enter your source"
//           className="px-4 py-2 w-[50%]"
//         />
//       </div>
//       <div className="flex flex-col gap-4 ">
//         <label>Currency</label>
//         <select className="px-4 py-2 w-[50%]">
//           <option disabled selected>
//             Select your currency
//           </option>
//           <option value="Rupee">Rupee</option>
//           <option value="Dollar">Dollar</option>
//         </select>
//       </div>
//       <div>
//         <label>Do you have multiple Incomes</label>
//         <input type="checkbox" onChange={() => handleMultipleIncomeCheck()} />
//       </div>

//       {multipleIncomeCheck ? (
//         <button
//           className="px-4 py-2 bg-black text-white rounded-sm"
//           onClick={(e) => {
//             e.preventDefault(), handleMultipleIncomeButton();
//           }}
//         >
//           Add New Income
//         </button>
//       ) : (
//         ""
//       )}
//       {multipleIncomeButton && multipleIncomeCheck ? (
//         <>
//           {" "}
//           <div className="flex flex-col gap-4 ">
//             <label>Amount per Annum in Hand</label>
//             <input
//               type="number"
//               placeholder="Enter your amount"
//               className="px-4 py-2 w-[50%]"
//             />
//           </div>
//           <div className="flex flex-col gap-4 ">
//             <label>Amount per month in Hand</label>
//             <input
//               type="number"
//               placeholder="Enter your amount"
//               className="px-4 py-2 w-[50%]"
//             />
//           </div>
//           <div className="flex flex-col gap-4 ">
//             <label>Source</label>
//             <input
//               type="text"
//               placeholder="Enter your source"
//               className="px-4 py-2 w-[50%]"
//             />
//           </div>
//           <div className="flex gap-10">
//             <button cl>Cancel</button>
//             <button>Submit</button>
//           </div>
//         </>
//       ) : (
//         ""
//       )}
//     </form>
//   );
// };

// export default IncomeForm;
