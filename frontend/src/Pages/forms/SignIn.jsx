import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const SignIn = () => {
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

  const handleSignInForm = (data) => {
    setLoading(true);
    const formData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("https://planmybudget-backend.onrender.com/signin", formData, {
        withCredentials: true,
      })
      .then(() => navigate("/incomes"))
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false));
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignInForm)}
      className="text-textColor flex flex-col justify-center items-center h-[100vh] gap-6 small:max-md:px-20 max-small:px-5 min-[2000px]:mx-auto min-[2000px]:max-w-[100rem]"
    >
      <h1 className="text-2xl font-inter">
        Sign in to take control of your money
      </h1>
      <div className="w-full md:w-[50%]">
        <input
          type="email"
          placeholder="Enter your email"
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
        {loading ? "Please wait..." : " Sign In"}
      </button>
      <a href="/login">Already have an Account? Login</a>
    </form>
  );
};

export default SignIn;
