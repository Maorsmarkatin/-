import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./MainPage";
import Inventory from "./Inventory";
import Header from "./Header";
import Footer from "./Footer";
import SinglePost from "./SinglePost";
import Main from "./Main";
import Order from "./Order";
import OrderView from "./OrderView";
import OrdersPage from "./OrdersPage";
import Task from "./Task";
import LoginPage from "./login";
import EmployeePage from "./EmployeePage"; // הוסף ייבוא
import Shifts from "./Shifts"; // הוסף ייבוא
import AddShift from "./AddShift"; // הוסף ייבוא

function MyRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // "admin" or "employee"
  const [username, setUsername] = useState("");

  // דוגמה: קבלת תפקיד מה־login
  const handleLogin = (role, username) => {
    setIsAuthenticated(true);
    setUsername(username);
    setUserRole(role); // role יכול להיות "admin" או "employee"
  };

  return (
    <div className="App">
      <div className="sidebar">
        {isAuthenticated && <Header userRole={userRole} username={username} />}
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/Home"
            element={
              isAuthenticated && userRole === "admin" ? (
                <MainPage username={username} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/Inventory"
            element={
              isAuthenticated &&
              (userRole === "admin" || userRole === "employe") ? (
                <Inventory />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/Order"
            element={
              isAuthenticated && userRole === "admin" ? (
                <Order />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/order/:id"
            element={
              isAuthenticated && userRole === "admin" ? (
                <OrderView />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated && userRole === "admin" ? (
                <OrdersPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/tasks"
            element={
              isAuthenticated &&
              (userRole === "admin" || userRole === "employe") ? (
                <Task />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/employee"
            element={
              isAuthenticated && userRole === "employe" ? (
                <EmployeePage username={username} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/shifts"
            element={
              isAuthenticated && userRole === "admin" ? (
                <Shifts />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/add-shift"
            element={
              isAuthenticated && userRole === "admin" ? (
                <AddShift />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default MyRoutes;
