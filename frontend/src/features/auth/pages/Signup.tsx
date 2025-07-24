
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Calendar } from "lucide-react";

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
        onSuccess: () => navigate("/login"),
        onError: (err) => alert(err),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Left Side Image */}
        <div className="relative md:flex-1 hidden md:block">
          <img
            src="/landing.avif"
            alt="Landing"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="flex flex-1 flex-col justify-center p-8 sm:p-12 md:p-16">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-indigo-400 md:hidden mb-2">
                Darwin Chat
              </h1>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Join the conversation and stay connected
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: "Full name is required" })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Age"
                  {...register("age", { required: "Age is required" })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                disabled={isPending}
              >
                {isPending ? "Signing Up..." : "Sign Up"}
              </button>

              {isError && (
                <p className="text-red-500 text-sm text-center mt-2">{error?.message}</p>
              )}
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-gray-400 text-sm font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:underline">
                Log In
              </Link>
            </p>

            <p className="mt-4 text-center text-gray-600 text-xs">
              Powered by Darwin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

