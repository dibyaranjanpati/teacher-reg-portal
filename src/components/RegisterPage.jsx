import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call the createUser API
      const createUserResponse = await fetch(
        "https://thinkzone.in.net/erp/createUser",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
            address,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log();

      const createUserData = await createUserResponse.json();

      if (createUserResponse.ok) {
        if (createUserData.success) {
          // Call the authUser API
          const authUserResponse = await axios.post(
            "https://thinkzone.in.net/erp/authUser",
            {
              email,
              password,
            }
          );

          if (authUserResponse.data.success) {
            // Navigate to the Home page with the user's name
            navigate("/home", { state: { userName: name } });
          } else {
            alert("Authentication failed.");
          }
        } else {
          // Handle duplicate email error
          if (
            createUserData.error &&
            createUserData.error.includes("duplicate key")
          ) {
            alert(
              "The email address is already taken. Please choose a different one."
            );
          } else {
            alert("User creation failed.");
          }
        }
      } else {
        alert("An error occurred while creating the user.");
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>
      <form>
        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>
      </form>
      <button style={styles.button} onClick={handleLogIn}>
        Log In
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    margin: "10",
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default RegisterPage;

// if (createUserResponse.data.success) {
//     // Call the authUser API
//     const authUserResponse = await axios.post(
//       "https://thinkzone.in.net/erp/authUser",
//       {
//         email,
//         password,
//       }
//     );

//     if (createUserResponse.data.success) {
//       // Navigate to the Home page with the user's name
//       navigate("/home", { state: { userName: name } });
//     } else {
//       alert("Authentication failed.");
//     }
//   } else {
//     alert("User creation failed.");
//   }
// } catch (error) {
//   console.error(error);
//   alert("Something went wrong. Please try again.");
// }
// };
