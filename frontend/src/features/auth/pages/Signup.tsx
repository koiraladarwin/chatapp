import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
}

export default function Signup() {
  const { mutate, isPending, isError, error } = useSignup();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    console.log(data)
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    mutate(
      { Name: data.name, Email: data.email, Password: data.password, Age: data.age },
      {
        onSuccess: (_) => {
          navigate("/login");
        },
        onError: (err) => {
          alert(err)
        }
      }
    );
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      <div className="flex flex-col items-center w-full max-w-md p-8 sm:p-10 bg-gray-800 rounded-xl shadow-2xl gap-4">
        <div className="text-3xl sm:text-4xl font-bold text-white pb-4">
          Darwin Chat
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 sm:p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white bg-gray-700"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="p-3 sm:p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white bg-gray-700"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="Password"
            className="p-3 sm:p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white bg-gray-700"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 sm:p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white bg-gray-700"
            {...register("confirmPassword", { required: "Confirm password is required" })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
          )}

          <input
            type="number"
            placeholder="Age"
            className="p-3 sm:p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white bg-gray-700"
            {...register("age", { required: "Age is required" })}
          />
          {errors.age && (
            <span className="text-red-500 text-sm">{errors.age.message}</span>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isPending}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>

          {isError && <div className="text-red-500 mt-2">{error?.message}</div>}
        </form>

        <div className="mt-6 text-sm text-gray-400">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

