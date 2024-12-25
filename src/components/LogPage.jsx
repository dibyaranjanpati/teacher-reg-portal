import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!userId.trim()) newErrors.userId = "User ID is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      userId,
      password,
    };

    try {
      const response = await axios.post(
        "https://thinkzone.in.net/erp/authUser",
        data
      );

      if (
        response.data &&
        response.data.resData &&
        response.data.resData.length > 0
      ) {
        // Accessing the userName
        const userName = response.data.resData[0].userName; // Accessing the userName
        alert(`Login successful! Welcome, ${userName}`);

        // Store the username in localStorage
        localStorage.setItem("username", userName);

        // Navigate to the home page
        navigate("/");
      } else {
        alert(
          response.data?.msg || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 h-screen w-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="mt-6" onSubmit={handleLogin}>
          {/* User ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              User ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your User ID"
            />
            {errors.userId && (
              <p className="mt-1 text-xs text-red-500">{errors.userId}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        {/* register  Link  */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Do not have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogPage;
