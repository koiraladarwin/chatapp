
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      <div className="flex flex-col items-center w-full max-w-md p-8 sm:p-10 bg-gray-800 rounded-xl shadow-2xl gap-4">
        <div className="text-3xl sm:text-4xl font-bold text-white pb-4">
          Darwin Chat
        </div>

        <div className="flex flex-col w-full gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 sm:p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 sm:p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
          />

          <button
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <Link to="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

