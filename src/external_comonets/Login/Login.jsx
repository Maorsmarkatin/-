import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("users/login")
      .then((res) => {
        setusers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userExists = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
      const isAdmin = userExists.role === "admin";
      alert(isAdmin ? "התחברת בהצלחה כמנהל!" : "התחברת בהצלחה כעובד!");
      onLogin(userExists.role, userExists.name); // העבר את סוג המשתמש
      navigate("/Home"); //לדעוג לנווט לעובד
    } else {
      alert("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <div className={classes.loginContainer}>
      <h1 className={classes.title}>ברוכים הבאים למערכת</h1>
      <form onSubmit={handleSubmit} className={classes.loginForm}>
        <div className={classes.formGroup}>
          <label htmlFor="email">אימייל:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={classes.loginButton}>
          התחבר
        </button>

        <div className={classes.demoUsers}>
          <h3>משתמשים לדוגמה:</h3>
          {users.map((user, index) => (
            <div key={index} className={classes.userCredentials}>
              <div>אימייל: {user.email}</div>
              <div>סיסמה: {user.password}</div>
              <div>תפקיד: {user.role === "admin" ? "מנהל" : "עובד"}</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
