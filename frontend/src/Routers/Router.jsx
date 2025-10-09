import Layout from "../Layout/Layout";
import Overview from "../Pages/Overview";
import Expenses from "../Pages/Expenses";
import Investments from "../Pages/Investments";
import { Route, Routes } from "react-router-dom";
import Income from "../Pages/Income";
import LandingPage from "../Pages/LandingPage";
import SignIn from "../Pages/forms/SignIn";
import LoginIn from "../Pages/forms/LoginIn";

function Router() {
  return (
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<LoginIn />} />
      <Route element={<Layout />}>
        <Route path="/overview" element={<Overview />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/incomes" element={<Income />} />
      </Route>
    </Routes>
  );
}

export default Router;
