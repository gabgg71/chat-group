import React, {useState, useContext, useEffect} from 'react';
import {store} from '../store/store.js';
import { useNavigate } from 'react-router-dom';
import { NewChannel } from './NewChannel';
import { Channels } from './Channels';
import { userContext } from '../hooks/userContext';

export const Chat = () => {
    let [channels, setChannels] = useState(store.getState().channel);
    let [focusCh, setFocus] = useState({
        "name": "WELCOME",
        "messages": []});
    
    
    let [user, _] = useState(store.getState().info);
    const {socket} = useContext(userContext);
    const {cambiaTema } = useContext(userContext);
    let [newCanal, setNew] = useState(true);
    
    let escribir = document.querySelector(".write");

    useEffect(() => {
        escribir = document.querySelector(".write");
        setFocus(channels.filter(channel => channel.name === "WELCOME"));
    }, []);

    const enviarMensaje=(channel)=>{
        if(escribir.value.lenght >0){
            socket.emit(
                'send_message',
                {channel: `channel${channel}`, msg:escribir.value, user:{name: user.name, img: user.img}},
              );
            escribir.value = "";
        }
    }
    

    

    return (
        <>
        {true && <p>Hola</p>}
        <button className='theme' onClick={cambiaTema}><span class="material-icons">
        highlight
        </span></button>
        <div className="chat2">
            <Channels setNew={setNew} setFocus={setFocus}/>

        <div className="chat">
            <p className='name'>{focusCh.name}</p>
            <div className='conversacion'>
                {(focusCh.messages)?(focusCh.messages.map((mensaje, index)=>{
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
                })):(null)}
                
            </div>
            <div className='enviar'>
            <div className='position'>
            <input className='write' placeholder='Type a message here'></input>
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