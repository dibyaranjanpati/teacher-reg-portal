import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Get the username from localStorage if available
  const username = localStorage.getItem("username");

  // Function to handle logout event
  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear the user data from localStorage
    alert("You have logged out successfully!");
    navigate("/register"); // Redirect to register page after logout
  };

  return (
    <>
      <div className="flex items-center justify-center  bg-gray-100 h-screen w-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Welcome {username ? username : "User"}!
          </h2>
          <div className="mt-4 text-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
