import React, {useState, useContext, useEffect} from 'react';
import {store} from '../store/store.js';
//import { NewChannel } from './NewChannel';
import { Channels } from './Channels';
import { userContext } from '../hooks/userContext';
import { useDispatch } from 'react-redux';

import { loadMsg } from '../actions/channel';

export const Chat = () => {
    let [focusCh, setFocus] = useState({
        "name": "WELCOME",
        "messages": []});
    let [user, _] = useState(store.getState().info);
    const {socket} = useContext(userContext);
    const {cambiaTema } = useContext(userContext);
    const dispatch = useDispatch();
    
    let escribir = document.querySelector(".write");


    useEffect(() => {
        escribir = document.querySelector(".write");
        
    }, []);

    const enviarMensaje=async()=>{
        if(escribir.value.length >0){
           /* socket.emit(
                'send_message',
                {channel: `channel${channel}`, msg:escribir.value, user:{name: user.name, img: user.img}},
              );*/
            let msg = {
            user: {name: user.name, img: user.img},
            content: escribir.value,
            date: new Date()
            }
            dispatch(loadMsg(focusCh._id, msg));
            escribir.value = "";
        }
    }

    

 

    

    

    return (
        <>
        <button className='theme' onClick={cambiaTema}><span class="material-icons">
        highlight
        </span></button>
        <div className="chat2">
            <Channels setFocus={setFocus}/>

        <div className="chat">
            <p className='name'>{focusCh.name}</p>
            <div className='conversacion'>
                {(focusCh.messages)?(focusCh.messages.map((mensaje, index)=>{
                    console.log(`aqui un msg ${JSON.stringify(mensaje)}`)
                    return(
                        <div className='canal' key={index}>
                            <img src={mensaje[0].user.img} className='show'></img>
                            <div className='msg'>
                                <div className='canal'>
                                    <p className='user'>{mensaje[0].user.name}</p>
                                    <p className='time'>{mensaje[0].date.substring(0, 10)} {mensaje[0].date.substring(11, 19)}</p>
                                </div>
                                <p className='complete'>{mensaje[0].content}</p>
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