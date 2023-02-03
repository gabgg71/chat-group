import React, {useState, useContext, useEffect, useRef} from 'react';
import {store} from '../store/store.js';
//import { NewChannel } from './NewChannel';
import { Channels } from './Channels';
import { userContext } from '../hooks/userContext';
import { currentContext } from '../hooks/currentContext';
import { useDispatch } from 'react-redux';

import { loadMsg } from '../actions/channel';
import { Members } from './Members.js';

export const Chat = () => {
    
    let [user, _] = useState(store.getState().info);
    const {socket,cambiaTema} = useContext(userContext);
    let [member, setMember] = useState(false);
    const [abrirCh, setAbrirCh] = useState(window.screen.width > 600);
    const {focusCh, setFocus} = useContext(currentContext);
    const dispatch = useDispatch();
    let escribir = document.querySelector(".write");
    let conversation =  useRef(null);


    useEffect(() => {
             escribir = document.querySelector(".write");
             if(window.screen.width < 600){
                setAbrirCh(false);
            }         
    }, []);

   
   

    const enviarMensaje=async()=>{
        if(escribir.value.length >0 && focusCh.name){
            let msg = {
                user: {name: user.name, img: user.img},
                content: escribir.value,
                date: new Date().toISOString()
            }
            setFocus({...focusCh, 
                messages : [...focusCh.messages, msg]})
            socket.emit(
                    'send_message',
                    {channel: focusCh._id, msg}
                );
            dispatch(loadMsg(focusCh._id, msg))
            escribir.value = "";
        }
    }

    



    

    

 

    

    

    return (
        <>
        <button className='theme2' onClick={cambiaTema}><span class="material-icons">
        highlight
        </span></button>
        <button className='hamb' onClick={()=>{
            setAbrirCh(true);
        }}><span class="material-icons">
        menu
        </span></button>
        {abrirCh && 
        <button className='exit' onClick={()=>{setAbrirCh(false)}}><span class="material-icons">
        close
        </span></button>}
        <div className="chat2">
            {abrirCh && member && <Members channel={member} setMember={setMember}/>}
            {abrirCh && !member && <Channels setMember={setMember}/>}
            
        <div className="chat">
        
            <p className='name'>{focusCh.name}</p>
            <div className='conversacion' ref={conversation}>
                {(focusCh.messages)?(focusCh.messages.map((mensaje, index)=>{
                    return(
                        <div className='canal' key={index}>
                            <img src={(mensaje[0])?(mensaje[0].user.img):(mensaje.user.img)} className='show'></img>
                            <div className='msg'>
                                <div className='canal'>
                                    <p className='user'>{(mensaje[0])?(mensaje[0].user.name):(mensaje.user.name)}</p>
                                    <p className='time'>{(mensaje[0])?(`${mensaje[0].date.substring(0, 10)} ${mensaje[0].date.substring(11, 19)}`):(`${mensaje.date.substring(0, 10)} ${mensaje.date.substring(11, 19)}`)}</p>
                                </div>
                                <p className='complete'>{(mensaje[0])?(mensaje[0].content):(mensaje.content)}</p>
                            </div>
                        </div>
                    )
                })):(null)}
                
            </div>
            <div className='enviar'>
            <div className='position'>
            <input className='write' placeholder='Type a message here' onKeyUp={(e)=>{
        if(e.keyCode === 13){
            enviarMensaje();
        }
    }}></input>
            <button className='btn-enviar' onClick={
                enviarMensaje}>
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