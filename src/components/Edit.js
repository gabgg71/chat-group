import React, { useState } from 'react';
import { Header } from "./Header";
import { useDispatch } from 'react-redux';
import { useForm } from "../hooks/useForm";
import {store} from '../store/store.js';
import { setInfo} from '../actions/info';
import { useNavigate } from 'react-router-dom';
import { fetchSinToken } from '../helpers/fetch';
import { Spin } from 'antd';
import Swal from 'sweetalert2';

export const Edit=()=>{
    let [user, setUser] = useState(store.getState().info);
    const [imageUrl, setImageUrl] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [userData, handleData] = useForm({
        ...user,
        password: undefined, 
        confirmation_pass: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {name, bio, phone, email,  password, confirmation_pass} = userData;

    store.subscribe(() => {
    setUser(
        store.getState().info
    );
    });

    const openFile =()=>{
        const inputFile = document.querySelector('.invisible');
        inputFile.click();
    }

    const hazlo=async(datica)=>{
        setLoading(true);
        if(imageUrl){
            let url = await subirImagen();
            userData.img = url;
            datica.img = url;
        }
        dispatch( setInfo (datica)).then((resp)=>{
            setImageUrl(null);
            setLoading(false);
            setSuccess(true);
            
        });

    }

    const saveInfo=async()=>{
        if(password === "" || password === undefined){
            userData.confirmation_pass = undefined;
            await hazlo(userData);
            return ;
        }
        //case user want to stablish password but he/she was register with google
        if(password !== "" && user.password === undefined){
            userData.confirmation_pass = undefined;
            await hazlo(userData);
            return ;
        }
        if(!confirm){
            setConfirm(true);
            return ;
        }
        if(confirm && confirmation_pass !== ""){
            //validamos 
            let respuesta = await fetchSinToken('edit/validation', {'email':user.email, password: confirmation_pass}, 'PUT');
            let resp = await respuesta.json();
            if(resp.correct){
                await hazlo(userData);
                setConfirm(false);
            }else{
                Swal.fire('Error', "Incorrect password", 'error');
            }
    }}

    //cambio de imagen     
    const load =async(e)=>{
        let image = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
        setImageUrl(reader.result);
        };
        reader.readAsDataURL(image);
    }

    const subirImagen =async()=>{
        const formData = new FormData();
        formData.append('file', imageUrl);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
        try {
            const res = await fetch( process.env.REACT_APP_CLOUDINARY_URL, {
                method: "POST",
                body: formData
            });
            const resp = await res.json();
            return resp.secure_url;
        } catch (err) {
            console.error(`error ${err}`);
        }
    }

    return (
        <>
        <div className="App">
        <Header/>
        <button onClick={()=>{navigate('/profile', { replace: true });}} className="back">BACK</button>
        <div className="info-box">
            <b>Change Info</b>
            <p>Changes will be reflected to every service</p>
            <div className="inline">
                <div className="editImage">
                <div className="photoI">
                 <img src={imageUrl || user.img || process.env.REACT_APP_PREDEFINED} className="photo"></img>
                </div>
                </div>
                <input className="invisible inp-edit" type="file" onChange={load}></input> 
                <a className="change" onClick={openFile}>CHANGE PHOTO</a>
            </div>
            <p>Name</p>
            <input type="text" className='inp-edit' placeholder="Enter your name" name="name"
            value={name} onChange={handleData}></input>
            <p>Bio</p>
            <textarea id="w3review" rows="6"  onChange={handleData} placeholder="Enter your bio" className="bio inp-edit" name="bio"  value={bio}>
</textarea>
            <p>Phone</p>
            <input type="text" className='inp-edit' placeholder="Enter your phone" name="phone"
            value={phone} onChange={handleData}></input>
            <p>Email</p>
            {user.email &&
            <input type="text" disabled className='inp-edit' placeholder="Enter your email" name="email"
            value={email}></input> }

            {!user.email &&
            <input type="text" className='inp-edit' placeholder="Enter your email" name="email"
            value={email} onChange={handleData}></input> }
            
            <p>Password</p>
            <input type="password" className='inp-edit' placeholder="New password" name="password" 
            value={password} onChange={handleData}></input>
            {confirm &&
            <>
                <p>When you want to change your password, you must confirm the current one.</p>
                <input type="password" className='inp-edit' placeholder="Current password"
                name='confirmation_pass' value={confirmation_pass} onChange={handleData}></input>
            </>}
            {loading && <Spin className="spin" size="large"/>}
            {success &&
            <div className='success'>
            <p>El cambio ha sido exitoso</p>
          </div>}
            <button className="enter save" onClick={saveInfo}>Save</button>
   
        </div>
        <div className='credits'>
            <p className='grey'>created by Gabriela Galindo</p>
            <p className='grey'>devChallengues.io</p>
          </div>
          
         </div>
           
        </>
      );
}