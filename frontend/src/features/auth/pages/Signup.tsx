import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex flex-col items-center w-96 p-10 bg-gray-800 rounded-xl shadow-2xl gap-2">
        <div className="text-4xl font-bold text-white pb-6">
          Darwin Chat
        </div>

        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="p-4 border-2 border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
          />

          <button
            className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>

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


