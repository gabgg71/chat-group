import React, { useState, useContext, useEffect } from 'react';
import {store} from '../store/store.js';
import { useNavigate } from 'react-router-dom';
import { NewChannel } from './NewChannel';
import { userContext } from '../hooks/userContext';

export const Chat = () => {
    const navigate = useNavigate();
    let [user, _] = useState(store.getState().info);
    //let [channels, setChannels] = useState(store.getState().channel);
    const [open, setOpen] = useState(false);
    const [vent, setVent] = useState(true);
    const {cambiaTema } = useContext(userContext);
    let [canales, setCanales] = useState(["maravilla", "diseno", "sjkdbfsdegbvd gfdjhf"])
    let originalC = ["maravilla", "diseno", "sjkdbfsdegbvd gfdjhf"]
    let mensajes = ["maravilla", "diseno", "sjkdbfsdegbvd gfdjhf"]


    const busca=(e)=>{
        setCanales(originalC.filter((canal)=>{
            return canal.includes(e.target.value)
        }))
    }

    return (
        <>
        
        <button className='theme' onClick={cambiaTema}><span class="material-icons">
        highlight
        </span></button>
        <div className="chat2">
        <div className="channels">
            <div className="canal">
                <p>Channels</p>
                <button className="create mas" onClick={()=>{setVent(true)}}>
                <span class="material-icons">
                add
                </span>
                </button>
            </div>
            <input className="buscar" placeholder="Search" onChange={busca}></input>
            <div className="nombre-c">
                {canales.map((canal, index)=>{
                    return(
                        <div className="canal" key={index}>
                            <div className="short">
                                <p>SS</p>
                            </div>
                            <p>{canal}</p>
                        </div>
                    )
                })}
            </div>

        </div>
        
        <NewChannel setVent={setVent} />
        {open && (
          <div className="options2">
            <button className="inline" onClick={()=>{navigate("/profile", {replace:true})}}>
            <span class="material-icons">account_circle</span>
            <p>
              My profile
            </p>
            </button>
            <button className="inline">
            <span class="material-icons material-symbols-outlined">
            landscape
            </span>
            <p>
              Tweeter
            </p>
            </button>
            <p className='line'>________________</p>
            <button className="inline red" onClick={()=>{window.location.href = "/";}}>
            <span class="material-icons">logout</span>
            <p>
              Logout
            </p>
            </button>
          </div>
        )}
            <div className='down'>
                    <img src={user.img} className='show'></img>
                    <p>{user.name}</p>
                    <button className='create' onClick={()=>{setOpen(!open)}}>
                        <span class="material-icons material-symbols-outlined">
arrow_drop_down
</span></button>

            </div>
        <div className="chat">
            <p className='name'>frolgnfdhb hjsdkfksdb</p>
            <div className='conversacion'>
                {mensajes.map((mensaje, index)=>{
                    return(
                        <div className='canal' key={index}>
                            <img src={user.img} className='show'></img>
                            <div className='msg'>
                                <div className='canal'>
                                    <p className='user'>{user.name}</p>
                                    <p className='time'>Today 12:00</p>
                                </div>
                                <p className='complete'>{mensaje}</p>
                            </div>
                        </div>
                    )
                })}
                
            </div>
            <div className='enviar'>
            <div className='position'>
            <input className='write' placeholder='Type a message here'></input>
            <button className='btn-enviar'>
            <span class="material-icons material-symbols-outlined">
send
</span>
            </button>
            </div>
            </div>


        </div>
        </div>
        
        </>
    );
}