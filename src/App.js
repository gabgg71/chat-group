import { AppRouter } from "./router/AppRouter";
import { Provider } from 'react-redux';
import { store } from './store/store';
import React, { useEffect, useState} from 'react'
import { userContext } from "./hooks/userContext";
import io from 'socket.io-client';



function App() {
  const [socket, setSocket] = useState(null);

  let [permitir, setPermitir]= useState(false)
  let [otroCanal, setOtro] = useState(false);
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
    
        socket.on('message', () => {
          console.log('Recibo mensaje');

        });

        socket.on('disconnect', () =>{
          console.log('Me desconecto socket');
        });
        
        return () => {
          socket.disconnect();
        };
  }, []);

  return (
    <userContext.Provider value={{ socket, permitir, setPermitir, cambiaTema, otroCanal, setOtro }}>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
    </userContext.Provider>
  )
}

export default App;
