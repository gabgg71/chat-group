import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "../components/Profile";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Edit } from "../components/Edit";
import {store} from '../store/store.js';
import { userContext } from "../hooks/userContext";
import { Chat } from "../components/Chat";

export const AppRouter = () => {
  let [permitir, setPermitir]= useState(false)
  const cambiaTema=()=>{
    if(getComputedStyle(document.body).backgroundColor.toString() === "rgb(37, 35, 41)"){
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "grey";
      localStorage.setItem('tema', "claro");
      if(window.location.pathname !== "/profile" && window.location.pathname !== "/edit"){
        document.querySelector(".titulo").style.color = "black";
      }
      
    }else{
      document.body.style.backgroundColor = "rgb(37,35,41)";
      document.body.style.color = "#e0e0e0";
      localStorage.setItem('tema', "oscuro");
      if(window.location.pathname !== "/profile" && window.location.pathname !== "/edit"){
        document.querySelector(".titulo").style.color = "#ffffff";
      }
     
    }
  }
  
  return (
    <userContext.Provider value={{ permitir, setPermitir, cambiaTema }}>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={(permitir ? <Profile/> : <Login />)} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}>
          <Route path="*" element={<Register />} />
        </Route>
          <Route exact path="/profile" element={(permitir ? <Profile /> : <Login />)} />
          <Route exact path="/edit" element={(permitir ? <Edit /> : <Login />)} />
          <Route exact path="/chat" element={(permitir ? <Chat /> : <Login />)} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
    </userContext.Provider>
  );
};
