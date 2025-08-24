import Layout from "../Layout/Layout";
import Overview from "../Pages/Overview";
import Expenses from "../Pages/Expenses";
import Insurances from "../Pages/Insurances";
import Investments from "../Pages/Investments";
import { Route, Routes } from "react-router-dom";
import IncomeForm from "../Pages/forms/IncomeForm";
import ExpenseForm from "../Pages/forms/ExpenseForm";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/overview" element={<Overview />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/insurances" element={<Insurances />} />
      </Route>
      <Route path="/incomeForm" element={<IncomeForm />} />
      <Route path="/addExpense" element={<ExpenseForm />} />
    </Routes>
  );
}

export default Router;
