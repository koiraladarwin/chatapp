
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const mutation = useLogin();

  const handleSubmit = () => {
    mutation.mutate({ email, password }, {
      onSuccess: () => {
        navigate('/chat');
      },
      onError: (error) => {
        console.error('Login error', error);
      }
    });
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

        {/* Right Side Login Form */}
        <div className="flex flex-1 flex-col justify-center p-8 sm:p-12 md:p-16">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-indigo-400 md:hidden mb-2">
                Darwin Chat
              </h1>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Login to your Account
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Chat securely and privately with your friends
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember / Forgot Password */}
              <div className="flex justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 text-indigo-500 bg-gray-800 border-gray-600" />
                  Remember Me
                </label>
                <Link to="#" className="text-indigo-400 hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Logging in...' : 'Log In'}
              </button>

              {/* Error Message */}
              {mutation.isError && (
                <p className="text-red-500 text-sm text-center mt-2">
                  {mutation.error?.message || 'Login failed'}
                </p>
              )}
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-gray-400 text-sm font-semibold">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-400 hover:underline">
                Sign Up
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

