import { AppRouter } from "./router/AppRouter";

import React, { useEffect, useState} from 'react'
import { userContext } from "./hooks/userContext";
import { currentContext } from "./hooks/currentContext";
import io from 'socket.io-client';
import { loadMsg } from './actions/channel';
import {store} from './store/store.js';
import { useDispatch } from 'react-redux';



function App() {
  const [socket, setSocket] = useState(null);
  const [focusCh, setFocus] = useState({});
  let [permitir, setPermitir]= useState(false)
  let [channels, setChannels] = useState(store.getState().channel);
  let [escuchando, setEscucho] = useState([]);
  const dispatch = useDispatch();

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

  useEffect(async() => {
    const un = store.subscribe(() => {
      setChannels({
        channels: store.getState().channel
      });
    });
      const socket = io("http://localhost:4000",{
      cors: { origin: '*' },
      "transports": ["websocket"],
      "autoConnect": false,
      });

      setSocket(socket);
      

        socket.connect(); 

        socket.on('connect', () =>{
          console.log('Me conecte');
        });

        socket.on('message', (data) => {
          let msg = JSON.parse(JSON.stringify(data));
          let estoy = document.querySelector(".name");
          let channel_id = msg.channel_id;
          let canales = store.getState().channel;
          let canal = canales.filter(channel => {
              if(channel._id === channel_id){
                  return channel;
              }})[0]
          if(canal){
              let quedaria = {...canal, 
              messages : [...canal.messages, msg.msg]}
              if(estoy.innerHTML === canal.name){
                setFocus(quedaria)
              }
            dispatch(loadMsg(canal._id, msg.msg));
          }

      });
    

        socket.on('disconnect', () =>{
          console.log('Me desconecto');
        });
        
        return () => {
          un();
          socket.disconnect();
        };
  }, []);

  return (
    <currentContext.Provider value={{focusCh, setFocus, escuchando, setEscucho }}>
    <userContext.Provider value={{ socket, permitir, setPermitir, cambiaTema}}>
      <AppRouter/>
    </userContext.Provider>
    </currentContext.Provider>
  )
}

export default App;
