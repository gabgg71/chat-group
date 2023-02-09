import React, {useContext, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { startRegister } from '../actions/auth';
import { useForm } from "../hooks/useForm";
import { userContext } from '../hooks/userContext';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { fetchSinToken } from '../helpers/fetch';
import { Spin } from 'antd';


export const Register = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [registerData, handleRegisterData] = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setPermitir, cambiaTema } = useContext(userContext);
  const dispatch= useDispatch();
  const navigate = useNavigate();

  const { rEmail, rPassword } = registerData;

  useEffect(async() => {
    if(localStorage.getItem('tema') === "oscuro"){
      document.body.style.backgroundColor = "rgb(37,35,41)";
      document.body.style.color = "#e0e0e0";
      document.querySelector(".titulo").style.color = "#ffffff";
    }
    setSearchParams(window.location.href);
    if(searchParams.get('code') !== null){
      let codigo = searchParams.get('code');
      let tipo = localStorage.getItem('type');
      let auth = localStorage.getItem('auth');
      let respuesta = undefined
      let salida = undefined
      if(auth === "google"){
        await fetchSinToken('auth/google-confirm', {'code':codigo, type: "register"}, 'POST');
      }else{
        respuesta = await fetchSinToken(`auth/github/callback?code=${codigo}&type=${tipo}`);
        salida= await respuesta.json();
      }
      
    }
  }, []);




  const handleRegister=(e)=>{
    e.preventDefault();
    dispatch(startRegister( rEmail, rPassword ) ).then((resp)=>{
      if(resp && resp.payload.token){
        setPermitir(true);
        navigate('/profile');
      }
    });
  }

  const registerGoogle=async()=>{
    let resp = await fetchSinToken('auth/url-google');
    const body = await resp.json();
    localStorage.setItem('type', "register");
    localStorage.setItem('auth', "google");
    window.location.href =body.url;
  }

  const registerGithub=()=>{
    localStorage.setItem('type', "register");
    localStorage.setItem('auth', "github");
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID_GIT}`
  }
  
  return (
    <div className="App">
      <button className='theme' onClick={cambiaTema}><span class="material-icons">
      highlight
      </span></button>
      <div className="main-box">
        <img
          src="https://raw.githubusercontent.com/gabgg71/authentication-app/3897732eb8c9560fc203f2586355c311a46623f6/public/devchallenges.svg"
          className="dev" alt='alt'
        ></img>
        <b className="join titulo">Join thousands of learners from around the world</b>
        <p>
          Master web development by making real-life projects,There are multiple
          paths for you to choose{" "}
        </p>
        <form>
        <input
            type="text"
            placeholder="Email"
            className="inp-log email"
            name="rEmail"
            value={rEmail}
            onChange={handleRegisterData}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="inp-log password"
            name="rPassword"
            value={rPassword}
            onChange={handleRegisterData}
          ></input>
          <button className="enter" onClick={handleRegister}>Start coding now</button>
        </form>
        <p className="grey">or continue with these social profile</p>
        <div className="apps">
          <img onClick={registerGoogle}
            src="https://raw.githubusercontent.com/gabgg71/authentication-app/3897732eb8c9560fc203f2586355c311a46623f6/public/Google.svg"
            alt="google"
          ></img>
          {loading && <Spin className="spin" size="large"/>}
          <img onClick={registerGithub}
            src="https://raw.githubusercontent.com/gabgg71/authentication-app/3897732eb8c9560fc203f2586355c311a46623f6/public/Gihub.svg"
            alt="github"
          ></img>
        </div>
        <p className="grey">
          Already a member? <button className='underl' onClick={()=>{navigate("/")}}>Login</button>
        </p>
      </div>
      <div className="credits">
        <p className="grey">created by Gabriela Galindo</p>
        <p className="grey">devChallengues.io</p>
      </div>
    </div>
  );
};
