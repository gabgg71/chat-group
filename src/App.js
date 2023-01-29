import { AppRouter } from "./router/AppRouter";

import React, { useEffect, useState} from 'react'
import { userContext } from "./hooks/userContext";
import { currentContext } from "./hooks/currentContext";
import io from 'socket.io-client';
import { loadMsg } from './actions/channel';



function App() {
  const [socket, setSocket] = useState(null);
  const [focusCh, setFocus] = useState({});
  let [permitir, setPermitir]= useState(false)
  //let [channels, setChannels] = useState(store.getState().channel);

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

  useEffect(() => {
      console.log("se renderiza app")
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
          console.log('Recibo msg cuando estaba en canal '+JSON.stringify(focusCh.name));
          let msg = JSON.parse(JSON.stringify(data));
          console.log('Recibo mensaje '+JSON.stringify(msg));
          /*let channel_id = msg.channel_id;
          console.log('estos son canales '+JSON.stringify(channels));
          let canal = channels.filter(channel => {
              if(channel._id === channel_id){
                  console.log('Canal encontrado'+JSON.stringify(channel));
                  return channel;
              }});
          if(canal){
              let quedaria = {...canal, 
              messages : [...canal.messages, msg.msg]}
              console.log('Quedo '+JSON.stringify(quedaria)+' mesg '+JSON.stringify(quedaria.messages));
              setFocus(quedaria)
          }*/
      /* dispatch(loadMsg(focusCh._id, msg))*/

      });
    

        socket.on('disconnect', () =>{
          console.log('Me desconecto socket');
        });
        
        return () => {
          socket.disconnect();
        };
  }, []);

  return (
    <currentContext.Provider value={{focusCh, setFocus}}>
    <userContext.Provider value={{ socket, permitir, setPermitir, cambiaTema }}>
      <AppRouter/>
    </userContext.Provider>
    </currentContext.Provider>
  )
}

export default App;
