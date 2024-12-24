import {} from "react";
import "./App.css";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/LogIn";
import LogPage from "./components/LogPage";

function App() {
  return (
    <>
      <LogPage />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home" element={<Login />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
