import React, {useState, useContext, useEffect} from 'react';
import { userContext } from '../hooks/userContext';
import {store} from '../store/store.js';
import { useNavigate } from 'react-router-dom';
import { fetchSinToken } from '../helpers/fetch';

export const Channels = ({setNew, setFocus}) => {
    let [channels, setChannels] = useState(store.getState().channel);
    const {socket} = useContext(userContext);
    const [open, setOpen] = useState(false);
    let [user, _] = useState(store.getState().info);
    
    let originalC = store.getState().channel;
    const navigate = useNavigate();

    useEffect(() => {
        
        setChannels(store.getState().channel);
        
        store.subscribe(() => {
            setChannels({
              channels: store.getState().channel
            });
          });
    }, []);

    

    
    

    const unirse = (idCanal, info) => {
        socket.emit('unirse', {id:`channel${idCanal, info}`});
    }

    

    const entrarCanal =async(canal)=>{
        setFocus(canal);
        /*if(!user.channels.includes(canal.id)){
            let respuesta = await fetchSinToken(`/channel/add`, {channel: canal.id, user: user.id}, 'PUT')
            console.log(`entrado canal ${respuesta}`);
        }*/
    }

    const busca=(e)=>{
        setChannels(originalC.filter((canal)=>{
            return canal.name.toUpperCase().includes(e.target.value.toUpperCase())
        }))
    }

    return (
        <>
        <div className="channels">
        <div className="cha">
            <p>Channels</p>
            <button className="create mas" onClick={()=>{
                console.log("click en crear");
                setNew(true)}}>
            <span class="material-icons">
            add
            </span>
            </button>
        </div>
        <input className="buscar" placeholder="Search" onChange={busca}></input>
        <div className="nombre-c">
            {channels.map((canal, index)=>{
                return(
                    <div className="canal" key={index} onClick={()=>{entrarCanal(canal)}}>
                        <div className="short">
                            <p className='inic'>{canal.name.substr(0,2).toUpperCase()}</p>
                        </div>
                        <p>{canal.name}</p>
                    </div>
                )
            })}
        </div>
    </div>
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
      </>
    )

}