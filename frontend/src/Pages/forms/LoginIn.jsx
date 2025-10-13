import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import Loader from "../../Components/Loader";

const LoginIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const schema = z.object({
    email: z
      .string()
      .min(1, "email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: z.string().min(1, "password is required"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const handleLogInForm = (data) => {
    setLoading(true);
    const formData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("https://planmybudget-backend.onrender.com/login", formData, {
        withCredentials: true,
      })
      .then(() => navigate("/expenses"))
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false));
  };
  return (
    <form
      onSubmit={handleSubmit(handleLogInForm)}
      className="text-textColor flex flex-col justify-center items-center h-[100vh] gap-6 small:max-md:px-20 max-small:px-5 min-[2000px]:mx-auto min-[2000px]:max-w-[100rem]"
    >
      <h1 className="text-2xl font-inter">Welcome Back</h1>
      <div className="w-full md:w-[50%]">
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full px-4 py-2 border-2 rounded-sm border-textColor font-roboto"
          {...register("email", {
            onChange: () => setError(""),
          })}
        />
        {errors.email ? (
          <p className="pt-1 text-red-500">{errors.email.message}</p>
        ) : (
          <p className="pt-1 text-red-500">{error}</p>
        )}
      </div>

      <div className="w-full md:w-[50%]">
        <input
          type="password"
          placeholder="Enter your Password"
          className="w-full px-4 py-2 border-2 rounded-sm border-textColor font-roboto"
          {...register("password")}
        />
        {errors.password && (
          <p className="pt-1 text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        disabled={loading}
        className={` ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-textColor text-richBlack "
        }text-lg font-roboto px-4 py-2 rounded-sm w-full md:w-[50%]`}
      >
        {loading ? "Please wait..." : " Log In"}
      </button>
      <a href="/signin">Don't have an Account? Signin</a>
    </form>
  );
};

export default LoginIn;
