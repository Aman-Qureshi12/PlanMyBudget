import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const SignIn = () => {
  const navigate = useNavigate();
  const schema = z.object({
    email: z.string().min(1, "email is required"),
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
    const formData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("http://localhost:8000/signin", formData, { withCredentials: true })
      .then(() => navigate("/expenses"))
      .catch((err) => console.log("There was an error sending the data ", err));
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignInForm)}
      className="text-textColor flex flex-col justify-center items-center h-[100vh] gap-6"
    >
      <h1 className="text-2xl font-inter">
        Sign in to take control of your money
      </h1>
      <div className="w-[50%]">
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border-2 rounded-sm border-textColor font-roboto"
          {...register("email")}
        />
        {errors.email && (
          <p className="pt-1 text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="w-[50%]">
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
      <button className="bg-textColor text-richBlack text-lg font-roboto px-4 py-2 rounded-sm w-[50%]">
        Sign In
      </button>
      <a href="/login">Already have an Account? Login</a>
    </form>
  );
};

export default SignIn;
