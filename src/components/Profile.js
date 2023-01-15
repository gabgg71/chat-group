import React, { useState } from 'react';
import { Header } from "./Header";
import {store} from '../store/store.js';
import { useNavigate } from 'react-router-dom';

export const Profile=()=>{
    const navigate = useNavigate();
    let [user, _] = useState(store.getState().info);
    let imagen = undefined
    if(user.img !== ""){
        imagen = user.img;
    }


    
    return (
        <>
        <div className="App">
        <Header/>
          <div className='info'>
            <h1>Personal info</h1>
            <h2>Basic info, like your name and photo</h2> 
            <div className="empieza">
                <div>
                    <b>Profile</b>
                    <p className='grey'>Some info may be visible to other people</p>
                </div>
                <button className = "edit" onClick={()=>{navigate('/edit');}}>Edit</button>
            </div>
            <div className="general">
                <p className="key">PHOTO</p>
                <img src={(user.img !== "" && user.img) || process.env.REACT_APP_PREDEFINED} alt="me" className="photo"></img>
            </div>
            <div className="general">
                    <p className="key">NAME</p>
                <p className="text-info">{user.name}</p>
            </div>
            <div className="general">
                    <p className="key">BIO</p>
                <p className="text-info">{user.bio}</p>
            </div>
            <div className="general">
                    <p className="key" >PHONE</p>
                <p className="text-info">{user.phone}</p>
            </div>
            <div className="general">
                    <p className="key">EMAIL</p>
                <p className="text-info">{user.email}</p>
            </div>
            <div className="general end">
                    <p className="key">PASSWORD</p>
                <p className="text-info">*********************</p>
            </div>
           </div>
        </div>
        <div className='data'>
            <p className='grey'>created by Gabriela Galindo</p>
            <p className='grey'>devChallengues.io</p>
          </div>
        </>
      );
}