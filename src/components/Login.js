import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLogin, startLoginGoogle } from '../actions/auth';
import { startLoadChannel } from '../actions/channel';
import { fetchSinToken } from '../helpers/fetch';
import { useForm } from "../hooks/useForm";
import { useSearchParams } from "react-router-dom";
import {store} from '../store/store.js';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../hooks/userContext';
import Swal from 'sweetalert2';
import { Spin } from 'antd';



export const Login = () => {
  let [user, setUser] = useState(store.getState().info.name);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setPermitir, cambiaTema } = useContext(userContext);
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const [loginData, handleLoginData] = useForm({
    email: "",
    password: "",
  });

  useEffect(async() => {
    if(localStorage.getItem('tema') === "oscuro"){
      document.body.style.backgroundColor = "rgb(37,35,41)";
      document.body.style.color = "#e0e0e0";
      document.querySelector(".titulo").style.color = "#ffffff";
    }
    setSearchParams(window.location.href);
    if(searchParams.get('code') !== null){
      setLoading(true);
      let codigo = searchParams.get('code');
      let tipo = localStorage.getItem('type');
      let respuesta = undefined
      if(localStorage.getItem('auth') === "google"){
        respuesta = await fetchSinToken('auth/google-confirm', {'code':codigo, type: tipo}, 'POST');
      }else{
        respuesta = await fetchSinToken(`auth/github/callback?code=${codigo}&type=${tipo}`);
      }
      let salida= await respuesta.json();
      let body = salida.resp;
      if(body.token){
        dispatch( startLoginGoogle( body.user, body.uid, body.token) )
        //dispatch(startLoadChannel())
        setPermitir(true);
        setLoading(false);
        navigate('/profile');
      }else {
        setLoading(false);
        Swal.fire('Error', body.msg || body, 'error');
    }
    }
  }, []);

    

  store.subscribe(() => {
      setUser({
        user: store.getState().user
      });
    });
 
  

  
  
  const { lEmail, lPassword } = loginData;
  
  
  const handleLogin=(e)=>{
    e.preventDefault();
    //dispatch(startLoadChannel())
    dispatch(startLogin( lEmail, lPassword )).then((resp)=>{
      if(resp && resp.payload.token){
        dispatch( startLoadChannel())
        setPermitir(true);
        navigate('/profile');
      }
    });
    
    
  }

  const loginGoogle=async()=>{
    let resp = await fetchSinToken('auth/url-google');
    const body = await resp.json();
    localStorage.setItem('type', "login");
    localStorage.setItem('auth', "google");
    window.location.href =body.url;
  }

  const loginGithub=()=>{
    localStorage.setItem('type', "login");
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
          className="dev"
        ></img>
        <b className='titulo'>Login</b>
        <form onSubmit={ handleLogin }>
          <input
            type="text"
            placeholder="Email"
            className="inp-log email"
            name="lEmail"
            value={lEmail}
            onChange={handleLoginData}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="inp-log password"
            name="lPassword"
            value={lPassword}
            onChange={handleLoginData}
          ></input>
          <button className="enter">Login</button>
        </form>
        <p className="grey">or continue with these social profile</p>
        <div className="apps">
          <img onClick={loginGoogle}
            src="https://raw.githubusercontent.com/gabgg71/authentication-app/3897732eb8c9560fc203f2586355c311a46623f6/public/Google.svg"
            alt="google"
          ></img>
          {loading && <Spin className="spin" size="large"/>}
          <img onClick={loginGithub}
            src="https://raw.githubusercontent.com/gabgg71/authentication-app/3897732eb8c9560fc203f2586355c311a46623f6/public/Gihub.svg"
            alt="github"
          ></img>
        </div>
        <p className="grey">
          Dont you have an account yet? <a href="/register">Register</a>
        </p>
      </div>
      
      <div className="credits">
        <p className="grey">created by Gabriela Galindo</p>
        <p className="grey">devChallengues.io</p>
      </div>
    </div>
  );
};

