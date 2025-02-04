import React from 'react';
import { NavLink } from 'react-router-dom';
import signup from '../Pages/Signup.jsx'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="text-gray-300 block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-300 block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-gray-400 text-sm text-center mt-3">
          <NavLink to="/forgot-password" className="text-blue-400 hover:underline">
            Forgot Password?
          </NavLink>
        </p>

        <p className="text-gray-400 text-sm text-center mt-2">
          Don't have an account? 
          <NavLink to="/signup" className="text-blue-400 hover:underline"> Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
