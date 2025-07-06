import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        if (window.location.pathname === "/login") {
          navigate("/");
        }
      } else {
        console.log("Logged Out");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/player/:id' element={<Player />}></Route>
      </Routes>
    </div>
  );
};

export default App;
