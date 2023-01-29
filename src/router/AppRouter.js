import React, {useState, useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "../components/Profile";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Edit } from "../components/Edit";
import {store} from '../store/store.js';
import { userContext } from "../hooks/userContext";
import { Chat } from "../components/Chat";

export const AppRouter = () => {
  const { permitir } = useContext(userContext);
  
 
  
  return (
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
  );

};
