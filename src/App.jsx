import {} from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import LogPage from "./components/LogPage";
import NewRegPage from "./components/NewRegPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LogPage />} />
        <Route path="/register" element={<NewRegPage />} />
        {/* // for protect the home page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
