import axios from "axios";
import React, { useState } from "react";

const LogPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://thinkzone.in.net/erp/authUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Setting the content type to JSON
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
      });

      // If response is not okay, throw an error
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json(); // Parse the response to JSON

      console.log(data); // Log response to inspect it

      // Check for the success status and the presence of resData
      if (
        data.status === "success" &&
        data.resData &&
        data.resData.length > 0
      ) {
        console.log("Login successful");
        // Perform further actions like redirecting to home page
      } else {
        setError("Invalid credentials or unauthorized access");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };
  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>

      <p style={styles.footer}>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  error: {
    color: "red",
  },
  footer: {
    marginTop: "20px",
  },
};

export default LogPage;
