import { AppRouter } from "./router/AppRouter";

import React, { useEffect, useState } from 'react'
import { userContext } from "./hooks/userContext";
import { currentContext } from "./hooks/currentContext";
import io from 'socket.io-client';
import { loadMsg, startNewMember } from './actions/channel';
import { store } from './store/store.js';
import { useDispatch } from 'react-redux';



function App() {
  const [socket, setSocket] = useState(null);
  const [iniSoc, setIniS] = useState();
  const [focusCh, setFocus] = useState({});
  let [permitir, setPermitir] = useState(false)
  let [channels, setChannels] = useState(store.getState().channel);
  let [escuchando, setEscucho] = useState([]);
  const dispatch = useDispatch();

  const cambiaTema = () => {
    if (getComputedStyle(document.body).backgroundColor.toString() === "rgb(37, 35, 41)") {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "grey";
      localStorage.setItem('tema', "claro");
      if (window.location.pathname !== "/profile" && window.location.pathname !== "/edit") {
        if(window.location.pathname === "/chat"){
          document.querySelector(".write").style.color = "#ffffff";
        }
        document.querySelector(".titulo").style.color = "black";
      }

    } else {
      document.body.style.backgroundColor = "rgb(37,35,41)";
      document.body.style.color = "#e0e0e0";
      localStorage.setItem('tema', "oscuro");
      if (window.location.pathname !== "/profile" && window.location.pathname !== "/edit") {
        document.querySelector(".titulo").style.color = "#ffffff";
        if(window.location.pathname === "/chat"){
          document.querySelector(".write").style.color = "#3c393f";
        }
      }

    }
  }

  const conectarse=()=>{
    const socket = io("https://group-chat-backend.glitch.me/", {
      cors: { origin: '*' }
    });

    setSocket(socket);
    socket.connect();

    socket.on('connect', () => {
      console.log('Me conecte');
    });

    socket.on('message', (data) => {
      let msg = JSON.parse(JSON.stringify(data));
      let estoy = document.querySelector(".name") || { innerHTML: "" };
      let channel_id = msg.channel_id;
      let canales = store.getState().channel;
      let canal = canales.filter(channel => {
        if (channel._id === channel_id) {
          return channel;
        }
      })[0]
      if (canal) {
        let quedaria = {
          ...canal,
          messages: [...canal.messages, msg.msg]
        }
        if (estoy.innerHTML === canal.name) {
          setFocus(quedaria)
        }
        dispatch(loadMsg(canal._id, msg.msg));
      }

    });

    socket.on('new_member', (datos) => {
      let estoy = document.querySelector(".name") || { innerHTML: "" };
      let data = JSON.parse(JSON.stringify(datos));
      let channel_id = data.channel_id;
      let canales = store.getState().channel;
      let canal = canales.filter(channel => {
        if (channel._id === channel_id) {
          return channel;
        }
      })[0]
      if (canal) {
        let quedaria = {
          ...canal,
          members: [...canal.members, data.user]
        }
        if (estoy.innerHTML === canal.name) {
          setFocus(quedaria)
        }
        dispatch(startNewMember(data.channel_id, data.user));
      }
    });


    socket.on('disconnect', () => {
      console.log('Me desconecto');
    });

  }

  useEffect(async () => {
    const un = store.subscribe(() => {
      setChannels({
        channels: store.getState().channel
      });
    });
    conectarse();
    
    

    return () => {
      un();
      socket.disconnect();
    };
  }, [iniSoc]);

  return (
    <currentContext.Provider value={{ focusCh, setFocus, escuchando, setEscucho , conectarse}}>
      <userContext.Provider value={{ socket, permitir, setPermitir, cambiaTema }}>
        <AppRouter />
      </userContext.Provider>
    </currentContext.Provider>
  )
}

export default App;
